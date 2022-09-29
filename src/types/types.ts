type UnicId = number;

export interface IUserAddres {
	id: UnicId,
	street: string,
    suite: string,
    city: string,
    zipcode: string,
    geo: {
    	lat: String,
    	lng: String
    }
}

export interface IUserCompany {
	name: String,
    catchPhrase: String,
    bs: String
}
export interface IUser {
	id: Number,
	name: String,
	username: String,
	address: IUserAddres,
	phone:String,
	website:String,
	company:IUserCompany,
}

export interface IPost {
	userId: UnicId,
	id:UnicId,
	title: string,
	body: string
}

export interface IComment {
	postId: UnicId,
    id: UnicId,
    name: string,
    email: string,
    body: string
}