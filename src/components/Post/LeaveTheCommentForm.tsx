import React, { FC,useState } from 'react';
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import CustomInput from '../CustomElements/CustomInput';
import { addComment } from '../../firebase/firestore/likeAndCommentOperation';
import { useUserContext } from '../../hooks/useUserContext';
import LoaderSpiner from '../CustomElements/LoaderSpiner';
import CustomButton from '../CustomElements/CustomButton';
import { useAuthProvider } from '../../context-providers/AuthProvider';

type SendCommentFormType = {
	commentField: string
}
const DefaultSendCommentForm:SendCommentFormType = {
	commentField: ''
}
type LeaveTheCommentFormProps = {
	postId: string
}
const LeaveTheCommentForm: FC<LeaveTheCommentFormProps> = ({postId}) => {
	const {currentUser} = useAuthProvider();
	const [sendCommentForm,setSendCommentForm] = useState<SendCommentFormType>(DefaultSendCommentForm);
	const [isLoading,setIsLoading] = useState(false);
	const setCommentFieldValue = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSendCommentForm(state => ({...state,commentField:e.target.value}))
	}
	const clearForm = () => {
		setSendCommentForm(state => ({...state,commentField:''}))
	}
	const sendComment = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setIsLoading(true);
		if (sendCommentForm.commentField.length === 0) {
			setIsLoading(false)
			return;
		}
		await addComment(sendCommentForm.commentField,postId,currentUser?.uid as string);
		setIsLoading(false);
		clearForm()
	}
	return (
		<form onSubmit={sendComment}> 
			<div className="comment_form-wrapper">
				<div className="comment_input-wrapper">
					<CustomInput className='comment_input'
								placeholder='Your comment'
								name='comment' type="text"
								value={sendCommentForm.commentField}
								changeFieldValue={setCommentFieldValue}
								disabled={isLoading}
								/>
				</div>
				<CustomButton type='submit'
				className='button-send-comment'
				isDisabled={isLoading || sendCommentForm.commentField.length === 0}>
					{
						isLoading ? <LoaderSpiner/> : <SendRoundedIcon className='post_button-svg comment_btn-svg'/>
					}
				</CustomButton>
			</div>
		</form>
	 );
}
 
export default LeaveTheCommentForm;