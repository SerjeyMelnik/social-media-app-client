import { FC ,useState,useEffect} from "react";
import UserAccountEdit from "../components/UserAccount/UserAccountEdit";
import UserAccountImage from "../components/UserAccount/UserAccountImage";
import UserAccountInfo from "../components/UserAccount/UserAccountInfo";
import UserAccountManageButton from "../components/UserAccount/UserAccountManageButton";
import { useUserContext } from "../hooks/useUserContext";
import { TDisplayBlok, USER_ACCOUNT_MANAGE_BUTTONS, T_USER_ACCOUNT_MANAGE_BUTTON, EDisplayBlok } from "../utils/constants";


const UserAccountPage:FC = () => {
	//const {userInfo,updateUserAccountInfo} = useUserContext()
	const [displayBlock,setDisplayBlock] = useState<TDisplayBlok>(EDisplayBlok.account_info);
	// useEffect(()=>{
	// 	updateUserAccountInfo()
	// },[userInfo])
	return ( 
		<main className="page user-account-page">
			<div className="user-account-wrapper">
				<UserAccountImage />
				<div className="user-account-manage">
					<div className="user-account-manage-buttons">
						{
							USER_ACCOUNT_MANAGE_BUTTONS?.map((button:T_USER_ACCOUNT_MANAGE_BUTTON) => 
								<UserAccountManageButton key={button.id}
								button={button} 
								setDisplayBlock={setDisplayBlock} 
								displayBlock={displayBlock} 
								/>
								)
						}
					</div>
					<div className="user-account-display">
						{
							displayBlock === EDisplayBlok.account_info ?
							<UserAccountInfo/> :
							displayBlock === EDisplayBlok.edit_account ?
							<UserAccountEdit/> : null
						}
						
						
					</div>
				</div>
				
			</div>
		</main>
	 );
}
 
export default UserAccountPage;