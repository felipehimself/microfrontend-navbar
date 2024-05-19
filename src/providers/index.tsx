// import React from 'react';
// import { BrowserRouter } from 'react-router-dom';
// export const AppProvider = (props: React.PropsWithChildren) => {
//   return <BrowserRouter>{props.children}</BrowserRouter>;
// };

import React, { Suspense } from 'react';
import { Fallback } from '@/components/shared/fallback';
import { ErrorBoundary } from 'react-error-boundary';
import { FallbackError } from '@/components/shared/fallback-error';
import { BrowserRouter } from 'react-router-dom';
import { darkTheme, lightTheme } from '@mfe-lib/styleguide';
import { FluentProvider } from '@fluentui/react-components';

export const AppProvider = ({ children }: React.PropsWithChildren) => {
  return (
    <FluentProvider theme={lightTheme}>
      <Suspense fallback={<Fallback />}>
        <ErrorBoundary FallbackComponent={FallbackError}>
          <BrowserRouter>{children}</BrowserRouter>
        </ErrorBoundary>
      </Suspense>
    </FluentProvider>
  );
};
