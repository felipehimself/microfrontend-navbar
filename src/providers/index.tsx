import React from 'react';
import { BrowserRouter } from 'react-router-dom';
export const AppProvider = (props: React.PropsWithChildren) => {
  return <BrowserRouter>{props.children}</BrowserRouter>;
};
