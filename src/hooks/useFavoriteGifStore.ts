import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { zustandMMKVStorage } from '../storage';

export interface Favorite {
  id: string;
  source: string;
}

export interface State {
  favorites: Favorite[];
  addFavorite: (item: Favorite) => void;
  removeFavorite: (id: string) => void;
}

export const useFavoriteGifStore = create<State>()(
  persist(
    set => ({
      favorites: [],
      addFavorite: item =>
        set(state => {
          if (state.favorites.some(it => it.id === item.id)) {
            return { favorites: state.favorites };
          }
          return {
            favorites: [...state.favorites, { ...item }],
          };
        }),
      removeFavorite: (id: string) =>
        set(state => ({
          favorites: state.favorites.filter(item => item.id !== id),
        })),
    }),
    {
      name: 'giphy-viewer-storage',
      storage: createJSONStorage(() => zustandMMKVStorage),
    }
  )
);
