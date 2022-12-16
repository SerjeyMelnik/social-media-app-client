import {FC,useEffect,useState,useMemo} from 'react'
import { usePostContext } from '../../context-providers/PostContextProvider'
import CustomButton from '../CustomElements/CustomButton'
export type PostMessageType = {
	type: "inform" | "confirm" | undefined,
	text: string,
	confirmButtonText?: string,
	cancelButtonText?: string,
	okButtonText?:string,
	actionOnConfirm?: () => void,
	actionOnCancel?: () => void,
	actionOnOK?: () => void,
}
export const PostMessage: FC = () => {
	const {postMessage,setPostMessage,isShowMsg,setIsShowMsg} = usePostContext();
	
	return (
		<div className={`post-message-background ${isShowMsg ? 'show' : 'hide'}`}>
			{
				postMessage.type === 'inform' ?

				<MessageInform postMessage={postMessage}
				isShowMsg={isShowMsg}
				setIsShowMsg={setIsShowMsg}/> :

				postMessage.type === 'confirm' &&
				<MessageConfirm postMessage={postMessage}
				isShowMsg={isShowMsg}
				setIsShowMsg={setIsShowMsg}/>
			}
		</div>
	)
}


type MessageConfirmProps = {
	postMessage: PostMessageType,
	isShowMsg: boolean,
	setIsShowMsg: React.Dispatch<React.SetStateAction<boolean>>
}
const MessageConfirm:FC<MessageConfirmProps> = ({postMessage,isShowMsg,setIsShowMsg}) => {
	const confirmHandler = async () => {
		postMessage.actionOnConfirm !== undefined &&  postMessage.actionOnConfirm(); 
		setIsShowMsg(false)
	}
	const cancelHandler = async () => {
		postMessage.actionOnCancel !== undefined &&  postMessage.actionOnCancel(); 
		
		setIsShowMsg(false)
	}
	return (
			<div className="post-message confirm">
				<p className='post-message-text'>{postMessage.text}</p>
				<div className="post-message-buttons">
					<CustomButton className='post-message-button confirm'
					onClickFunc={confirmHandler}>
						{postMessage.confirmButtonText ?? 'Confirm'}
					</CustomButton>
					<CustomButton className='post-message-button cancel'
					onClickFunc={cancelHandler}>
						{postMessage.cancelButtonText ?? 'Cancel'}
					</CustomButton>
				</div>
			</div>
	)
}
const MessageInform:FC<MessageConfirmProps> = ({postMessage,isShowMsg,setIsShowMsg}) => {
	const okHandler = async () => {
		postMessage.actionOnOK !== undefined &&  postMessage.actionOnOK(); 
		setIsShowMsg(false)
	}
	return (
			<div className="post-message inform">
				<p className='post-message-text'>{postMessage.text}</p>
				<div className="post-message-buttons">
					<CustomButton className='post-message-button ok'
					onClickFunc={okHandler}>
						{postMessage.okButtonText ?? 'OK'}
					</CustomButton>
					
				</div>
			</div>
	)
}