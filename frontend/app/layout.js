'use client';

import React from 'react';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import Navigation from '@/components/Navigation';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#667eea',
    },
    secondary: {
      main: '#764ba2',
    },
    background: {
      default: '#f5f5f5',
      paper: '#ffffff',
    },
  },
  typography: {
    fontFamily: 'Arial, sans-serif',
    h1: { fontSize: '2.5rem', fontWeight: 'bold' },
    h2: { fontSize: '2rem', fontWeight: 'bold' },
  },
});

export default function RootLayout({ children }) {
  return (
    <html>
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Priority Inbox</title>
      </head>
      <body>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Navigation />
          <main style={{ minHeight: '100vh', padding: '20px' }}>
            {children}
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
