import { MainLayout } from "../components/MainLayout";
import styles from "../styles/Blog.module.scss";
import { useUser } from "../firebase/useUser";

export default function blog() {
  const { user } = useUser();
  if (!user) return null;
  return (
    <MainLayout title={"Blog"}>
      <h1 className={styles.title}>
        Articles to get you inspired: from personal success stories to currently
        relevant financial topics. You are sure to find something to keep
        growing your financial skill set!
      </h1>
      <div className={styles.blog}>
        <div className={styles.blog_section}>
          <h2 className={styles.blog_title}>
            The latest to help you invest in yourself
          </h2>
          <div className={styles.dialogs}>
            <a
              href="https://financia.io/the-financians-4-miha/"
              className={styles.dialog}
              target="_blank"
              style={{
                backgroundImage: "url('/backgroundImage/Miha.jpg')",
              }}
            >
              <h2 className={styles.dialog_title}>The financians #4: Miha</h2>
              <div className={styles.dialog_description}>
                Featured, The financians
              </div>
            </a>
            <a
              className={styles.dialog}
              href="https://financia.io/financias-insiders-1-art-as-an-investment/"
              target="_blank"
              style={{
                backgroundImage: "url('/backgroundImage/hall.jpg')",
              }}
            >
              <h2 className={styles.dialog_title}>
                financia’s insiders #1: art as an investment
              </h2>
              <div className={styles.dialog_description}>
                Featured, financia's insiders
              </div>
            </a>
            <a
              href="https://financia.io/how-to-manage-your-money-during-a-recession/"
              target="_blank"
              className={styles.dialog}
              style={{
                backgroundImage: "url('/backgroundImage/pads.jpg')",
              }}
            >
              <h2 className={styles.dialog_title}>
                How to manage your money during a recession
              </h2>
              <div className={styles.dialog_description}>
                Featured, Personal Finance
              </div>
            </a>
            <a
              href="https://financia.io/addressing-the-elephants-in-the-room/"
              target="_blank"
              className={styles.dialog}
              style={{
                backgroundImage: "url('/backgroundImage/crisis.jpg')",
              }}
            >
              <h2 className={styles.dialog_title}>
                Inflation, recession, stagflation… addressing the elephants in
                the room
              </h2>
              <div className={styles.dialog_description}>
                Featured, Personal Finance
              </div>
            </a>
            <a
              href="https://financia.io/the-financians-3-gwen/"
              target="_blank"
              className={styles.dialog}
              style={{
                backgroundImage: "url('/backgroundImage/Gwen.jpg')",
              }}
            >
              <h2 className={styles.dialog_title}>The financians #3: Gwen</h2>
              <div className={styles.dialog_description}>
                Featured, The financians
              </div>
            </a>
            <a
              href="https://financia.io/the-financians-2-nate/"
              target="_blank"
              className={styles.dialog}
              style={{
                backgroundImage: "url('/backgroundImage/Nate.jpg')",
              }}
            >
              <h2 className={styles.dialog_title}>The financians #2: Nate</h2>
              <div className={styles.dialog_description}>
                Featured, The financians
              </div>
            </a>
          </div>
        </div>

        <div className={styles.blog_section}>
          <h2 className={styles.blog_title}>
            Our collection of tips&tricks to get you going
          </h2>
          <div className={styles.dialogs}>
            <a
              href="https://financia.io/5-ways-to-get-more-out-of-life/"
              target="_blank"
              className={styles.dialog}
              style={{
                backgroundImage: "url('/backgroundImage/sky.jpg')",
              }}
            >
              <h2 className={styles.dialog_title}>
                5 ways to get more out of life
              </h2>
              <div className={styles.dialog_description}>
                Featured, Personal Finance, Top Tips
              </div>
            </a>
            <a
              href="https://financia.io/10-ways-to-earn-more/"
              target="_blank"
              className={styles.dialog}
              style={{
                backgroundImage: "url('/backgroundImage/unicorn.jpg')",
              }}
            >
              <h2 className={styles.dialog_title}>10 ways to earn more</h2>
              <div className={styles.dialog_description}>
                Featured, Personal Finance, Top Tips
              </div>
            </a>
            <a
              href="https://financia.io/9-ideas-to-reduce-your-taxes/"
              target="_blank"
              className={styles.dialog}
              style={{
                backgroundImage: "url('/backgroundImage/calculator.jpg')",
              }}
            >
              <h2 className={styles.dialog_title}>
                9 ideas to reduce your taxes
              </h2>
              <div className={styles.dialog_description}>
                Featured, Personal Finance, Top Tips
              </div>
            </a>
            <a
              href="https://financia.io/8-ways-to-reduce-expenses/"
              target="_blank"
              className={styles.dialog}
              style={{
                backgroundImage: "url('/backgroundImage/crisis.jpg')",
              }}
            >
              <h2 className={styles.dialog_title}>8 ways to reduce expenses</h2>
              <div className={styles.dialog_description}>
                Featured, Personal Finance, Top Tips
              </div>
            </a>
            <a
              href="https://financia.io/10-ways-to-boost-your-financial-situation/"
              target="_blank"
              className={styles.dialog}
              style={{
                backgroundImage: "url('/backgroundImage/smartphone.jpg')",
              }}
            >
              <h2 className={styles.dialog_title}>
                10 ways to boost your financial situation
              </h2>
              <div className={styles.dialog_description}>
                Featured, Personal Finance, Top Tips
              </div>
            </a>
            <a
              className={styles.dialog}
              style={{
                height: "1px",
              }}
            ></a>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
