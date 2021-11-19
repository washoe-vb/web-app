import { SignUpForm } from "components/SignUpForm";
import { useAuth } from "hooks/use-auth";

export const SignUp = () => {
  const { signUp } = useAuth();

  return <SignUpForm onSignUp={signUp} />;
};
