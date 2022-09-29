
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
		doc
	} from "firebase/firestore"


type TGetCollectionFunc = (collectionName: string) => Promise<QuerySnapshot<DocumentData>>
type TGetFilteredCollectionFunc = (collectionName: string, {fieldPath,opStr,value}:TWhereProps) => Promise<QuerySnapshot<DocumentData>>
type TGetDocument = (collectionName: string,docName:string) => Promise<DocumentSnapshot<DocumentData>>
export type TWhereProps = {
	fieldPath: string | FieldPath,
	opStr: WhereFilterOp,
	value: unknown
}

export const getCollection:TGetCollectionFunc = async (collectionName: string) => {
	const docsSnap = await getDocs(collection(db, collectionName))
	return  docsSnap;
}

export const getFilteredColection:TGetFilteredCollectionFunc = async (collectionName: string, {fieldPath,opStr,value}:TWhereProps) => {
	const q = query(collection(db, collectionName),where(fieldPath,opStr,value))
	const filteredDocsSnap = await getDocs(q);
	return filteredDocsSnap;
}

export const getDocument:TGetDocument = async (collectionName: string,docName:string) => {
	const docRef = doc(db, collectionName, docName);
	const docSnap = await getDoc(docRef);
	return docSnap;
}
