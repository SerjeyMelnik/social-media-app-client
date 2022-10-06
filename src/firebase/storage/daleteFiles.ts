import { deleteObject, listAll, ref } from "firebase/storage";
import { storage } from "../firebase";

type TDeleteFolder = (folderUrl: string) => Promise<void>;
type TDeleteFile = (fileUrl: string) => Promise<void>;


export const deleteFolder:TDeleteFolder = async (folderUrl: string) => {
	await listAll(ref(storage,folderUrl)).then((res) => {
		const deletePrefixesPromises = res.prefixes.forEach((folderRef) => {
			return deleteObject(folderRef)
		});
		const deleteItemPromises = res.items.map((itemRef) => {
		   return deleteObject(itemRef)
		});
		 Promise.all(deleteItemPromises)
	  }).catch((error) => {
		// Uh-oh, an error occurred!
	  });
}

export const deleteFile:TDeleteFile = async (fileUrl: string) => {
	const fileRef = ref(storage,fileUrl)
	await deleteObject(fileRef);
}
