import { useAuth, AuthProvider } from "hooks/use-auth";
import { QueryClient, QueryClientProvider } from "react-query";
import { Centered } from "components/Centered";
import { Routes, Route, Navigate, Outlet, useLocation } from "react-router-dom";

import { Login } from "containers/Login";
import { SignUp } from "containers/SignUp";
import { AddWord } from "containers/AddWord";
import { WordsList } from "components/WordsList";
import { Dictionary } from "containers/Dictionary";
import { Layout as ALayout } from "antd";

const { Header, Content } = ALayout;

function Layout() {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated)
    return (
      <Centered>
        <Outlet />
      </Centered>
    );
  return (
    <ALayout>
      <Header>Hello</Header>
      <Content style={{ padding: "12px" }}>
        <Outlet />
      </Content>
    </ALayout>
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
  return (
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
  );
};
