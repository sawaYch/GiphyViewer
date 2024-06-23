/* eslint-disable @typescript-eslint/unbound-method */
import React from 'react';
import { render } from '@testing-library/react-native';
import FavoriteTab from './FavoriteTab';

// jest.mock('../hooks', () => ({
//   // eslint-disable-next-line @typescript-eslint/no-explicit-any
//   useFavoriteGifStore: (passedFunction: any) => {
//     const data = {
//       removeFavorite: jest.fn(),
//       favorite: [{id: '1', source: 'http://example.gif'}],
//     };

//     // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call
//     return passedFunction(data);
//   },
//   useImageWidth: jest.fn(),
// }));

describe('FavoriteTab', () => {
  beforeEach(() => {
    // Clear any mocked implementations or mockReturnValue setups before each test
    jest.clearAllMocks();
  });

  it('should render FavoriteTab correctly', () => {
    const { getByTestId } = render(<FavoriteTab />);

    // Verify if FlatList is rendered
    const flatList = getByTestId('favorite-list');
    expect(flatList).toBeDefined();
  });

  // it('should call removeFavorite function when remove icon pressed', async () => {
  //   const { getByTestId } = render(<FavoriteTab />);

  //   // Trigger press event on remove icon
  //   const removePressable = getByTestId('remove-favorite'); // Adjust the test id as per your implementation
  //   fireEvent.press(removePressable);

  //   // Verify if removeFavorite function was called correctly
  //   // expect(mockRemoveFavorite).toHaveBeenCalledTimes(1);
  //   // expect(mockRemoveFavorite).toHaveBeenCalledWith('1');
  // });
});
