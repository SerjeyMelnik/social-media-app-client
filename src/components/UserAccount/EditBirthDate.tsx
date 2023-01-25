import { Timestamp } from "firebase/firestore";
import { useEffect, useState } from "react";
import { updateShortUser } from "../../firebase/firestore/userOperation";
import { useUserContext } from "../../hooks/useUserContext";
import CustomButton from "../CustomElements/CustomButton";
import CustomDateSelector, { DateType } from "../CustomElements/CustomDateSelector";
import LoaderSpiner from "../CustomElements/LoaderSpiner";


const EditBirthDate = () => {
	const {userShort} = useUserContext()
	const [date, setDate] = useState<DateType>();
	const [loading,setLoading] = useState<boolean>(false)
	const datedef = new Date(userShort?.birthDate?.toDate().toString() as string);
	const defaultDate = {
		day: datedef.getDate(),
		month: datedef.getMonth() + 1,
		year: datedef.getFullYear()
	};
	const editBirthDate = async () => {
		setLoading(true)
		await updateShortUser(userShort?.userID as string,{
			birthDate: Timestamp.fromDate(new Date(`${date?.month}/${date?.day}/${date?.year}`))
		})
		setLoading(false)

	}
	
	return (
		<div className="user_info_line editable">
			<label className='user_info_line-property'>
				Birth day <span style={{color:'red'}}>*</span>: 
			</label>
			<CustomDateSelector setDateFunc={setDate} defaultDate={defaultDate} className="info-line-edit"/>	
			<CustomButton 
				isDisabled={JSON.stringify(date) === JSON.stringify(defaultDate) || loading}
				onClickFunc={editBirthDate}
				>
					{	
						loading ?
						<>
							<span>Loading</span>
							<LoaderSpiner/>
						</> :
						<span>Edit</span>
					}</CustomButton>
	</div>
	);
}
 
export default EditBirthDate;