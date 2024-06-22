import { Image, Icon } from '@rneui/themed';
import { ActivityIndicator, Pressable } from 'react-native';
import { type Favorite } from '../hooks';

export const FavoriteListRenderer = ({
  item,
  imageWidth,
  removeFavorite,
  favorites,
}: {
  item: Favorite;
  imageWidth: number;
  removeFavorite: (id: string) => void;
  favorites: Favorite[];
}) => {
  return (
    <Pressable
      onPress={() => {
        removeFavorite(item.id);
      }}>
      <Image
        style={{
          width: imageWidth,
          height: imageWidth,
        }}
        source={{
          uri: item.source,
        }}
        PlaceholderContent={<ActivityIndicator color='blue' />}>
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
      </Image>
    </Pressable>
  );
};
