import { Image, Icon } from '@rneui/themed';
import { ActivityIndicator, Pressable } from 'react-native';
import { type Favorite } from '../hooks';

export const FavoriteListRenderer = ({
  item,
  imageWidth,
  removeFavorite,
  shareFavorite,
  favorites,
}: {
  item: Favorite;
  imageWidth: number;
  removeFavorite: (id: string) => void;
  shareFavorite: (source: string) => void;
  favorites: Favorite[];
}) => {
  return (
    <Image
      style={{
        width: imageWidth,
        height: imageWidth,
        justifyContent: 'space-between',
      }}
      source={{
        uri: item.source,
      }}
      PlaceholderContent={<ActivityIndicator color='blue' />}>
      <Pressable
        onPress={() => {
          removeFavorite(item.id);
        }}>
        {favorites.some(it => it.id === item.id) ? (
          <Icon
            name='star'
            style={{ alignItems: 'flex-end', marginEnd: 2 }}
            color='orange'
          />
        ) : (
          <Icon
            name='star-outline'
            style={{ alignItems: 'flex-end', marginEnd: 2 }}
            color='orange'
          />
        )}
      </Pressable>
      <Pressable
        onPress={() => {
          shareFavorite(item.source);
        }}>
        <Icon
          name='share'
          style={{ alignItems: 'flex-end', marginEnd: 2, marginBottom: 2 }}
          color='white'
        />
      </Pressable>
    </Image>
  );
};
