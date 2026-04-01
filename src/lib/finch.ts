import Finch from "@tryfinch/finch-api";

let storedAccessToken: string | null = null;
let storedProviderId: string | null = null;

export function setToken(token: string, providerId: string) {
  storedAccessToken = token;
  storedProviderId = providerId;
}

export function getToken(): string | null {
  return storedAccessToken;
}

export function getProviderId(): string | null {
  return storedProviderId;
}

export function clearToken() {
  storedAccessToken = null;
  storedProviderId = null;
}

export function getSandboxClient() {
  const clientId = process.env.FINCH_CLIENT_ID;
  const clientSecret = process.env.FINCH_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    throw new Error("FINCH_CLIENT_ID and FINCH_CLIENT_SECRET must be set");
  }

  return new Finch({ clientID: clientId, clientSecret });
}

export function getDataClient() {
  const token = getToken();
  if (!token) {
    throw new Error("No access token available. Connect to a provider first.");
  }
  return new Finch({ accessToken: token });
}
