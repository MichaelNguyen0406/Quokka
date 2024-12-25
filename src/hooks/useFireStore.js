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

function useFireStore(collectionName, option = null) {
  const [documents, setDocuments] = useState([]);
  useEffect(() => {
    let q = collection(db, collectionName);

    if (option?.condition) {
      const { field, operator, value } = option.condition;
      q = query(
        q,
        where(field, operator, value),
        orderBy("createdAt", "desc"),
        limit(10)
      );
    }

    if (option?.orderBy) {
      q = query(q, orderBy("createdAt", "desc"));
    }

    if (option?.limit) {
      q = query(q, limit(option.limit));
    }

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
