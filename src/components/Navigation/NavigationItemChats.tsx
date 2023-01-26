import QuestionAnswerRoundedIcon from '@mui/icons-material/QuestionAnswerRounded';
import { Link } from 'react-router-dom';
import { useChatsContext } from '../../context-providers/ChatsContextProvider';
const NavigationItemChats = () => {
	const {toggleChats} = useChatsContext()
	return ( 
		<div className="nav-panel_item">
			<div className="nav-panel_item-chats" onClick={toggleChats}>
					<QuestionAnswerRoundedIcon className='nav-panel_item-svgElement'/>
			</div>
		</div>
	 );
}
 
export default NavigationItemChats;