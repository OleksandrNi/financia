import { db } from "./initFirebase";
import { doc, deleteDoc } from "firebase/firestore";

export const deleteUserData = async (user, collection) => {
  try {
    const userDoc = doc(db, collection, user.id);
    await deleteDoc(userDoc);
    console.log("Data was successfully deleted!");
  } catch (error) {
    console.log(error);
  }
};
