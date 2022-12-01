import React, { useState } from "react";
import FirebaseAuth from "./auth/FirebaseAuth";
import styles from "../styles/NotAuthPage.module.scss";
import Button from "@mui/material/Button";

export default function NotAuthPage() {
  const [showAuth, setShowAuth] = useState(false);

  return (
    <div className={styles.notauth}>
      <header className={styles.notauth_header}>
        <a
          className={styles.notauth_header_logo}
          href="https://financia.io"
          target="_blank"
        ></a>
        {!showAuth ? (
          <Button
            sx={{
              widht: "28px",
              fontSize: "10px",
              padding: "2px",
              backgroundColor: "#CD447D",
              color: "#fff",
            }}
            variant="outlined"
            onClick={() => setShowAuth(!showAuth)}
          >
            Login
          </Button>
        ) : null}
      </header>
      <main className={styles.notauth_main}>
        <h1>Welcome to the financia.io</h1>

        {!showAuth ? (
          <span
            className={styles.notauth_main_link}
            onClick={() => setShowAuth(true)}
          >
            Please register or login
          </span>
        ) : null}
        {showAuth ? <FirebaseAuth /> : null}
      </main>
      <footer className={styles.notauth_footer}></footer>
    </div>
  );
}
