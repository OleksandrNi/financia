import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html>
      <Head>
        {/* <link
          href="https://fonts.googleapis.com/css2?family=Didact+Gothic&display=swap"
          rel="stylesheet"
        /> */}
        {/* <link href="https://fonts.googleapis.com/css2?family=Playfair+Display&display=swap" rel="stylesheet"/> */}
        <link href="https://fonts.googleapis.com/css2?family=Didact+Gothic&family=Playfair+Display:wght@400;700&display=swap" rel="stylesheet"/>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
