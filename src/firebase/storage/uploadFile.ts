import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { storage } from '../firebase';

type TUploadFileFunc = (file: File,refUrl:string) => Promise<string>

export const uploadFile:TUploadFileFunc = async (file: File,refUrl:string) => {
	if (!file) {
		throw new Error('No file of file is undefined or null')
	}
	const storageRef = ref(storage, refUrl);
	const arrBuff = (await file?.arrayBuffer()) as ArrayBuffer;
	const uploadTaskSnap = await uploadBytesResumable(storageRef, arrBuff,{
		contentType: file?.type
	});
	const fileUrl =  await getDownloadURL(uploadTaskSnap.ref);

	return fileUrl
}