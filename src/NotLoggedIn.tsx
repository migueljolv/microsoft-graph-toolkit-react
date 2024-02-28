import { Login } from "@microsoft/mgt-react";

import { login } from "./api";

type LoggedInProps = {
  onLoggedIn?: () => void;
};

export function NotLoggedIn({ onLoggedIn }: LoggedInProps) {
  const handleLoginClicked = async () => {
    try {
      await login();
      onLoggedIn?.();
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  return (
    <>
      <Login
        loginView="full"
        showPresence
        loginInitiated={handleLoginClicked}
        loginCompleted={() => console.log("Login completed")}
        loginFailed={(err) => console.error("Login failed", err)}
      />
    </>
  );
}
