import { FC, useState, FormEventHandler} from "react";
import { setNewPost } from "../../firebase/firestore/postOperation";
import { useUserContext } from "../../hooks/useUserContext";
import CustomButton from "../CustomElements/CustomButton";
import CustomInput from "../CustomElements/CustomInput";
import CustomPictureUpload from "../CustomElements/CustomPictureUpload";
import LoaderSpiner from "../CustomElements/LoaderSpiner";

type CreateNewPostFormType = {
	description: {
		value?: string,
		error?: string
	},
	pictures: {
		value?: File[],
		error?: string
	}
}
type FormMessage = {
	text: string,
	type: 'success' | 'error' | 'inform',
}
export type SetFormField = (field:keyof CreateNewPostFormType,
							data: CreateNewPostFormType[keyof CreateNewPostFormType]) => void;
			
const defaultFormState:CreateNewPostFormType = {
	description: {
		value: '',
		error: ''
	},
	pictures: {
		value: [],
		error: ''
	}
}
const CreateNewPostForm:FC = () => {
	const {userInfo} = useUserContext()
	const [form,setForm] = useState<CreateNewPostFormType>(defaultFormState);
	const [loading,setLoading] = useState(false);
	const [shouldResetFiles,setShouldResetFiles] = useState(false);
	const [formMessage,setFormMessage] = useState<FormMessage>();
	const isValidForm = () => {
			if(form.description.value){
				return form.description.value.length > 0;
			}
			if(form.pictures.value){
				return form.pictures.value.length > 0;
			}
			return false;
	}
	const isDisabledButton = !isValidForm() || loading;
	const setFormField: SetFormField = (field,data) => {
		setForm(state => ({
			...state,
			[field]: data
		}))
	}
	const changeFieldValue = ( e: React.ChangeEvent<HTMLInputElement>) => {
		setForm(state => {
			const targetErrorMsg = e.target.dataset.errorMsg ??  '';
			return ({
				...state,
				[e.target.name]:{
						error: targetErrorMsg,
						value: e.target.value
					}
			})
		})
	}
	const clearForm = () => {
		setForm(defaultFormState)
	}
	const pushFormMessage = ({text,type}: FormMessage) => {
		setFormMessage({text,type})
		setTimeout(()=>{
			setFormMessage(undefined)
		},2000)
	}
	const createPost = async (e:React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		setLoading(true)
		const postRef = await setNewPost({
			pictures:form.pictures.value,
			description:form.description.value
		},userInfo?.userAuthInfo?.uid as string)
		setLoading(false);
		if(postRef){
			pushFormMessage({text:'Post created successful',type:'success'})
		}
		else pushFormMessage({text:'Something went wrong!',type:'error'})
	
		setShouldResetFiles(true);
		clearForm();
		(e.target as HTMLFormElement).reset();
	}

	return ( 
		<div className="create-new-post-form-wrapper">
			<form onSubmit={createPost}>
				<CustomButton 
				isDisabled={isDisabledButton}
				className={`crate_post_button ${formMessage !== undefined && formMessage.type}`}
				type='submit'>
					<>
						{	!formMessage &&	(loading  ? 
							<>
								<LoaderSpiner />
								<span style={{height:"20px"}}></span>
							</> :
							<span>Create post</span>)
						}
						{
							formMessage && 
							<span>{formMessage.text}</span>
						}
					</>
				</CustomButton>
				<div className="post post_create_form">
					<CustomInput changeFieldValue={changeFieldValue}
								name='description'
								placeholder="Type description to post..."
								type="text"
								error={form.description.error}
								value={form.description.value}/>
					<CustomPictureUpload setFormPicturesField={setFormField}
										className='create_post_img_upload'
										shouldResetFiles={shouldResetFiles}
										setShouldResetFiles={setShouldResetFiles}
										/>
				</div>
				
			</form>
		</div>
	 );
}
 
export default CreateNewPostForm;