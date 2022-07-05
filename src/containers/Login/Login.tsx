import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { LoginForm } from "components/LoginForm";
import { useAuth } from "hooks/use-auth";

function useRedirectToRequestedPage (isAuthenticated: boolean) {
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/";

  useEffect(() => {
    if (isAuthenticated) navigate(from, { replace: true });
  }, [ isAuthenticated, from, navigate ]);
}



export const Login = () => {
  const { logIn, isAuthenticated } = useAuth();
  useRedirectToRequestedPage(isAuthenticated);

  return <LoginForm onLogIn={logIn} />;
};
