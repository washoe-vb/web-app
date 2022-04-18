import { useAuth, AuthProvider } from "hooks/use-auth";
import { QueryClient, QueryClientProvider } from "react-query";
import { Centered } from "components/Centered";
import { Routes, Route, Navigate, Outlet, useLocation } from "react-router-dom";

import "antd/dist/antd.css";

import { Login } from "containers/Login";
import { SignUp } from "containers/SignUp";
import { AddWord } from "containers/AddWord";
import { Dictionary } from "components/Dictionary";

function Layout () {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) return <Centered><Outlet /></Centered>;
  return <Outlet />;
}

function RequireAuth ({ children }: { children: JSX.Element }) {
  const location = useLocation();
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/login" state={{ from: location }} />;
}

const Main = () => <AddWord />;

export const App = () => {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<RequireAuth><Main /></RequireAuth>} />
            <Route path="/dict" element={<RequireAuth><Dictionary /></RequireAuth>} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
          </Route>
        </Routes>
      </AuthProvider>
    </QueryClientProvider>
  );
};
