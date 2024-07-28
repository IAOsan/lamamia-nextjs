import { APIFeatures, IDB } from '@/lib';
import {
	PORTFOLIO_CATEGORIES_ENDPOINT,
	POSTS_ENDPOINT,
	REGISTER_ENDPOINT,
	USERS_ENDPOINT,
} from '@/services/api.service';
import { IUser } from '@/types/custom.types';
import { JSONresponse } from '@/utils';
import { Low } from 'lowdb';
import { HttpResponse, delay, http } from 'msw';
import { nanoid } from 'nanoid';
import {
	portfolioCategories,
	portfolioWorks,
	posts,
	session,
} from '../fixtures';

const register = http.post(REGISTER_ENDPOINT, async ({ request }) => {
	const data = (await request.json()) as IUser;

	await delay();

	if (data.email.toLowerCase() === 'exists@mail.com') {
		return HttpResponse.json({
			ok: false,
			data: null,
			error: {
				statusCode: 400,
				message: 'The user already exists',
			},
		});
	}

	return HttpResponse.json(JSONresponse.success(data));
});

const getSession = http.get('/api/auth/session', async () => {
	await delay();

	return HttpResponse.json(session);
});

const getPortfolioCategories = http.get(PORTFOLIO_CATEGORIES_ENDPOINT, () => {
	return HttpResponse.json(JSONresponse.success(portfolioCategories));
});

const getPortfolioWorks = http.get(
	`${PORTFOLIO_CATEGORIES_ENDPOINT}/:categoryName/works`,
	({ params }) => {
		const { categoryName } = params;
		const category = portfolioCategories.find((c) => c.name === categoryName);
		const works = portfolioWorks.filter((w) => w.categoryId === category?.id);

		return HttpResponse.json(JSONresponse.success(works));
	}
);

const getPosts = http.get(POSTS_ENDPOINT, async ({ request }) => {
	await delay();

	return HttpResponse.json(JSONresponse.success(posts));
});

const getPostsByUser = http.get(
	`${USERS_ENDPOINT}/:userId/posts`,
	async ({ request, params }) => {
		// console.log('POSTS POR USUARIO FIRED');
		const url = new URL(request.url);
		const { userId } = params;
		const userPosts = posts.filter((p) => p.userId === userId);
		const features = new APIFeatures({} as Low<IDB>, userPosts).sort(
			url.searchParams
		);

		await delay();

		return HttpResponse.json(JSONresponse.success(features.data));
	}
);

export const getEmptyPosts = http.get(
	`${USERS_ENDPOINT}/:userId/posts`,
	async () => {
		await delay();

		return HttpResponse.json(JSONresponse.success([]));
	}
);

const getPost = http.get(`${POSTS_ENDPOINT}/:postId`, async ({ params }) => {
	const { postId } = params;
	const post = posts.find((p) => p.id === postId);

	await delay();

	return HttpResponse.json(JSONresponse.success(post));
});

const addPost = http.post(POSTS_ENDPOINT, async ({ request }) => {
	const post = await request.json();

	await delay(500);

	return HttpResponse.json(
		JSONresponse.success(
			Object.assign(
				{
					id: nanoid(),
					createdAt: new Date().toISOString(),
				},
				post
			)
		)
	);
});

const removePost = http.delete(`${POSTS_ENDPOINT}/:postId`, async () => {
	await delay();

	return HttpResponse.json(
		JSONresponse.success({
			message: 'Post removed successfully',
			removedPost: {},
		})
	);
});

export const handlers = [
	register,
	getSession,
	getPortfolioCategories,
	getPortfolioWorks,
	getPosts,
	getPostsByUser,
	getPost,
	addPost,
	removePost,
];
