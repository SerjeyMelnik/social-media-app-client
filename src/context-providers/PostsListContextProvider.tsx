import {FC,ReactNode,useState,createContext} from 'react';

type PostsListContext = {
	posts: string[],
	shouldRefetchData:boolean,
	setShouldRefetchData: React.Dispatch<React.SetStateAction<undefined>>
}
type PostsListContextProviderProps = {
	children: ReactNode
}
const defaultPostsListContext: PostsListContext = {
	posts: [],
	shouldRefetchData: false,
	setShouldRefetchData: () => {} 
}
export const PostsListContext = createContext(defaultPostsListContext);

	
const PostsListContextProvider: FC<PostsListContextProviderProps> = ({children}) => {
	const [shouldRefetchData,setShouldRefetchData] = useState();
	
	const postsListContext:PostsListContext = {
		posts: [],
		shouldRefetchData: false,
		setShouldRefetchData
	}
	return (
		<PostsListContext.Provider value={postsListContext}>
			{children}
		</PostsListContext.Provider>
	)
}