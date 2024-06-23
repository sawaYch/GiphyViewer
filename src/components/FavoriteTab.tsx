import {
  Alert,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  Share,
} from 'react-native';
import { FavoriteListRenderer } from './FavoriteListRenderer';
import { ListEmptyComponent } from './ListEmptyComponent';
import { useFavoriteGifStore, useImageWidth } from '../hooks';
import { useCallback } from 'react';

const FavoriteTab = () => {
  const favorites = useFavoriteGifStore(state => state.favorites);
  const removeFavorite = useFavoriteGifStore(state => state.removeFavorite);
  const imageWidth = useImageWidth();
  const shareFavorite = useCallback(async (source: string) => {
    try {
      await Share.share({
        message: source,
      });
    } catch (error: unknown) {
      Alert.alert(JSON.stringify(error));
    }
  }, []);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{
        flexDirection: 'column',
        minHeight: '100%',
      }}>
      <FlatList
        testID='favorite-list'
        data={favorites}
        numColumns={3}
        windowSize={10}
        keyExtractor={k => k.id}
        contentContainerStyle={{ flexGrow: 1 }}
        ListEmptyComponent={ListEmptyComponent({
          isError: false,
          isLoading: false,
          emptyMessage: '🤧 No favorite Gifs yet!',
        })}
        renderItem={item =>
          FavoriteListRenderer({
            ...item,
            imageWidth,
            removeFavorite,
            shareFavorite,
            favorites,
          })
        }
      />
    </KeyboardAvoidingView>
  );
};

export default FavoriteTab;
