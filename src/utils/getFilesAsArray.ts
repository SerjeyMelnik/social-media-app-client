
type GetFilesAsArrayType = (fileList: FileList) => File[]
export const getFilesAsArray: GetFilesAsArrayType = (fileList) => {
	return Array.from(fileList as FileList)
}