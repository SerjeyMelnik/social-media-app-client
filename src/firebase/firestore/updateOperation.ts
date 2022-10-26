import { doc, updateDoc } from "firebase/firestore"
import { db } from "../firebase"

type TUpdateDocument = (collectionName: string,docName:string,docDataToUpdate: object) => Promise<void>
type TUpdateDocumentField = (collectionName: string,docName:string,field: string,fieldUpdatedData:any) => Promise<void>
export const updateDocument:TUpdateDocument = async (collectionName: string,docName:string,docDataToUpdate: object) => {
	const docRef = doc(db,collectionName,docName)
	await updateDoc(docRef,docDataToUpdate)
}
export const updateDocumentField:TUpdateDocumentField = async (collectionName: string,docName:string,field: string,fieldUpdatedData:any) => {
	const docRef = doc(db,collectionName,docName)
	await updateDoc(docRef,{
		[field]: fieldUpdatedData
	})
}

