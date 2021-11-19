import { useAuth, AuthProvider } from "hooks/use-auth";
import { QueryClient, QueryClientProvider } from "react-query";
import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
  Navigate,
  Outlet
} from "react-router-dom";

import "antd/dist/antd.css";

import { Login } from "containers/Login";
import { SignUp } from "containers/SignUp";

function Layout () {
  const { isAuthenticated } = useAuth();
  return <div style={{ background: isAuthenticated ? "green" : "red" }}><Outlet /></div>;
}

function RequireAuth ({ children }: { children: JSX.Element }) {
  const location = useLocation();
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/login" state={{ from: location }} />;
}

const Main = () => <h1>Main page</h1>;

export const App = () => {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<RequireAuth><Main /></RequireAuth>} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/login" element={<Login />} />
            </Route>
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
};
