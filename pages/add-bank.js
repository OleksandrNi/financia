import Link from "next/link";
import NordigenClient from "nordigen-node";
import * as cookie from "cookie";
import { useState, useEffect, useMemo } from "react";

import { MainLayout } from "../components/MainLayout";
import { useUser } from "../firebase/useUser";
import { writeUserData } from "../firebase/writeUserData";
import { tokenHandler } from "../utils/tokenHandler";

import styles from "../styles/AddBank.module.scss";
import BankAccountInfoModal from "../components/BankAccountInfoModal";
import { readUserData } from "../firebase/readUserData";

export default function addBank({ institutions }) {
  const { user } = useUser();
  const [bankList, setBankList] = useState();

  let isInstitutions = useMemo(
    () => Array.isArray(institutions),
    [institutions]
  );

  useEffect(async () => {
    const banks = await readUserData(user, "connectedBankList");
    if (banks) {
      setBankList(banks.data);
    }
  }, [user]);

  if (!user) return null;

  console.log("instit", institutions);
  console.log("userBank", bankList);

  return (
    <MainLayout title={"Add bank"}>
      <div className={styles.addbank}>
        <div className={styles.connected}>
          <span className={styles.connected_title}>Connected bank account</span>
          {bankList &&
            bankList.map((acc) => (
              <div
                key={acc.id}
                className={styles.link}
                style={{ marginBottom: "5px" }}
              >
                <BankAccountInfoModal acc={acc} />
              </div>
            ))}
        </div>
        <div>
          <div className={styles.connected_title}>List of available Banks</div>
          <div className={styles.link_section}>
            {isInstitutions &&
              institutions.map(({ id, name, logo }) => (
                <li key={id} className={styles.link}>
                  <Link href={`/api/${id}`}>
                    <div className={styles.block}>
                      <a style={{ textAlign: "center" }}>
                        <img src={logo} alt="logo" className={styles.logo} />
                      </a>
                      <div style={{ textAlign: "center" }}>{name}</div>
                    </div>
                  </Link>
                </li>
              ))}
            <Link href={`/api/SANDBOXFINANCE_SFIN0000`}>
              <a className={styles.link}>SandBox test account</a>
            </Link>
          </div>
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
  if (cookies.auth) {
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
