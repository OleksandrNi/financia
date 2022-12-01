import { isJwtExpired } from "jwt-check-expiration";
import { readUserData } from "../firebase/readUserData";
import { writeUserData } from "../firebase/writeUserData";

export const tokenHandler = async (client) => {
  let nordigenTokens = await readUserData(
    { id: process.env.NEXT_PUBLIC_FIREBASE_USER_NORDIGEN_TOKEN_DATA },
    process.env.NEXT_PUBLIC_FIREBASE_USER_NORDIGEN_TOKEN_DATA
  );

  let isTokenExpired;
  let isTokenRefreshExpired;

  if (nordigenTokens.data) {
    isTokenExpired = isJwtExpired(nordigenTokens.data.access);
    isTokenRefreshExpired = isJwtExpired(nordigenTokens.data.refresh);
  } else {
    isTokenRefreshExpired = true;
  }

  if (isTokenRefreshExpired) {
    nordigenTokens.data = await client.generateToken();
  } else {
    client.refreshToken = nordigenTokens.data.refresh;
    if (isTokenExpired) {
      const newAccessToken = await client.exchangeToken({
        refreshToken: nordigenTokens.data.refresh,
      });
      client.token = newAccessToken.access;
      nordigenTokens.data = {
        ...newAccessToken,
        refresh: nordigenTokens.data.refresh,
        refresh_expires: nordigenTokens.data.refresh_expires,
      };
    } else {
      client.token = nordigenTokens.data.access;
    }
  }

  await writeUserData(
    { id: process.env.NEXT_PUBLIC_FIREBASE_USER_NORDIGEN_TOKEN_DATA },
    nordigenTokens.data,
    process.env.NEXT_PUBLIC_FIREBASE_USER_NORDIGEN_TOKEN_DATA
  );
};
