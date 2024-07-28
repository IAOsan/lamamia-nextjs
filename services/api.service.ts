import {
	IPortfolioCategory,
	IPortfolioWork,
	IPost,
	IRequestOpts,
	NewPostType,
	PostIdType,
	ResponseType,
	UserRegisterType,
} from '@/types/custom.types';
import { HttpError, attachSearchParams } from '@/utils';
import httpService from './http.service';

export const BASE_URL =
	process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
export const PORTFOLIO_CATEGORIES_ENDPOINT =
	BASE_URL + '/api/portfolio/categories';
export const PORTFOLIO_WORKS_ENDPOINT = BASE_URL + '/api/portfolio/works';
export const POSTS_ENDPOINT = BASE_URL + '/api/posts';
export const USERS_ENDPOINT = BASE_URL + '/api/users';
export const REGISTER_ENDPOINT = BASE_URL + '/api/auth/register';

const endpoints = {
	async getPortfolioCategories(
		options?: IRequestOpts
	): Promise<Array<IPortfolioCategory>> {
		const { searchParams = {}, ...fetchOpts } = options || {};
		const url = attachSearchParams(
			PORTFOLIO_CATEGORIES_ENDPOINT,
			searchParams
		);
		const res = await httpService.get(url, fetchOpts);
		const { ok, data }: ResponseType<Array<IPortfolioCategory>> =
			await res.json();

		if (!ok) return [];
		return data;
	},
	async getPortfolioWorks(
		categoryName: string,
		options?: IRequestOpts
	): Promise<Array<IPortfolioWork> | null> {
		const { searchParams = {}, ...fetchOpts } = options || {};
		const url = `${PORTFOLIO_CATEGORIES_ENDPOINT}/${categoryName}/works`;
		const res = await httpService.get(url, fetchOpts);
		const { ok, data }: ResponseType<Array<IPortfolioWork>> =
			await res.json();

		if (!ok) {
			return null;
		}

		return data;
	},
	async getPosts(options?: IRequestOpts): Promise<Array<IPost>> {
		const { searchParams = {}, ...fetchOpts } = options || {};
		const url = attachSearchParams(POSTS_ENDPOINT, searchParams);
		const res = await httpService.get(url, fetchOpts);
		const { ok, data } = await res.json();

		if (!ok) return [];

		return data;
	},
	async getPostsByUser(
		userId: string,
		options: IRequestOpts
	): Promise<Array<IPost>> {
		const { searchParams = {}, ...fetchOpts } = options || {};
		const url = attachSearchParams(
			`${USERS_ENDPOINT}/${userId}/posts`,
			searchParams
		);
		const res = await httpService.get(url, fetchOpts);
		const { ok, data }: ResponseType<Array<IPost>> = await res.json();

		if (!ok) {
			return [];
		}

		return data;
	},
	async getPostById(
		postId: PostIdType,
		options?: IRequestOpts
	): Promise<IPost | null> {
		const { searchParams = {} } = options || {};
		const url = attachSearchParams(
			`${POSTS_ENDPOINT}/${postId}`,
			searchParams || {}
		);
		const res = await httpService.get(url);
		const { ok, data }: ResponseType<IPost> = await res.json();

		if (!ok) return null;

		return data;
	},
	async addPost(post: NewPostType): Promise<IPost | null> {
		const res = await httpService.post(POSTS_ENDPOINT, post);
		const { ok, data }: ResponseType<IPost> = await res.json();

		if (!ok) return null;

		return data;
	},
	async removeBlogPost(postId: PostIdType): Promise<void> {
		const url = `${POSTS_ENDPOINT}/${postId}`;
		const res = await httpService.delete(url);
		const { ok, error } = await res.json();
		if (!ok) {
			if (error.status === 404) {
				return Promise.reject('Failed post deletion');
			}
		}
	},
	async registerWithEmailAndPassword(
		credentials: UserRegisterType
	): Promise<void> {
		const res = await httpService.post(REGISTER_ENDPOINT, credentials);
		const { ok, error } = await res.json();

		if (!ok) {
			if (error.statusCode === 400) {
				const err = new HttpError({
					message: error.message,
					statusCode: error.statusCode,
					reason: { email: 'The user already exists' },
				});
				return Promise.reject(err);
			}
		}
	},
};

export default endpoints;
