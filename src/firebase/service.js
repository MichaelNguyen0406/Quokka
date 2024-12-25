import { db } from "./config";
import {
  collection,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
  getDoc,
  setDoc,
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
  console.log(data);

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

export const getDocumentById = async (collectionName, documentId) => {
  const docRef = doc(db, collectionName, documentId);
  try {
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data();
    }
  } catch (error) {
    console.log("Error: ", error);
  }
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
