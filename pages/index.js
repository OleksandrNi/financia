import NordigenClient from "nordigen-node";
import { Oval } from "react-loader-spinner";
import Tooltip from "@mui/joy/Tooltip";
import * as cookie from "cookie";
import Link from "next/link";

import { readUserData } from "../firebase/readUserData";
import { writeUserData } from "../firebase/writeUserData";
import { MainLayout } from "../components/MainLayout";
import NotAuthPage from "../components/notAuthPage";
import MonthCard from "../components/MonthCard";
import { useUser } from "../firebase/useUser";

import styles from "../styles/Home.module.scss";
import { tokenHandler } from "../utils/tokenHandler";
import { preparedData } from "../utils/preparedData";

export default function Home({ connectedBank }) {
  const { user } = useUser();

  let totalBalance = 0;
  let recievedQuarterPayment = 0;
  let sendQuarterPayment = 0;
  let recievedOneMonthAgo = 0;
  let recievedTwoMonthAgo = 0;
  let recievedThreeMonthAgo = 0;
  let sendOneMonthAgo = 0;
  let sendTwoMonthAgo = 0;
  let sendThreeMonthAgo = 0;
  let categoryOneMonthAgo = {};
  let categoryTwoMonthAgo = {};
  let categoryThreeMonthAgo = {};
  let lastTransaction = [];

  if (connectedBank) {
    for (let i = 0; i < connectedBank.length; i++) {
      totalBalance += +connectedBank[i].balances_amount;
      recievedQuarterPayment += +connectedBank[i].recievedTotalPayment;
      sendQuarterPayment += +connectedBank[i].sendTotalPayment;
      recievedOneMonthAgo +=
        +connectedBank[i].monthTransactionInfo[0].recievedPayment;
      recievedTwoMonthAgo +=
        +connectedBank[i].monthTransactionInfo[1].recievedPayment;
      recievedThreeMonthAgo +=
        +connectedBank[i].monthTransactionInfo[2].recievedPayment;
      sendOneMonthAgo += +connectedBank[i].monthTransactionInfo[0].sendPayment;
      sendTwoMonthAgo += +connectedBank[i].monthTransactionInfo[1].sendPayment;
      sendThreeMonthAgo +=
        +connectedBank[i].monthTransactionInfo[2].sendPayment;
      let obj0 = connectedBank[i].monthTransactionInfo[0].sortCategoryByMonth;
      let obj1 = connectedBank[i].monthTransactionInfo[1].sortCategoryByMonth;
      let obj2 = connectedBank[i].monthTransactionInfo[2].sortCategoryByMonth;
      lastTransaction = [
        ...lastTransaction,
        ...connectedBank[i].lastFiveTransaction,
      ];

      const reduceCategory = (obj, initial) =>
        Object.keys(obj).reduce((result, current) => {
          let copy = { ...result };
          if (current in copy) {
            copy[current] = copy[current] + obj[current];
          } else {
            copy[current] = obj[current];
          }
          return copy;
        }, initial);

      categoryOneMonthAgo = reduceCategory(obj0, categoryOneMonthAgo);
      categoryTwoMonthAgo = reduceCategory(obj1, categoryTwoMonthAgo);
      categoryThreeMonthAgo = reduceCategory(obj2, categoryThreeMonthAgo);
    }
  }

  let bigBar;
  let smallBar;
  let isBiggestSum;
  if (recievedOneMonthAgo > -sendOneMonthAgo) {
    isBiggestSum = true;
    bigBar = recievedOneMonthAgo;
    smallBar = -sendOneMonthAgo;
  } else {
    isBiggestSum = false;
    bigBar = -sendOneMonthAgo;
    smallBar = recievedOneMonthAgo;
  }

  const preparedLastTransaction = lastTransaction.sort((a, b) => {
    return new Date(b.bookingDate) - new Date(a.bookingDate);
  });

  if (user) {
    return (
      <MainLayout title={"Home"}>
        {connectedBank ? (
          <div className={styles.dashboard}>
            {connectedBank.length ? (
              <div className={styles.dashboard_dash}>
                <div className={styles.dashboard_dash_graph}>
                  <div>
                    <div className={styles.dashboard_dash_title}>
                      Hey there,
                    </div>
                    <div className={styles.dashboard_dash_title}>
                      Your daily summury is ready!
                    </div>
                    <div className={styles.dashboard_dash_balance}>
                      <div className={styles.dashboard_dash_text}>
                        Your total available balance is
                      </div>
                      <div className={styles.dashboard_dash_window}>
                        {Math.floor(totalBalance)}€
                      </div>
                    </div>
                    <div className={styles.dashboard_dash_balances}>
                      {connectedBank.map((acc) => (
                        <div className={styles.dashboard_dash_balances_item}>
                          <div>{acc.bank_name || "account"}</div>{" "}
                          <div>{acc.balances_amount.replace(".", ",")}€</div>
                        </div>
                      ))}
                    </div>
                    <br />
                    <div className={styles.dashboard_dash_balance}>
                      <Tooltip
                        title={
                          <span style={{ color: "white" }}>
                            *based on an average of the past 3 months of your
                            data
                          </span>
                        }
                      >
                        <span className={styles.dashboard_dash_text}>
                          Projected monthly spending*
                        </span>
                      </Tooltip>
                      <span className={styles.dashboard_dash_window}>
                        {Math.floor(-sendQuarterPayment / 3)}€
                      </span>
                    </div>
                  </div>
                  <div className={styles.dashboard_grapharea}>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        marginRight: "20px",
                      }}
                    >
                      <div
                        className={styles.dashboard_grapharea_bar}
                        style={{
                          height: `250px`,
                          backgroundColor: "green",
                        }}
                      >
                        {Math.floor(bigBar)}€
                      </div>
                      <div>{isBiggestSum ? "Inflow" : "Outflow"}</div>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                      }}
                    >
                      <div
                        className={styles.dashboard_grapharea_bar}
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          textAlign: "center",
                          height: `${
                            ((bigBar - smallBar) / bigBar) * 250 - 5
                          }px`,
                          backgroundColor: "lightblue",
                          marginBottom: "5px",
                          borderRadius: "10px",
                        }}
                      >
                        <div style={{ fontSize: "14px" }}>
                          Net Monthly Cash flow
                        </div>
                        {isBiggestSum ? "+" : "-"}
                        {Math.floor(bigBar - smallBar)}€
                      </div>
                      <div
                        className={styles.dashboard_grapharea_bar}
                        style={{
                          height: `${(smallBar / bigBar) * 250}px`,
                          backgroundColor: "orange",
                        }}
                      >
                        {Math.floor(smallBar)}€
                      </div>
                      <div>{isBiggestSum ? "Outflow" : "Inflow"}</div>
                    </div>
                  </div>
                </div>
                <div className={styles.dashboard_dash_cards}>
                  <MonthCard
                    category={categoryOneMonthAgo}
                    recievedOneMonthAgo={recievedOneMonthAgo}
                    sendOneMonthAgo={sendOneMonthAgo}
                  />
                  <br />
                  <span className={styles.dashboard_dash_text}>
                    Last 5 transaction
                  </span>
                  <div className={styles.dashboard_dash_balances}>
                    {preparedLastTransaction.slice(0, 5).map((tac) => (
                      <div
                        key={tac.transactionId}
                        className={styles.dashboard_dash_balances_item}
                      >
                        <div>
                          {tac.enrichment.displayName ||
                            tac.debtorName ||
                            "transaction"}
                        </div>{" "}
                        <div>
                          {tac.transactionAmount.amount.replace(".", ",")}€
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  width: "100%",
                  alignItems: "center",
                }}
              >
                <p>No connected accounts</p>
                <div className={styles.dashboard_banks_list_link}>
                  <Link href={"/add-bank"}>
                    <a>Add bank</a>
                  </Link>
                </div>
              </div>
            )}
          </div>
        ) : (
          <Oval
            ariaLabel="loading-indicator"
            height={500}
            width={100}
            strokeWidth={1}
            strokeWidthSecondary={1}
            color="blue"
            secondaryColor="white"
          />
        )}
      </MainLayout>
    );
  } else return <NotAuthPage />;
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

  const countryBankList = await readUserData(
    user,
    process.env.NEXT_PUBLIC_FIREBASE_USER_NORDIGEN_COUNTRY_BANK_LIST
  );

  await tokenHandler(client);

  let requisitionUser = await readUserData(
    user,
    process.env.NEXT_PUBLIC_FIREBASE_USER_NORDIGEN_BANK_TO_APROVE
  );
  let requisitionData;
  let listOfBankFromData = await readUserData(
    user,
    process.env.NEXT_PUBLIC_FIREBASE_USER_NORDIGEN_BANK_LIST
  );
  let accountList;
  let isToday;
  const updatedDate = new Date();
  const preparedUpdatedDate =
    updatedDate.getFullYear() +
    "-" +
    (updatedDate.getMonth() + 1) +
    "-" +
    updatedDate.getDate();

  if (listOfBankFromData?.data) {
    const { list, date } = listOfBankFromData.data;
    const today = new Date();
    const prepDate = new Date(date);
    accountList = list;
    isToday = today.toDateString() === prepDate.toDateString();
  }

  if (requisitionUser?.data?.id) {
    requisitionData = await client.requisition.getRequisitionById(
      requisitionUser.data.id
    );
    isToday = false;
    let newData;
    if (listOfBankFromData) {
      newData = {
        list: [...listOfBankFromData.data.list, requisitionData],
        date: preparedUpdatedDate,
      };
    } else {
      newData = {
        list: [requisitionData],
        date: preparedUpdatedDate,
      };
    }
    writeUserData(
      user,
      newData,
      process.env.NEXT_PUBLIC_FIREBASE_USER_NORDIGEN_BANK_LIST
    );
    writeUserData(
      user,
      {},
      process.env.NEXT_PUBLIC_FIREBASE_USER_NORDIGEN_BANK_TO_APROVE
    );
    listOfBankFromData = newData.list;
    accountList = listOfBankFromData;
  }

  let userAccountBankData = [];

  if (isToday) {
    let fetchUserAccountBankData = await readUserData(
      user,
      process.env.NEXT_PUBLIC_FIREBASE_USER_NORDIGEN_ACCOUNT_BANK_DATA
    );
    userAccountBankData = fetchUserAccountBankData?.data || [];
    console.log("fetch from database");
  } else {
    console.log("fetch from nordigen");
    if (listOfBankFromData) {
      for (let i = 0; i < accountList.length; i++) {
        for (let n = 0; n < accountList[i].accounts.length; n++) {
          const accountId = accountList[i].accounts[n];
          const account = client.account(accountId);
          const metadata = await account.getMetadata();
          const balances = await account.getBalances();
          // const details = await account.getPremiumDetails();
          const details = await account.getDetails();
          const transactions = await account.getPremiumTransactions();

          userAccountBankData.push({
            accountId,
            metadata,
            balances,
            details,
            transactions,
          });
        }
      }
      writeUserData(
        user,
        userAccountBankData,
        process.env.NEXT_PUBLIC_FIREBASE_USER_NORDIGEN_ACCOUNT_BANK_DATA
      );
      let newData = {
        list: Array.isArray(listOfBankFromData)
          ? [...listOfBankFromData]
          : [...listOfBankFromData.data?.list],
        date: preparedUpdatedDate,
      };

      writeUserData(
        user,
        newData,
        process.env.NEXT_PUBLIC_FIREBASE_USER_NORDIGEN_BANK_LIST
      );
    }
  }
  let connectedBank = [];

  if (userAccountBankData) {
    connectedBank = preparedData(userAccountBankData, countryBankList);
    writeUserData(user, connectedBank, "connectedBankList");
  }
  return { props: { connectedBank } };
}
