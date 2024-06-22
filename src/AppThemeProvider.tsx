import {
  ThemeProvider,
  createTheme,
  darkColors,
  lightColors,
  useThemeMode,
} from '@rneui/themed';
import type { PropsWithChildren } from 'react';

const AppThemeProvider = ({ children }: PropsWithChildren) => {
  const { mode } = useThemeMode();

  const theme = createTheme({
    lightColors: {
      ...lightColors,
    },
    darkColors: {
      ...darkColors,
    },
    spacing: { xs: 2, sm: 4, md: 8, lg: 12, xl: 24 },
    mode,
  });

  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

export default AppThemeProvider;
