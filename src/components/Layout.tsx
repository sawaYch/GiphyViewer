import { useCallback, useMemo } from 'react';
import type { PropsWithChildren } from 'react';
import { Button, Header, Icon } from '@rneui/base';
import { useTheme, useThemeMode } from '@rneui/themed';
import { View } from 'react-native';

const Layout = ({ children }: PropsWithChildren) => {
  const { mode, setMode } = useThemeMode();
  const { theme } = useTheme();

  const iconName = useMemo(
    () => (mode == 'dark' ? 'dark-mode' : 'light-mode'),
    [mode]
  );

  const toggleDarkMode = useCallback(() => {
    setMode(mode === 'dark' ? 'light' : 'dark');
  }, [mode]);

  return (
    <View
      style={{
        backgroundColor: theme.colors.primary,
        flexGrow: 1,
        flex: 1,
        flexWrap: 'wrap',
        width: '100%',
      }}>
      <Header
        backgroundColor={theme.colors.primary}
        centerContainerStyle={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
        }}
        centerComponent={{
          text: 'Giphy Viewer',
          style: {
            color: 'white',
            fontSize: 22,
            fontWeight: 'bold',
          },
        }}
        rightComponent={
          <Button radius={'xl'} onPress={toggleDarkMode}>
            <Icon name={iconName} color='white' />
          </Button>
        }
      />
      {children}
    </View>
  );
};

export default Layout;
