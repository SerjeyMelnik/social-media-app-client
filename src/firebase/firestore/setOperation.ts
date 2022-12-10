import { doc, setDoc } from "firebase/firestore"
import { Collections } from "../../utils/constants"
import { db } from "../firebase"

type TSetDocument = (collectionName: Collections,docName:string,docData: object) => void

export const setDocument:TSetDocument = async (collectionName: Collections,docName:string,docData: object) => {
	const docRef = doc(db,collectionName,docName)
	await setDoc(docRef,docData)
}