export interface IPortfolioCategory {
	id: string;
	name: string;
	description: string;
}

export interface IPortfolioWork {
	id: string;
	title: string;
	description: string;
	image: string;
	categoryId: string;
}

export interface IUser {
	id: string;
	username: string;
	email: string;
	password: string;
}

export interface IPost {
	id: string;
	title: string;
	description: string;
	image: string;
	content: string;
	createdAt: string;
	userId: string;
	user?: {
		id: IUser[id];
		username: IUser[username];
	};
}

export type PostIdType = IPost['id'];

export type NewPostType = Pick<
	IPost,
	'title' | 'description' | 'image' | 'content'
>;

export interface IUserLogin {
	email: IUser['email'];
	password: IUser['password'];
}

export type UserRegisterType = Pick<IUser, 'username' | 'email' | 'password'>;

export type GenericObjectType<T> = { [key: string]: T };

export interface IRequestOpts extends RequestInit {
	searchParams?: GenericObjectType<string>;
}

export interface ISuccessResponse<TData> {
	ok: true;
	data: TData;
	error: null;
}
export interface IErrorResponse {
	ok: false;
	data: null;
	error: {
		statusCode: number;
		message: string;
		reason: unknown;
	};
}

export type ResponseType<TData> = ISuccessResponse<TData> | IErrorResponse;
