import React, { FC } from 'react';
import { QueryCache, ReactQueryCacheProvider } from 'react-query';
import CssBaseline from '@material-ui/core/CssBaseline';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { ReactQueryDevtools } from 'react-query-devtools';
import Example from './Example';

const queryCache = new QueryCache();

const App: FC = () => {
  const darkTheme = createMuiTheme({
    overrides: {
      MuiCssBaseline: {
        '@global': {
          body: {
            margin: 0,
          },
        },
      },
    },
    palette: {
      type: 'dark',
    },
  });
  return (
    <ReactQueryCacheProvider queryCache={queryCache}>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <Example />
      </ThemeProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </ReactQueryCacheProvider>
  );
};

export default App;
