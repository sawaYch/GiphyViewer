import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import GiphyViewer from './components/GiphyViewer';
import { AppThemeProvider } from './components';

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
