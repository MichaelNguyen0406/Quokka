import { db } from "./config";
import {
  collection,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
  setDoc,
  onSnapshot,
} from "firebase/firestore";

export const addDocument = async (collectionName, data) => {
  const docRef = collection(db, collectionName);
  try {
    const result = await addDoc(docRef, {
      ...data,
      createdAt: new Date(),
    });
    return result;
  } catch (error) {
    console.log("Error add document: ", error);
  }
};

export const addDocumentId = async (collectionName, data, documentId) => {
  const docRef = doc(db, collectionName, documentId);
  try {
    await setDoc(docRef, { ...data, createdAt: new Date() });
  } catch (error) {
    console.log("Error add document: ", error);
  }
};

export const deleteDocumentById = async (collectionName, documentId) => {
  return deleteDoc(doc(db, collectionName, documentId));
};

export const getDocumentById = async (collectionName, documentId, callback) => {
  const docRef = doc(db, collectionName, documentId);
  onSnapshot(docRef, (docSnapshot) => {
    if (docSnapshot.exists()) {
      callback({ id: docSnapshot.id, ...docSnapshot.data() });
    } else {
      console.error("Document does not exist");
    }
  });
};

export const updateCollectionFieldById = async (
  collectionName,
  documentId,
  fieldName,
  fieldValue
) => {
  const docRef = doc(db, collectionName, documentId);
  await updateDoc(docRef, {
    [fieldName]: fieldValue,
  });
};
