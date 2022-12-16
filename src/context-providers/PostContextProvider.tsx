import { createContext,useState,FC,useContext } from "react"
import { PostMessageType } from "../components/Post/PostMessage"
import { TPost } from "../types/postTypes"


type PostContextType = {
	post?: TPost,
	postMessage: PostMessageType,
	setPostMessage: React.Dispatch<React.SetStateAction<PostMessageType>>,
	setIsShowMsg:React.Dispatch<React.SetStateAction<boolean>>,
	isShowMsg: boolean
}
export const defaultPostContext: PostContextType = {
	postMessage: {
		type: undefined,
		text: '',
		actionOnConfirm: () => {},
		actionOnCancel: () => {},
		actionOnOK: () => {},
	},
	setPostMessage: () => {},
	setIsShowMsg: () => {},
	isShowMsg: false
}
export const PostContext = createContext(defaultPostContext);
type PostContextProviderProps = {
	post?: TPost,
	children: React.ReactNode
}
export const PostContextProvider:FC<PostContextProviderProps> = ({post,children}) => {
	const [postMessage,setPostMessage] = useState<PostMessageType>(defaultPostContext.postMessage);
	const [isShowMsg,setIsShowMsg] = useState<boolean>(postMessage.text.length > 0);
	const postContext: PostContextType = {
		post,
		postMessage,
		setPostMessage,
		isShowMsg,
		setIsShowMsg
	}
	return (
		<PostContext.Provider value={postContext}>
			{children}
		</PostContext.Provider>
	)
}

export const usePostContext = () => useContext(PostContext)