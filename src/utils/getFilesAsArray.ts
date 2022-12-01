
type GetFilesAsArrayType = (fileList: FileList) => File[]
export const getFilesAsArray: GetFilesAsArrayType = (fileList) => {
	return Array(fileList.length).map((_,i) => fileList[i])
}