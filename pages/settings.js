import { MainLayout } from "../components/MainLayout";
import styles from "../styles/Settings.module.scss";
import { useUser } from "../firebase/useUser";
import { useSelector } from "react-redux";
import UserInfoModal from "../components/UserInfoModal";
import ChangeEmailModal from "../components/ChangeEmailModal";
import ChangePaswordModal from "../components/ChangePaswordModal";
import DeleteUserModal from "../components/DeleteUserModal";

export default function settings() {
  const { user } = useUser();
  const { userData } = useSelector((state) => state.userDataSlice);

  if (!user) return null;

  return (
    <MainLayout title={"Settings"}>
      <div className={styles.settings}>
        <div className={styles.settings_billing}>
          <p className={styles.settings_billing_title}>Billing information</p>
          <div className={styles.settings_billing_list}>
            <div className={styles.settings_billing_link}>
              First name: {userData.firstName}
            </div>
            <div className={styles.settings_billing_link}>
              Last Name: {userData.lastName}
            </div>
            <div className={styles.settings_billing_link}>
              Street: {userData.street}
            </div>
            <div className={styles.settings_billing_link}>
              Postal: {userData.postal}
            </div>
            <div className={styles.settings_billing_link}>
              City: {userData.city}
            </div>
            <div className={styles.settings_billing_link}>
              Country: {userData.country}
            </div>
          </div>
          <UserInfoModal />
        </div>
        <div className={styles.settings_user}>
          <div className={styles.settings_user_info}>
            <p className={styles.settings_billing_title}>User information</p>
            <div className={styles.settings_billing_list}>
              <div className={styles.settings_billing_link}>
                User name: {user.name}
              </div>
              <div className={styles.settings_billing_link}>
                User email: {user.email}
              </div>
              <ChangeEmailModal />
              <ChangePaswordModal />
              <DeleteUserModal />
            </div>
          </div>
          <div className={styles.settings_user_app}>
            <p className={styles.settings_billing_title}>
              Application settings
            </p>
            <div className={styles.settings_billing_link}>Language</div>
            <div className={styles.settings_billing_link}>Security</div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
