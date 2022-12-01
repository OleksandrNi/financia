import { db } from "../firebase/initFirebase";
import { doc, setDoc } from "firebase/firestore";

export const writeUserData = async (user, data, collection) => {
  try {
    const userDoc = doc(db, collection, user.id);
    await setDoc(userDoc, {
      data
    });
    console.log("Data was successfully sent to cloud firestore from function!");
  } catch (error) {
    console.log(error);
  }
};
