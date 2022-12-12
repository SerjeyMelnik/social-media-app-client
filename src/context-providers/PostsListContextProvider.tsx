import {FC,ReactNode,useState,createContext} from 'react';

type PostsListContext = {
	posts: string[],
	shouldRefetchData:boolean
}
type PostsListContextProviderProps = {
	children: ReactNode
}
const defaultPostsListContext: PostsListContext = {
	posts: [],
	shouldRefetchData: false 
}
export const PostsListContext = createContext(defaultPostsListContext);

	
const PostsListContextProvider: FC<PostsListContextProviderProps> = ({children}) => {
	const [shouldRefetchData,setShouldRefetchData] = useState();

	const postsListContext:PostsListContext = {
		posts: [],
		shouldRefetchData: false,

	}
	return (
		<PostsListContext.Provider value={postsListContext}>

		</PostsListContext.Provider>
	)
}