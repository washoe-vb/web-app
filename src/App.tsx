import {
  Routes,
  Route,
  Navigate,
  Outlet,
  useLocation,
  Link,
} from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { QueryClient, QueryClientProvider } from "react-query";
import { useAuth, AuthProvider } from "hooks/use-auth";
import { Centered } from "components/Centered";
import {
  Box,
  CssBaseline,
  useMediaQuery,
  Typography,
  Toolbar,
  AppBar,
  Button,
} from "@mui/material";

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
    <Box>
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

export const Navigation = () => (
  <AppBar position="fixed" component="nav">
    <Toolbar>
      <Button component={Link} to="/">
        Washoe
      </Button>
      <Box ml="auto" display="flex" gap={1}>
        <Button component={Link} to="/add-word">
          Add Word
        </Button>
        <Button component={Link} to="/my-words">
          My Words
        </Button>
      </Box>
    </Toolbar>
  </AppBar>
);

export const App = () => {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const theme = createTheme({
    palette: {
      mode: prefersDarkMode ? "dark" : "light",
    },
  });

  const queryClient = new QueryClient();

  return (
    <ThemeProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <Navigation />
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
                path="/my-words"
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
      <CssBaseline />
    </ThemeProvider>
  );
};
