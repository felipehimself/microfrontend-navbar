import React, { Suspense } from 'react';
import { Fallback } from '@/components/shared/fallback';
import { ErrorBoundary } from 'react-error-boundary';
import { FallbackError } from '@/components/shared/fallback-error';
import { BrowserRouter } from 'react-router-dom';
import { darkTheme, lightTheme } from '@mfe-lib/styleguide';
import { FluentProvider } from '@fluentui/react-components';
import { useThemeStore } from '@/store/theme-store';

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
