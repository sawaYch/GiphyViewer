import { FlatList, KeyboardAvoidingView, Platform } from 'react-native';
import { FavoriteListRenderer } from './FavoriteListRenderer';
import { ListEmptyComponent } from './ListEmptyComponent';
import { useFavoriteGifStore, useImageWidth } from '../hooks';

const FavoriteTab = () => {
  const favorites = useFavoriteGifStore(state => state.favorites);
  const removeFavorite = useFavoriteGifStore(state => state.removeFavorite);
  const imageWidth = useImageWidth();

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{
        flex: 1,
        flexGrow: 1,
        flexDirection: 'column',
        minHeight: '100%',
      }}>
      <FlatList
        data={favorites}
        numColumns={4}
        windowSize={10}
        keyExtractor={k => k.id}
        contentContainerStyle={{ flexGrow: 1 }}
        ListEmptyComponent={ListEmptyComponent(
          false,
          '🤧 No favorite Gifs yet!'
        )}
        renderItem={item =>
          FavoriteListRenderer({
            ...item,
            imageWidth,
            removeFavorite,
            favorites,
          })
        }
      />
    </KeyboardAvoidingView>
  );
};

export default FavoriteTab;
