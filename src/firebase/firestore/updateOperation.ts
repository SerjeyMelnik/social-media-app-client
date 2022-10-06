import { doc, updateDoc } from "firebase/firestore"
import { db } from "../firebase"

type TUpdateDocument = (collectionName: string,docName:string,docDataToUpdate: object) => Promise<void>

export const updateDocument:TUpdateDocument = async (collectionName: string,docName:string,docDataToUpdate: object) => {
	const docRef = doc(db,collectionName,docName)
	await updateDoc(docRef,docDataToUpdate)
}

