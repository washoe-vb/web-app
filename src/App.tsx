import { BrowserRouter } from "react-router-dom";
import { StrictMode } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { QueryClient, QueryClientProvider } from "react-query";
import { AuthProvider } from "hooks/use-auth";
import { CssBaseline, useMediaQuery } from "@mui/material";
import { MyRoutes } from "./Routes";
import { ReactQueryDevtools } from "react-query/devtools";

export const App = () => {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const theme = createTheme({
    palette: {
      mode: prefersDarkMode ? "dark" : "light",
    },
  });

  const queryClient = new QueryClient();

  return (
    <StrictMode>
      <ThemeProvider theme={theme}>
        <QueryClientProvider client={queryClient}>
          <AuthProvider>
            <BrowserRouter>
              <MyRoutes />
            </BrowserRouter>
          </AuthProvider>
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
        <CssBaseline />
      </ThemeProvider>
    </StrictMode>
  );
};
