export interface NewUser {
	email: string;
	username: string;
	password: string;
}

export interface User extends NewUser{
	id: string;
}