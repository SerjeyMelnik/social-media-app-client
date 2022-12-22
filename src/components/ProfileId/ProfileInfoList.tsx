


import {FC, useState} from 'react';
import { Link, useLocation, useParams, useRoutes } from 'react-router-dom';
import { useProfileContext } from '../../context-providers/ProfileContextProvider';
import { useQuery } from '../../hooks/useQuery';
import { ProfileInfoBlocksType } from '../../site-config/profile/profile';

import ProfileInfoItemBlock from './ProfileInfoItemBlock';
type ProfileInfoListProps = {
	listOfProfileInfoBloks: ProfileInfoBlocksType[]
}
const ProfileInfoList:FC<ProfileInfoListProps> = ({listOfProfileInfoBloks}) => {
	const {userId} = useParams();
	const {pathname} = useLocation();
	const query = useQuery();
	const {user} = useProfileContext();
	const defaultBlockState = listOfProfileInfoBloks.filter(item => query.get('info-block') === item.id )[0] ?? listOfProfileInfoBloks[0];
	const [block,setBlock] = useState<ProfileInfoBlocksType>(defaultBlockState);
	const changeBlock = (block: ProfileInfoBlocksType) => {
		setBlock(block)
	}
	console.log(block);
	
	return ( 
		<div className="profile-info-blocks">
			<ul className="profile-info-list">
				{
					listOfProfileInfoBloks.map(item => (
						<li className={`profile-info-item ${block.id === item.id ? 'active' : ''}`}
							onClick={ () => { changeBlock(item) } }
							key={item.id}>
							<Link to={`${pathname}?info-block=${item.id}`}
								className="profile-info-item-link link">
								{item.title}
							</Link>
						</li>
					))
				}
			</ul>
			<ProfileInfoItemBlock blockToRender={block.id}/>
		</div>
	 );
}
 
export default ProfileInfoList;