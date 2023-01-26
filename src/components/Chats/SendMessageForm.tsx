
import {FC,useState} from 'react';
import { useAuthProvider } from '../../context-providers/AuthProvider';
import CustomButton from '../CustomElements/CustomButton';
import CustomInput from '../CustomElements/CustomInput';
import LoaderSpiner from '../CustomElements/LoaderSpiner';
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import { sendMessage } from '../../firebase/firestore/chatOperation';
import { ChatType } from '../../types/chatTypes';
import {  Timestamp } from 'firebase/firestore';

type SendMessageFormProps = {
	chat: ChatType
}
type Form = {
	value: string
}
const SendMessageForm:FC<SendMessageFormProps> = ({chat}) => {
	const {currentUser} = useAuthProvider();
	const [form,setForm] = useState<Form>({value: ''});
	const [isLoading,setIsLoading] = useState(false);
	const setFieldValue = (e: React.ChangeEvent<HTMLInputElement>) => {
		setForm(state => ({...state,value: e.target.value}))
	}
	const clearForm = () => {
		setForm(state => ({...state,value:''}))
	}
	const sendMessageHandler = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setIsLoading(true);
		await sendMessage({
			chatId: chat.id,
			id: 'temporaryid',
			sender: currentUser?.uid as string,
			text: form.value,
			time: Timestamp.now()
		})
		setIsLoading(false);
		clearForm()
	}
	return (
		<div className='send-message-form'>
			<form onSubmit={sendMessageHandler}> 
				<div className="message_form-wrapper">
					<div className="message_input-wrapper">
						<CustomInput className='message_input'
									placeholder='Your message'
									name='message'
									type="text"
									value={form?.value}
									changeFieldValue={setFieldValue}
									disabled={isLoading}
									/>
					</div>
					<CustomButton type='submit'
					className='button-send-message'
					isDisabled={isLoading || form.value.length === 0}>
						{
							isLoading ? <LoaderSpiner/> : <SendRoundedIcon className='post_button-svg message_btn-svg'/>
						}
					</CustomButton>
				</div>
			</form>
		</div>
	 );
}
 
export default SendMessageForm;