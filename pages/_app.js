import "../styles/global.css";
import { wrapper } from "../store/store";

function MyApp({ Component, pageProps }) {
  return (
    <>
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
