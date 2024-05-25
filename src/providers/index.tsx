import { Fallback } from '@/components/shared/fallback';
import { FallbackError } from '@/components/shared/fallback-error';
import { useThemeStore } from '@/store/theme-store';
import { FluentProvider } from '@fluentui/react-components';
import { darkTheme, lightTheme } from '@mfe-lib/styleguide';
import React, { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { BrowserRouter } from 'react-router-dom';

export const AppProvider = ({ children }: React.PropsWithChildren) => {
  const { theme } = useThemeStore();

  return (
    <FluentProvider theme={theme === 'light' ? lightTheme : darkTheme}>
      <Suspense fallback={<Fallback />}>
        <ErrorBoundary FallbackComponent={FallbackError}>
          <BrowserRouter>{children}</BrowserRouter>
        </ErrorBoundary>
      </Suspense>
    </FluentProvider>
  );
};
