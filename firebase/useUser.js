import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { initFirebase } from "../firebase/initFirebase";
import {
  deleteUser,
  getAuth,
  updateEmail,
  updatePassword,
  reauthenticateWithCredential,
  EmailAuthProvider,
} from "firebase/auth";
import {
  removeUserCookie,
  setUserCookie,
  getUserFromCookie,
} from "../firebase/userCookies";
import { mapUserData } from "../firebase/mapUserData";

initFirebase();

const useUser = () => {
  const [user, setUser] = useState();
  const router = useRouter();
  const auth = getAuth();

  const logout = async () => {
    try {
      await auth.signOut();
      removeUserCookie();
      router.push("/");
    } catch (e) {
      console.log(e.message);
    }
  };

  const reauthenticate = async (password) => {
    let wrongPassord = false;
    const credential = EmailAuthProvider.credential(
      auth.currentUser.email,
      password
    );
    await reauthenticateWithCredential(auth.currentUser, credential).catch(
      (error) => {
        wrongPassord = true;
      }
    );
    return wrongPassord;
  };

  const changeUserPassword = async (password, newPassword) => {
    const result = await reauthenticate(password);
    let passwordCorrect = false;
    if (result) {
    } else {
      await updatePassword(auth.currentUser, newPassword)
        .then(() => {
          passwordCorrect = true;
        })
        .catch((e) => {
          console.log(e.message);
        });
    }
    return passwordCorrect;
  };

  const changeUserEmail = async (password, newEmail) => {
    const result = await reauthenticate(password);
    let passwordCorrect = false;
    if (result) {
    } else {
      await updateEmail(auth.currentUser, newEmail)
        .then(() => {

          passwordCorrect = true;
        })
        .catch((e) => {
          console.log(e.message);
        });
    }
    return passwordCorrect;
  };

  const deleteUserAccount = async (password) => {
    const result = await reauthenticate(password);
    let passwordCorrect = false;

    if (result) {
    } else {
      await deleteUser(auth.currentUser)
        .then(() => {
          passwordCorrect = true;
        })
        .catch((e) => {
          console.log(e.message);
        });
    }
    return passwordCorrect;
  };

  useEffect(() => {
    const cancelAuthListener = auth.onIdTokenChanged((user) => {
      if (user) {
        const userData = mapUserData(user);
        setUserCookie(userData);
        setUser(userData);
      } else {
        removeUserCookie();
        setUser();
      }
    });

    const userFromCookie = getUserFromCookie();
    if (!userFromCookie) {
      router.push("/");
      return;
    }
    setUser(userFromCookie);

    return () => {
      cancelAuthListener();
    };
  }, []);

  return {
    user,
    logout,
    changeUserEmail,
    changeUserPassword,
    deleteUserAccount,
  };
};

export { useUser };
