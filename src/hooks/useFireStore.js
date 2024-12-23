import {
  onSnapshot,
  collection,
  orderBy,
  query,
  where,
  limit,
} from "firebase/firestore";
import { db } from "../firebase/config";
import { useEffect, useState } from "react";

function useFireStore(collectionName) {
  const [documents, setDocuments] = useState([]);
  useEffect(() => {
    const collectionRef = collection(db, collectionName);
    const q = query(collectionRef, orderBy("createdAt", "desc"), limit(10));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const items = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setDocuments(items);
    });

    return unsubscribe;
  }, [collectionName]);

  return documents;
}

export default useFireStore;
