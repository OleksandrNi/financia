import Link from "next/link";
import NordigenClient from "nordigen-node";
import * as cookie from "cookie";
import { useMemo } from "react";

import { MainLayout } from "../components/MainLayout";
import { useUser } from "../firebase/useUser";
import { writeUserData } from "../firebase/writeUserData";
import { tokenHandler } from "../utils/tokenHandler";

import styles from "../styles/AddBank.module.scss";

export default function addBank({ institutions }) {
  const { user } = useUser();
  let isInstitutions = useMemo(
    () => Array.isArray(institutions),
    [institutions]
  );
  if (!user) return null;

  return (
    <MainLayout title={"Add bank"}>
      <div className={styles.addbank}>
        <div className={styles.link_section}>
          {isInstitutions &&
            institutions.map(({ id, name, logo }) => (
              <li key={id} className={styles.link}>
                <div>
                  <Link href={`/api/${id}`}>
                    <a>
                      <img src={logo} alt="logo" className={styles.logo} />
                    </a>
                  </Link>
                </div>
              </li>
            ))}
          <Link href={`/api/SANDBOXFINANCE_SFIN0000`}>
            <a className={styles.link}>SandBox test account</a>
          </Link>
        </div>
      </div>
    </MainLayout>
  );
}

export async function getServerSideProps({ req }) {
  const client = new NordigenClient({
    secretId: process.env.NEXT_PUBLIC_NORDIGEN_SECRET_ID,
    secretKey: process.env.NEXT_PUBLIC_NORDIGEN_SECRET_KEY,
  });

  let user;
  const cookies = cookie.parse(req.headers.cookie || "");
  if (Object.keys(cookies).length) {
    user = JSON.parse(cookies.auth);
  } else {
    return { props: {} };
  }

  await tokenHandler(client);

  const institutions = await client.institution.getInstitutions({
    country: "BE",
  });

  await writeUserData(
    user,
    institutions,
    process.env.NEXT_PUBLIC_FIREBASE_USER_NORDIGEN_COUNTRY_BANK_LIST
  );

  return { props: { institutions } };
}
