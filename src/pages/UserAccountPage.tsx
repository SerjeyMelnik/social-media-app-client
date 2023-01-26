import { FC } from "react";

import UserAccountImage from "../components/UserAccount/UserAccountImage";
import UserAccountManage from "../components/UserAccount/UserAccountManage";
import { useChatsContext } from "../context-providers/ChatsContextProvider";




const UserAccountPage:FC = () => {
	const {isChatOpen} = useChatsContext()
	return ( 
		<main className={`page user-account-page `}>
			<div className="user-account-wrapper container">
				<UserAccountImage />
				<UserAccountManage />
			</div>
		</main>
	 );
}
 
export default UserAccountPage;