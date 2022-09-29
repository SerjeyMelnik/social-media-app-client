import { FC ,useState} from "react";
import UserAccountInfo from "../components/UserAccount/UserAccountInfo";
import UserAccountManageButton from "../components/UserAccount/UserAccountManageButton";
import { TDisplayBlok, USER_ACCOUNT_MANAGE_BUTTONS, T_USER_ACCOUNT_MANAGE_BUTTON, EDisplayBlok } from "../utils/constants";




const userImg = 'https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png';


const UserAccountPage:FC = () => {

	const [displayBlock,setDisplayBlock] = useState<TDisplayBlok>(EDisplayBlok.account_info);
	
	return ( 
		<main className="page user-account-page">
			<div className="user-account-wrapper">
				<div className="user-account-image-wrapper">
					<div className="user-account-image">
						<img src={userImg} alt="user-img"/>
					</div>
				</div>
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
						
						<UserAccountInfo/>
					</div>
				</div>
				
			</div>
		</main>
	 );
}
 
export default UserAccountPage;