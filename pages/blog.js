import { MainLayout } from "../components/MainLayout";
import styles from "../styles/Blog.module.scss";
import { useUser } from "../firebase/useUser";

export default function blog() {
  const { user } = useUser();
  if (!user) return null;
  return (
    <MainLayout title={"Blog"}>
      <div className={styles.blog}>
        <h1>blog page here</h1>
        <a href="https://financia.io" target="_blank">
          <h2>redirect to financia (click)</h2>
        </a>

        <div className={styles.dialogs}>
          <div className={styles.dialog} style={{
            backgroundImage: 'url(https://financia.io/wp-content/uploads/elementor/thumbs/Photo-Miha-pv176i41wy53aolnra2n9f1ppbrg76guvb7txbl09s.jpg)',
          }}></div>
        </div>
      </div>
    </MainLayout>
  );
}
