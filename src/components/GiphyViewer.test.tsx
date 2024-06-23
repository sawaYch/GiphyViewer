import React from 'react';
import { render } from '@testing-library/react-native';
import GiphyViewer from './GiphyViewer';
import { Text, View } from 'react-native';

const Tab = ({ children }: { children: React.ReactNode }) => {
  return <View>{children}</View>;
};

Tab.Item = ({ title }: { title: string }) => {
  return <Text>{title}</Text>;
}; // Attach TabItem as Tab.Item

const TabView = ({
  children,
  value,
  onChange,
  tabItemContainerStyle,
  containerStyle,
}: {
  children: React.ReactNode;
  value: number;
  onChange: (index: number) => void;
  tabItemContainerStyle?: object;
  containerStyle?: object;
}) => {
  return (
    <View style={containerStyle}>
      {React.Children.map(children, (child, index) =>
        React.cloneElement(child as React.ReactElement, {
          index,
          onPress: () => onChange(index),
          isSelected: value === index,
          style: tabItemContainerStyle,
        })
      )}
    </View>
  );
};

// Mock TabView.Item component
TabView.Item = ({
  children,
  onPress,
  style,
}: {
  children: React.ReactNode;
  onPress: () => void;
  isSelected: boolean;
  style?: object;
}) => {
  return (
    <View style={style} onTouchEnd={onPress}>
      {children}
    </View>
  );
};

jest.mock('@rneui/themed', () => ({
  useTheme: jest.fn(() => ({
    theme: {
      colors: {
        primary: 'blue',
      },
    },
  })),
  useThemeMode: jest.fn(() => ({
    mode: 'light',
    setMode: jest.fn(),
  })),
}));

jest.mock('./TabNavigator', () => ({
  __esModule: true,
  default: jest.fn(() => <></>),
}));

describe('GiphyViewer', () => {
  it('should render Layout and TabNavigator components', () => {
    const { getByTestId } = render(<GiphyViewer />);

    // Check if Layout component is rendered
    const layoutComponent = getByTestId('layout-component');
    expect(layoutComponent).toBeDefined();
  });
});
