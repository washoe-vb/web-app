import { useAuth, AuthProvider } from "hooks/use-auth";
import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
  Navigate,
  Outlet
} from "react-router-dom";
import { Login } from "containers/Login";

import "antd/dist/antd.css";

function Layout () {
  let auth = useAuth();
  return <div style={{ background: auth.user ? "green" : "red" }}><Outlet /></div>;
}

function RequireAuth ({ children }: { children: JSX.Element }) {
  let auth = useAuth();
  let location = useLocation();
  if (!auth.user) return <Navigate to="/login" state={{ from: location }} />;
  return children;
}

function PublicPage () {
  return <h3>Public</h3>;
}

function ProtectedPage () {
  return <h3>Protected</h3>;
}



export const App = () => (
  <BrowserRouter>
    <AuthProvider>
      <h1>App</h1>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<PublicPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/protected" element={<RequireAuth><ProtectedPage /></RequireAuth>} />
        </Route>
      </Routes>
    </AuthProvider>
  </BrowserRouter>
);










// const ProtectedRoute = ({ element }) => {
//   const Element = element;
//   return <Route path="/protected" element={<RequireAuth><Element /></RequireAuth>} />;
// };

// function AuthStatus () {
//   let auth = useAuth();
//   let navigate = useNavigate();
//   console.log(auth);
//
//   if (!auth.user) return <p>You are not logged in.</p>;
//
//   return (
//     <p>
//       Welcome {auth.user}!{" "}
//       <button onClick={() => auth.signout(() => navigate("/"))}>
//         Sign out
//       </button>
//     </p>
//   );
// }


