import "./App.css";

import { useState, useEffect } from "react";
import { Providers, ProviderState } from "@microsoft/mgt-element";

import { LoggedIn } from "./LoggedIn";
import { NotLoggedIn } from "./NotLoggedIn";
import { getMe } from "./api";

function useIsSignedIn(): [boolean] {
  const [isSignedIn, setIsSignedIn] = useState(false);

  useEffect(() => {
    const updateState = () => {
      const provider = Providers.globalProvider;
      const _isSignedIn = provider && provider.state === ProviderState.SignedIn;
      setIsSignedIn(_isSignedIn);
    };

    Providers.onProviderUpdated(updateState);
    updateState();

    return () => {
      Providers.removeProviderUpdatedListener(updateState);
    };
  }, []);

  return [isSignedIn];
}

function App() {
  const [isSignedIn] = useIsSignedIn();
  const [me, setMe] = useState(undefined);

  const onLoggedIn = async () => {
    const me = await getMe();
    setMe(me);
  };

  useEffect(() => {
    (async () => {
      if (isSignedIn) {
        const me = await getMe();
        setMe(me);
      }
    })();
  }, [isSignedIn]);

  console.log("App.tsx", { isSignedIn, me });

  return (
    <div className="App">
      <header>
        {isSignedIn ? (
          <LoggedIn me={me} />
        ) : (
          <NotLoggedIn onLoggedIn={onLoggedIn} />
        )}
      </header>
    </div>
  );
}

export default App;
