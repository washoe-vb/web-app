import { useState, createContext, useContext, FC } from "react";
import { useMutation, UseMutateFunction } from "react-query";
import { LoginFormValues } from "components/LoginForm";
import { AxiosResponse } from "axios";
import { instance } from "api";
import { message } from "antd";

interface AuthContextType {
  isAuthenticated: boolean;
  isLoggingIn: boolean;
  isSigningUp: boolean;
  logIn: UseMutateFunction<AxiosResponse, unknown, LoginFormValues, unknown>;
  signUp: UseMutateFunction<AxiosResponse, unknown, LoginFormValues, unknown>;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider: FC = ({ children }) => {
  const [isAuthenticated, setIsAuntheficated] = useState<boolean>(() =>
    Boolean(localStorage.token)
  );

  window.onstorage = ({ key, newValue }) =>
    key === "token" && setIsAuntheficated(Boolean(newValue));

  const { mutate: logIn, isLoading: isLoggingIn } = useMutation(
    (formValues: LoginFormValues) => instance.post("/user/login", formValues),
    {
      onSuccess({ data: { token } }) {
        setIsAuntheficated(Boolean(token));
        localStorage.setItem("token", token);
      },
      onError() {
        message.error("Something went wrong");
      },
    }
  );

  const { mutate: signUp, isLoading: isSigningUp } = useMutation(
    (formValues: LoginFormValues) => instance.post("/user/signup", formValues),
    {
      onSuccess({ data: { token } }) {
        setIsAuntheficated(Boolean(token));
        localStorage.setItem("token", token);
      },
      onError() {
        message.error("Something went wrong");
      },
    }
  );

  const value = { isAuthenticated, isLoggingIn, logIn, isSigningUp, signUp };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
