"use client";

import {ThemeProvider} from "@mui/material";
import {UserContextProvider} from "@/app/context/userContext";
import {AppRouterCacheProvider} from '@mui/material-nextjs/v13-appRouter';
import {theme} from "@/theme";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {SnackbarContextProvider} from "@/app/context";

export const Providers = ({children}: { children: React.ReactNode }) => {

  const queryClient = new QueryClient({ defaultOptions: {queries: {retry: false }}})

  return (
    <AppRouterCacheProvider>
      <ThemeProvider theme={theme}>
        <QueryClientProvider client={queryClient}>
          <SnackbarContextProvider>
            <UserContextProvider>
                {children}
            </UserContextProvider>
          </SnackbarContextProvider>
        </QueryClientProvider>
      </ThemeProvider>
    </AppRouterCacheProvider>
  );
}
