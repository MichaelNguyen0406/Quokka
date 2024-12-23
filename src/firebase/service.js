import { db } from "./config";
import { collection, addDoc, deleteDoc, doc } from "firebase/firestore";

export const addDocument = async (name, data) => {
  const docRef = collection(db, name);
  try {
    await addDoc(docRef, {
      ...data,
      createdAt: new Date(),
    });
  } catch (error) {
    console.log("Error add document: ", error);
  }
};

export const deleteDocumentById = async (name, id) => {
  return deleteDoc(doc(db, name, id));
};
