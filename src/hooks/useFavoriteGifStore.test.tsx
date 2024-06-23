import type { Favorite } from './useFavoriteGifStore';
import { useFavoriteGifStore } from './useFavoriteGifStore';
import { zustandMMKVStorage } from '../storage';

jest.mock('../storage', () => ({
  zustandMMKVStorage: {
    setItem: jest.fn(),
    getItem: jest.fn(),
    removeItem: jest.fn(),
  },
}));

describe('useFavoriteGifStore', () => {
  beforeEach(() => {
    // Clear all items in zustand store before each test
    useFavoriteGifStore.setState({ favorites: [] });
  });

  it('should add a favorite item', () => {
    const favorite: Favorite = { id: '1', source: 'Giphy' };

    useFavoriteGifStore.getState().addFavorite(favorite);

    const state = useFavoriteGifStore.getState();
    expect(state.favorites).toEqual([favorite]);
  });

  it('should not add a duplicate favorite item', () => {
    const favorite: Favorite = { id: '1', source: 'Giphy' };

    useFavoriteGifStore.getState().addFavorite(favorite);
    useFavoriteGifStore.getState().addFavorite(favorite);

    const state = useFavoriteGifStore.getState();
    expect(state.favorites).toEqual([favorite]);
  });

  it('should remove a favorite item', () => {
    const favorite1: Favorite = { id: '1', source: 'Giphy' };
    const favorite2: Favorite = { id: '2', source: 'Giphy' };

    useFavoriteGifStore.getState().addFavorite(favorite1);
    useFavoriteGifStore.getState().addFavorite(favorite2);
    useFavoriteGifStore.getState().removeFavorite('1');

    const state = useFavoriteGifStore.getState();
    expect(state.favorites).toEqual([favorite2]);
  });

  it('should persist state changes', () => {
    const favorite: Favorite = { id: '1', source: 'Giphy' };

    // Mock zustandMMKVStorage.getItem to return an empty array initially
    (zustandMMKVStorage.getItem as jest.Mock).mockReturnValueOnce(
      JSON.stringify({ state: { favorites: [] } })
    );

    // Add a favorite item to update the state and persist it
    useFavoriteGifStore.getState().addFavorite(favorite);

    // Ensure setItem was called to persist the state
    expect(zustandMMKVStorage.setItem).toHaveBeenCalledWith(
      'giphy-viewer-storage',
      JSON.stringify({
        state: { favorites: [favorite] },
        version: 0,
      })
    );
  });
});
