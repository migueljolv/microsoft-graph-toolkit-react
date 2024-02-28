import { Providers } from "@microsoft/mgt-element";

export async function getMe() {
  try {
    const me = await Providers.globalProvider.graph.client.api("/me").get();
    console.log("getMe() data:", { me });
    return me;
  } catch (error) {
    console.error("getMe() failed", error);
    return undefined;
  }
}

export async function login() {
  await Providers.globalProvider?.login?.();
}

export async function logout() {
  await Providers.globalProvider?.logout?.();
}

export async function setPresence(userId: string) {
  console.log("setPresence request fn", { userId });

  await Providers.globalProvider.graph.client
    .api(`/users/${userId}/presence/setPresence`)
    .post({
      sessionId: "0f358d97-019c-4f2a-bb7f-3ee000edbedb",
      availability: "Available",
      activity: "Available",
      expirationDuration: "PT1H",
    });
}

// DoNotDisturb - Presenting
// Available - Available
