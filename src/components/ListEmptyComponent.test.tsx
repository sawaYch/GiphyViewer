import React from 'react';
import { render } from '@testing-library/react-native';
import { ListEmptyComponent } from './ListEmptyComponent';

describe('ListEmptyComponent', () => {
  it('should render error message when isError is true', () => {
    const { getByText } = render(
      <ListEmptyComponent isError={true} isLoading={false} />
    );
    const errorMessage = getByText('☠️ Some error occur... Please try again!');
    expect(errorMessage).toBeDefined();
  });

  it('should render loading indicator when isLoading is true', () => {
    const { queryByText } = render(
      <ListEmptyComponent isError={false} isLoading={true} />
    );
    const loadingMessage = queryByText('🤧 Sorry, no Gifs match!'); // Ensure this text is not rendered
    expect(loadingMessage).toBeNull();
  });

  it('should render custom empty message when provided', () => {
    const { getByText } = render(
      <ListEmptyComponent
        isError={false}
        isLoading={false}
        emptyMessage='Custom empty message'
      />
    );
    const customMessage = getByText('Custom empty message');
    expect(customMessage).toBeDefined();
  });

  it('should render default empty message when emptyMessage is not provided', () => {
    const { getByText } = render(
      <ListEmptyComponent isError={false} isLoading={false} />
    );
    const defaultMessage = getByText('🤧 Sorry, no Gifs match!');
    expect(defaultMessage).toBeDefined();
  });
});
