import { Image, Icon } from '@rneui/themed';
import { ActivityIndicator, Pressable } from 'react-native';
import type { GifItem } from '../api';
import type { Favorite } from '../hooks';

export const GifListRenderer = ({
  item,
  imageWidth,
  addToFavorite,
  favorites,
}: {
  item: GifItem;
  imageWidth: number;
  addToFavorite: (item: { id: string; source: string }) => void;
  favorites: Favorite[];
}) => {
  return (
    <Pressable
      onPress={() => {
        addToFavorite({
          id: item.id,
          source: item.images.fixed_width.webp,
        });
      }}>
      <Image
        style={{
          width: imageWidth,
          height: imageWidth,
        }}
        source={{
          uri: item.images.fixed_width.webp,
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
