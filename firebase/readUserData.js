import { db } from "../firebase/initFirebase";
import { doc, getDoc } from "firebase/firestore";

export const readUserData = async (user, collection) => {
  try {
    const userData = doc(db, collection, user.id);
    const response = await getDoc(userData);
    if (response.exists()) {
      return response.data();
    }
  } catch (error) {
    console.log(error);
  }
};

