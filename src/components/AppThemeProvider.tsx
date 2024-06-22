import {
  ThemeProvider,
  createTheme,
  darkColors,
  lightColors,
  useThemeMode,
} from '@rneui/themed';
import type { PropsWithChildren } from 'react';
import { Platform } from 'react-native';

const AppThemeProvider = ({ children }: PropsWithChildren) => {
  const { mode } = useThemeMode();

  const theme = createTheme({
    lightColors: {
      ...Platform.select({
        default: lightColors.platform.android,
        ios: lightColors.platform.ios,
      }),
    },
    darkColors: {
      ...Platform.select({
        default: darkColors.platform.android,
        ios: darkColors.platform.ios,
      }),
    },
    spacing: { xs: 2, sm: 4, md: 8, lg: 12, xl: 24 },
    mode,
  });

  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

export default AppThemeProvider;
