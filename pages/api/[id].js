import randomUUID from "crypto-randomuuid/polyfill";
import NordigenClient from "nordigen-node";
import * as cookie from "cookie";

import { tokenHandler } from "../../utils/tokenHandler";
import { writeUserData } from "../../firebase/writeUserData";

export default async function getBankUrl(req, res) {
  const { id } = req.query;

  const client = new NordigenClient({
    secretId: process.env.NEXT_PUBLIC_NORDIGEN_SECRET_ID,
    secretKey: process.env.NEXT_PUBLIC_NORDIGEN_SECRET_KEY,
  });

  let user;
  const cookies = cookie.parse(req.headers.cookie || "");
  if (cookies.auth) {
    user = JSON.parse(cookies.auth);
  } else {
    return { props: {} };
  }

  await tokenHandler(client);

  const init = await client.initSession({
    redirectUrl: "https://financiaio.vercel.app/",
    institutionId: id,
    referenceId: randomUUID(),
  });

  writeUserData(
    user,
    init,
    process.env.NEXT_PUBLIC_FIREBASE_USER_NORDIGEN_BANK_TO_APROVE
  );

  res.redirect(init.link);
}
