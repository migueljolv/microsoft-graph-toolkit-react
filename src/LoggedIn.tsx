import { Agenda } from "@microsoft/mgt-react";
import * as api from "./api";

type LoggedInProps = {
  me?: User;
};

export function LoggedIn({ me }: LoggedInProps) {
  console.log("LoggedIn.tsx", { me });

  const handleSetPresence = async () => {
    console.log("setPresence()");
    if (me) {
      try {
        await api.setPresence(me.id);
      } catch (error) {
        console.error("setPresence() failed", error);
      }
    }
  };
  const handleLogout = async () => {
    console.log("logout()");
    await api.logout();
  };

  return (
    <>
      {me && (
        <ul>
          {Object.entries(me).map(
            ([key, value]) =>
              value && (
                <li key={key}>
                  <strong>{key}: </strong>
                  <span>{value}</span>
                </li>
              )
          )}
        </ul>
      )}
      <button onClick={handleSetPresence}>Set presence</button>
      <button onClick={handleLogout}>Logout</button>
      <Agenda />
    </>
  );
}

type User = {
  displayName: string;
  givenName: string;
  mail: string;
  userPrincipalName: string;
  id: string;
  businessPhones?: string[];
  jobTitle?: string | null;
  mobilePhone?: string | null;
  officeLocation?: string | null;
  preferredLanguage?: string;
  surname?: string;
};
