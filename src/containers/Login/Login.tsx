import { LoginForm } from "components/LoginForm";
import { useAuth } from "hooks/use-auth";

export const Login = () => {
  const { logIn } = useAuth();

  return <LoginForm onLogIn={logIn} />;
};
