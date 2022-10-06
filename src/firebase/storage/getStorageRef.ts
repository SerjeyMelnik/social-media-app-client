import { ref, StorageReference } from "firebase/storage"
import { storage } from "../firebase"

type TGetStorageRef = (url?: string) => StorageReference
export const getStorageRef:TGetStorageRef = (url) => {
	return ref(storage,url)
}