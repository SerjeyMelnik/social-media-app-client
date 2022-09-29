import { doc, setDoc } from "firebase/firestore"
import { db } from "../firebase"

type TSetDocument = (collectionName: string,docName:string,docData: unknown) => void
export const setDocument:TSetDocument = async (collectionName: string,docName:string,docData: unknown) => {
	const docRef = doc(db,collectionName,docName)
	await setDoc(docRef,docData)
}