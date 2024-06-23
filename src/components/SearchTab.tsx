import { SearchBar } from '@rneui/themed';
import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { useCallback, useEffect, useState } from 'react';
import {
  FlatList,
  KeyboardAvoidingView,
  Platform,
  RefreshControl,
} from 'react-native';
import { getGiphyGif } from '../api';
import type { GifItem } from '../api';
import { useFavoriteGifStore, useImageWidth } from '../hooks';
import { GifListRenderer } from './GifListRenderer';
import { ListEmptyComponent } from './ListEmptyComponent';
import Config from 'react-native-config';

const SearchTab = () => {
  const [search, setSearch] = useState('');
  const [refreshing, setRefreshing] = useState(false);
  const [page, setPage] = useState(0);

  const updateSearch = (search: string) => {
    setSearch(search);
  };

  const favorites = useFavoriteGifStore(state => state.favorites);
  const addFavorite = useFavoriteGifStore(state => state.addFavorite);

  const { error, data, isLoading, isError, refetch, isPlaceholderData } =
    useQuery<GifItem[]>({
      queryKey: ['search', search, page],
      queryFn: () => getGiphyGif(search, page),
      placeholderData: keepPreviousData,
    });

  const [isPending, setIsPending] = useState(false);

  const [listData, setListData] = useState<GifItem[]>([]);
  useEffect(() => {
    if (data != null) {
      setListData(prev => [...prev, ...data]);
    }
  }, [data]);

  const searchGif = async () => {
    setPage(0);
    setListData([]);
    setIsPending(true);
    await refetch();
    setIsPending(false);
  };

  useEffect(() => {
    void (async () => {
      if (search.trim() == '') {
        setListData([]);
        setIsPending(true);
        await refetch();
        setIsPending(false);
      }
    })();
  }, [search]);

  const imageWidth = useImageWidth();

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    setPage(0);
    setListData([]);
    setIsPending(true);
    await refetch();
    setRefreshing(false);
    setIsPending(false);
  }, [refetch]);

  const addToFavorite = useCallback(
    (item: { id: string; source: string }) => {
      console.log('debug onclick');
      addFavorite({ id: item.id, source: item.source });
    },
    [addFavorite]
  );

  const fetchNext = useCallback(() => {
    if (!isPlaceholderData) {
      setPage(old => old + 1);
    }
  }, [isPlaceholderData]);

  useEffect(() => {
    console.log('api key', Config.GIPHY_API_KEY);
    if (isError) {
      console.error('error', error);
    }
  }, [isError, error]);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{
        flex: 1,
        flexGrow: 1,
        flexDirection: 'column',
        minHeight: '100%',
      }}>
      <SearchBar
        placeholder='Search your favorite gif 💝'
        onChangeText={updateSearch}
        onBlur={searchGif}
        value={search}
      />
      <FlatList
        data={listData}
        numColumns={3}
        windowSize={10}
        keyExtractor={k => k.id}
        refreshControl={
          <RefreshControl
            refreshing={refreshing || isLoading}
            onRefresh={onRefresh}
          />
        }
        onEndReachedThreshold={0.2}
        onEndReached={fetchNext}
        contentContainerStyle={{ flexGrow: 1 }}
        ListEmptyComponent={ListEmptyComponent(isError, isLoading || isPending)}
        renderItem={item =>
          GifListRenderer({ ...item, imageWidth, addToFavorite, favorites })
        }
      />
    </KeyboardAvoidingView>
  );
};

export default SearchTab;
