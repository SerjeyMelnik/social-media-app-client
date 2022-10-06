import { doc, setDoc } from "firebase/firestore"
import { db } from "../firebase"

type TSetDocument = (collectionName: string,docName:string,docData: object) => void

export const setDocument:TSetDocument = async (collectionName: string,docName:string,docData: object) => {
	const docRef = doc(db,collectionName,docName)
	await setDoc(docRef,docData)
}