import {useState,Dispatch} from 'react'
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "../firebase";
import { useAuthProvider } from '../../context-providers/AuthProvider';

type TUseUploadFileHook = {
	uploadFile: TUploadFileFunc
}
type TUploadFileFunc = (file: File,setImg: Dispatch<React.SetStateAction<string>>) => Promise<{fileUrl:string}>

export function useUploadFile():TUseUploadFileHook {
	const {currentUser} = useAuthProvider();
	const [fileUrl,setFileUrl] = useState<string | undefined>();

	const uploadFile:TUploadFileFunc = async (file: File,setImg:Dispatch<React.SetStateAction<string>>) => {
			if (!file) {
				throw new Error('No file of file is undefined or null')
			}
			const storageRef = ref(storage, `users/${currentUser?.uid}/avatar/${file?.name}`);
			const arrBuff = (await file?.arrayBuffer()) as ArrayBuffer;
			const uploadTaskSnap = await uploadBytesResumable(storageRef, arrBuff,{
				contentType: file?.type
			});
		
			uploadTaskSnap.task.on(
				"state_changed",
				(snapshot) => {
					const percentNum = Math.round(
					    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
					);
					// update progress
					console.log('percent',percentNum);
				},
				(err) => console.log('error',err),
				() => {
					// download url
					getDownloadURL(uploadTaskSnap.ref).then((url) => {
						setImg(url)
						
					});
				}
			);
			console.log(fileUrl);
			
			return {
				fileUrl:fileUrl as string
			}
	}
	return {
		uploadFile
	}
}