import { Routes, Route, Navigate, Outlet, useLocation } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { QueryClient, QueryClientProvider } from "react-query";
import { useAuth, AuthProvider } from "hooks/use-auth";
import { Centered } from "components/Centered";
import { useState, useMemo } from "react";
import { Box } from "@mui/material";

import { Login } from "containers/Login";
import { SignUp } from "containers/SignUp";
import { AddWord } from "containers/AddWord";
import { WordsList } from "components/WordsList";
import { Dictionary } from "containers/Dictionary";

function Layout() {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated)
    return (
      <Centered>
        <Outlet />
      </Centered>
    );
  return (
    <Box sx={{ p: 2 }}>
      <Outlet />
    </Box>
  );
}

function RequireAuth({ children }: { children: JSX.Element }) {
  const location = useLocation();
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? (
    children
  ) : (
    <Navigate to="/login" state={{ from: location }} />
  );
}

const Main = () => <Dictionary />;

export const App = () => {
  const queryClient = new QueryClient();

  type PaletteMode = "light" | "dark";

  const [mode, setMode] = useState<PaletteMode>("dark");

  matchMedia("(prefers-color-scheme: dark)").addEventListener("change", (e) =>
    setMode(e.matches ? "dark" : "light")
  );

  const theme = useMemo(() => createTheme({ palette: { mode } }), [mode]);

  return (
    <ThemeProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <Routes>
            <Route element={<Layout />}>
              <Route
                path="/"
                element={
                  <RequireAuth>
                    <Main />
                  </RequireAuth>
                }
              />
              <Route
                path="/add-word"
                element={
                  <RequireAuth>
                    <AddWord />
                  </RequireAuth>
                }
              />
              <Route
                path="/words-list"
                element={
                  <RequireAuth>
                    <WordsList />
                  </RequireAuth>
                }
              />
              <Route path="/dictionary" element={<Dictionary />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/login" element={<Login />} />
            </Route>
          </Routes>
        </AuthProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
};
