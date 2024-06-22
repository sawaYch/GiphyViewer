import { SearchBar, Text, Image } from '@rneui/themed';
import { useQuery } from '@tanstack/react-query';
import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  View,
  useWindowDimensions,
} from 'react-native';
import { getTrendingGif } from './api';
import type { GifItem } from './api';

const SearchTab = () => {
  const [search, setSearch] = useState('');
  const [refreshing, setRefreshing] = useState(false);

  const updateSearch = (search: string) => {
    setSearch(search);
  };

  const { error, data, isLoading, isError, refetch } = useQuery<GifItem[]>({
    queryKey: ['trending'],
    queryFn: getTrendingGif,
    // just for testing
    // () => {
    //   throw new Error('API Error');
    //   return [];
    // },
  });

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await refetch();
    setRefreshing(false);
  }, []);

  const { width } = useWindowDimensions();
  const imageWidth = useMemo(() => {
    return width / 4;
  }, []);

  useEffect(() => {
    if (isError) {
      console.error(error);
    }
  }, [isError, error]);

  useEffect(() => {
    if (data != null) {
      console.log(JSON.stringify(data[0]));
    }
  }, [data]);

  return (
    <View
      style={{
        flex: 1,
        flexGrow: 1,
        flexDirection: 'column',
        minHeight: '100%',
      }}>
      <SearchBar
        placeholder='Search your favorite gif 💝'
        onChangeText={updateSearch}
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
        ListEmptyComponent={() => {
          return isError ? (
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                flex: 1,
                flexDirection: 'column',
              }}>
              <Text>☠️ Some error occur... Please try again!</Text>
            </View>
          ) : (
            <></>
          );
        }}
        renderItem={({ item }) => (
          <Image
            style={{
              width: imageWidth,
              height: imageWidth,
            }}
            source={{
              uri: item.images.fixed_width.webp,
            }}
            PlaceholderContent={<ActivityIndicator />}
          />
        )}
      />
    </View>
  );
};

export default SearchTab;
