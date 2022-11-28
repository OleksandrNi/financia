import "../styles/global.css";
import { wrapper } from "../store/store";
import NextNProgress from 'nextjs-progressbar';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <NextNProgress color="#29D" startPosition={0.3} stopDelayMs={100} height={10} showOnShallow={true} />
      <Component {...pageProps} />
      <style jsx global>
        {`
          body {
            font-family: "Didact Gothic", "Playfair Display", sans-serif;
          }
        `}
      </style>
    </>
  );
}

export default wrapper.withRedux(MyApp);
