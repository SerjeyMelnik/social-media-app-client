import { doc,deleteDoc ,updateDoc,deleteField} from "firebase/firestore"
import { TUserShortField } from "../../types/userTypes"
import { Collections } from "../../utils/constants"
import { db } from "../firebase"

type TDeleteDocument = (collectionName: Collections,docName:string) => Promise<void>
type TDeleteDocumentField = (collectionName: Collections,docName:string,field:TUserShortField) => Promise<void>

export const deleteDocument:TDeleteDocument = async (collectionName: Collections,docName:string) => {
	const docRef = doc(db,collectionName,docName)
	await deleteDoc(docRef)
}
export const deleteDocumentField:TDeleteDocumentField = async (collectionName: Collections,docName:string,field:TUserShortField) => {
	const docRef = doc(db,collectionName,docName)
	await updateDoc(docRef, {
		[field]: deleteField()
	});
}
