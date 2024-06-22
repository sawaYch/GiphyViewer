import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import GiphyViewer from './src/components/GiphyViewer';
import AppThemeProvider from './src/components/AppThemeProvider';

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaProvider>
        <AppThemeProvider>
          <GiphyViewer />
        </AppThemeProvider>
      </SafeAreaProvider>
    </QueryClientProvider>
  );
};

export default App;
