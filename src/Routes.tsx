import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useAuth } from "hooks/use-auth";

import { Layout } from "components/Layout";

import { Login } from "containers/Login";
import { SignUp } from "containers/SignUp";
import { AddWord } from "containers/AddWord";
import { WordsList } from "components/WordsList";
import { Dictionary } from "containers/Dictionary";

function RequireAuth({ children }: { children: JSX.Element }) {
  const location = useLocation();
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? (
    children
  ) : (
    <Navigate to="/login" state={{ from: location }} />
  );
}

export const MyRoutes = () => (
  <Routes>
    <Route element={<Layout />}>
      <Route
        path="/"
        element={
          <RequireAuth>
            <Dictionary />
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
);
