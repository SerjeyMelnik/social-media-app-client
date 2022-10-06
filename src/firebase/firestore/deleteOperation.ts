import { doc,deleteDoc ,updateDoc,deleteField} from "firebase/firestore"
import { TUserShortField } from "../../types/userTypes"
import { db } from "../firebase"

type TDeleteDocument = (collectionName: string,docName:string) => Promise<void>
type TDeleteDocumentField = (collectionName: string,docName:string,field:TUserShortField) => Promise<void>

export const deleteDocument:TDeleteDocument = async (collectionName: string,docName:string) => {
	const docRef = doc(db,collectionName,docName)
	await deleteDoc(docRef)
}
export const deleteDocumentField:TDeleteDocumentField = async (collectionName: string,docName:string,field:TUserShortField) => {
	const docRef = doc(db,collectionName,docName)
	await updateDoc(docRef, {
		[field]: deleteField()
	});
}
