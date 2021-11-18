import { useState, useEffect, createContext, useContext, FC } from "react";
import { useMutation, UseMutateFunction } from "react-query";
import { useLocation, useNavigate } from "react-router-dom";
import { LoginFormValues } from "components/LoginForm";
import { AxiosResponse } from "axios";
import { instance } from "api";


interface AuthContextType {
  isAuthenticated: boolean;
  isLoggingIn: boolean;
  logIn: UseMutateFunction<AxiosResponse, unknown, LoginFormValues, unknown>;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider: FC = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const [ isAuthenticated, setIsAuntheficated ] = useState<boolean>(() => Boolean(localStorage.token));
  useEffect(() => void isAuthenticated && navigate(from, { replace: true }), [ isAuthenticated ]);
  window.onstorage = ({ key, newValue }) => key == "token" && setIsAuntheficated(Boolean(newValue));


  const { mutate: logIn, isLoading: isLoggingIn } = useMutation(
    (formValues: LoginFormValues) => instance.post("/user/login", formValues), {
      onSuccess ({ data: { token } }) {
        setIsAuntheficated(Boolean(token));
        localStorage.setItem("token", token);
      }
    }
  );

  const value = { isAuthenticated, isLoggingIn, logIn };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
