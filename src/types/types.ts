type UnicId = number;

export interface TUserAddres {
	id: UnicId
	street: string,
    suite: string,
    city: string,
    zipcode: string,
    geo: {
    	lat: String,
    	lng: String
    }
}

export interface TUserCompany {
	name: String,
    catchPhrase: String,
    bs: String
}
export interface IUser {
	id: Number,
	name: String,
	username: String,
	address: TUserAddres,
	phone:String,
	website:String,
	company:TUserCompany,
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