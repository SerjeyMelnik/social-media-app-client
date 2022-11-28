
import { db } from "../firebase"
import { QuerySnapshot,
		DocumentData,
		DocumentSnapshot,
		getDocs,
		collection, 
		query,
		where,
		FieldPath,
		WhereFilterOp,
		getDoc,
		doc,
		DocumentReference
	} from "firebase/firestore"
import { Collections } from "../../utils/constants"


type TGetCollectionFunc = (collectionName: Collections) => Promise<QuerySnapshot<DocumentData>>
type TGetFilteredCollectionFunc = (collectionName: Collections, {fieldPath,opStr,value}:TWhereProps) => Promise<QuerySnapshot<DocumentData>>
type TGetDocument = (collectionName: Collections,docName:string) => Promise<DocumentSnapshot<DocumentData>>
type TGetDocRef = (collectionName:Collections,documentName: string) => DocumentReference<DocumentData>

export type TWhereProps = {
	fieldPath: string | FieldPath,
	opStr: WhereFilterOp,
	value: unknown
}

export const getCollection:TGetCollectionFunc = async (collectionName: Collections) => {
	const docsSnap = await getDocs(collection(db, collectionName))
	return  docsSnap;
}

export const getFilteredColection:TGetFilteredCollectionFunc = async (collectionName: Collections, {fieldPath,opStr,value}:TWhereProps) => {
	const q = query(collection(db, collectionName),where(fieldPath,opStr,value))
	const filteredDocsSnap = await getDocs(q);
	return filteredDocsSnap;
}

export const getDocument:TGetDocument = async (collectionName: Collections,docName:string) => {
	const docRef = doc(db, collectionName, docName);
	const docSnap = await getDoc(docRef);
	return docSnap;
}

export const getDocRef:TGetDocRef= (collectionName:Collections,documentName: string) => {
	return doc(db,`${collectionName}/${documentName}`)
}