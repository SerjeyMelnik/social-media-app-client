import  {  useState,useMemo, FC } from 'react';
import CustomInput from './CustomInput';
import { USER_PLACEHOLDER_IMG } from '../../utils/constants';
import { UserShort } from '../../types/userTypes';


type CustomSearchProps = {
	defaultSearchQuery?: string,
	selectOneOfResult: (value:any) => void,
	arrayOfSearching: any[],
	searchType: 'UserShort',
	notFoundMessage?: string
}
type ResultItemForUserProps = {
	userShort: UserShort,
	onClickFunc: (value: any) => void
}
const CustomSearch:FC<CustomSearchProps> = ({
	selectOneOfResult,
	arrayOfSearching,
	searchType,
	notFoundMessage
}) => {
	const [searchQuery,setSearchQuery] = useState<string>('');
	const isIncludeQuery = (str: string) => str.toLowerCase().includes(searchQuery.toLowerCase());

	const searchResult =  useMemo(()=>{
		if(searchQuery.length === 0) return arrayOfSearching;
		switch (searchType) {
			case 'UserShort':
			return arrayOfSearching.filter(item => isIncludeQuery(item.userName) || isIncludeQuery(item.lastName) || isIncludeQuery(item.firstName))
			default:
			return arrayOfSearching.filter(item => isIncludeQuery(item))
		}
	},[arrayOfSearching,searchQuery]);
	return ( 
		<div className="custom-search">
			<div className='custom-search-inner'>
				<CustomInput type='text'
					changeFieldValue={(e)=>setSearchQuery(e.target.value)}
					placeholder='Search any recipes'
					value={searchQuery}
					name='custom-search'
					/>
				<span className='custom-search-result-number text'>{searchResult.length}</span>
			</div>
			
			{
				<div className="custom-search-result">
					{
						searchType === "UserShort" &&
						searchResult.map(user => 
							<ResultItemForUser userShort={user} key={user.userID} onClickFunc={()=>{selectOneOfResult(user)}}/>
							)
					}
					{searchResult.length === 0  && 
						<p className='text'>{notFoundMessage ?? 'Not found'}</p>
					}
				</div>
			}
		</div>
	 );
}

const ResultItemForUser: FC<ResultItemForUserProps> = ({userShort, onClickFunc}) => {
	return (
		<div className="result-item" onClick={onClickFunc}>
			<div className={`sender-avatar-wrapper`}>
				<img src={userShort.avatar || USER_PLACEHOLDER_IMG} alt={userShort.userName as string} className="sender-avatar" width='50px'/>
			</div>
			<div className="sender-info">
				<p className="sender-info-username text">{userShort.userName}</p>
				<p className="sender-info-fullname text">{userShort.firstName + ' ' + userShort.lastName}</p>
			</div>
		</div>
	)
}
export default CustomSearch;