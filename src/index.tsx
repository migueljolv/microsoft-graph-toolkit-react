import "./index.css";
import React from "react";
import ReactDOM from "react-dom/client";
import { Providers } from "@microsoft/mgt-element";
import { Msal2Provider } from "@microsoft/mgt-msal2-provider";

import App from "./App";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

Providers.globalProvider = new Msal2Provider({
  clientId: "0f358d97-019c-4f2a-bb7f-3ee000edbedb",
  scopes: [
    "calendars.read",
    "user.read",
    "openid",
    "profile",
    "people.read",
    "user.readbasic.all",
    "presence.readwrite",
  ],
});

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
