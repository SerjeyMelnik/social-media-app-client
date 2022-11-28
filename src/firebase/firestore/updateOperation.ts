import { doc, updateDoc } from "firebase/firestore"
import { Collections } from "../../utils/constants"
import { db } from "../firebase"

type TUpdateDocument = (collectionName: Collections,docName:string,docDataToUpdate: object) => Promise<void>;
type TUpdateDocumentField = (collectionName: Collections,docName:string,field: string,fieldUpdatedData:any) => Promise<void>;


export const updateDocument:TUpdateDocument = async (collectionName: Collections,docName:string,docDataToUpdate: object) => {
	const docRef = doc(db,collectionName,docName)
	await updateDoc(docRef,docDataToUpdate)
}
export const updateDocumentField:TUpdateDocumentField = async (collectionName: Collections,docName:string,field: string,fieldUpdatedData:any) => {
	const docRef = doc(db,collectionName,docName)
	await updateDoc(docRef,{
		[field]: fieldUpdatedData
	})
}

