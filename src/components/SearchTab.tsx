import { SearchBar } from '@rneui/themed';
import { useQuery } from '@tanstack/react-query';
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

const SearchTab = () => {
  const [search, setSearch] = useState('');
  const [refreshing, setRefreshing] = useState(false);

  const updateSearch = (search: string) => {
    setSearch(search);
  };

  const favorites = useFavoriteGifStore(state => state.favorites);
  const addFavorite = useFavoriteGifStore(state => state.addFavorite);

  const { error, data, isLoading, isError, refetch } = useQuery<GifItem[]>({
    queryKey: ['trending'],
    queryFn: () => getGiphyGif(search),
  });

  const searchGif = async () => {
    await refetch();
  };

  useEffect(() => {
    void (async () => {
      if (search.trim() == '') {
        await refetch();
      }
    })();
  }, [search]);

  const imageWidth = useImageWidth();

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  }, []);

  const addToFavorite = useCallback(
    (item: { id: string; source: string }) => {
      console.log('debug onclick');
      addFavorite({ id: item.id, source: item.source });
    },
    [addFavorite]
  );

  useEffect(() => {
    if (isError) {
      console.error(error);
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
        data={data}
        numColumns={4}
        windowSize={10}
        keyExtractor={k => k.id}
        refreshControl={
          <RefreshControl
            refreshing={refreshing || isLoading}
            onRefresh={onRefresh}
          />
        }
        contentContainerStyle={{ flexGrow: 1 }}
        ListEmptyComponent={ListEmptyComponent(isError)}
        renderItem={item =>
          GifListRenderer({ ...item, imageWidth, addToFavorite, favorites })
        }
      />
    </KeyboardAvoidingView>
  );
};

export default SearchTab;
