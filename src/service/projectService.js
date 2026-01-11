import { collection, getDocs, query, orderBy } from "firebase/firestore"
import { db } from "../lib/firebase"

export async function getProjects() {
  const q = query(
    collection(db, "Portofolio"),
    // orderBy("createdAt", "desc")
  )

  const snapshot = await getDocs(q)

  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
  }))
}
