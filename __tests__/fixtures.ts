import { vi } from 'vitest';
import { screen } from './testsUtils';

export const $emailInput = () =>
	screen.queryByPlaceholderText('Your email address');
export const $passwordInput = () =>
	screen.queryByPlaceholderText('Your password');
export const $usernameInput = () =>
	screen.queryByPlaceholderText('Your username');
export const $loginSubmitBtn = () =>
	screen.queryByTestId('login-submit-button');
export const $registerSubmitBtn = () =>
	screen.queryByTestId('register-submit-button');
export const $logoutBtn = () => screen.queryByTestId('logout-btn');

export const portfolioCategories = [
	{
		id: '1',
		name: 'illustrations',
	},
	{
		id: '2',
		name: 'webpages',
	},
	{
		id: '3',
		name: 'apps',
	},
];

export const portfolioWorks = [
	{
		id: '1',
		title: 'Inktober Inspirations',
		description:
			'A series of illustrations created during the annual Inktober challenge. Each day, artists explore a different theme using only ink and paper. From mythical creatures to surreal landscapes, this collection serves as inspiration for other artists and art enthusiasts.',
		categoryId: '1',
		image: 'illustrations-work-1.jpeg',
	},
	{
		id: '2',
		title: 'Fantasy Book Cover',
		description:
			'An illustration for the cover of an epic fantasy novel. The image features a magical world with dragons, castles, and brave heroes. Meticulous details and vibrant colors make this illustration perfect for capturing readers’ attention.',
		categoryId: '1',
		image: 'illustrations-work-2.jpeg',
	},
	{
		id: '3',
		title: 'Strong Together Charity',
		description:
			"Amplify your impact and rally support for your charitable cause with our charity platform. Designed specifically for nonprofits, charities, and philanthropic organizations, it's a complete platform to share your mission.",
		categoryId: '1',
		image: 'illustrations-work-3.jpeg',
	},
	{
		id: '4',
		title: 'Creative Portfolio',
		description:
			'Unlock the power of self expression and showcase your talents with our creative portfolio website. Designed for artists, designers, and creative professionals, our platform provides a stunning digital canvas.',
		categoryId: '2',
		image: 'webpages-work-1.jpeg',
	},
	{
		id: '5',
		title: 'Botanical Illustrations',
		description:
			'A set of detailed botanical illustrations. Each drawing showcases a specific plant, from roots to flowers. These illustrations are useful for botany books, gardening, or simply appreciating the beauty of nature.',
		categoryId: '2',
		image: 'webpages-work-2.jpeg',
	},
	{
		id: '6',
		title: 'Strong Together Charity',
		description:
			"Amplify your impact and rally support for your charitable cause with our charity platform. Designed specifically for nonprofits, charities, and philanthropic organizations, it's a complete platform to share your mission.",
		categoryId: '2',
		image: 'webpages-work-3.jpeg',
	},
	{
		id: '7',
		title: 'Efficient Task Manager',
		description:
			'Boost your productivity with our efficient task manager app. Designed for busy professionals, it helps you stay organized and on top of your work.',
		categoryId: '3',
		image: 'apps-work-1.jpeg',
	},
	{
		id: '8',
		title: 'Health & Fitness Tracker',
		description:
			'Take control of your health journey with our comprehensive fitness tracker. Tailored for fitness enthusiasts looking to monitor their progress and reach their goals.',
		categoryId: '3',
		image: 'apps-work-2.jpeg',
	},
	{
		id: '9',
		title: 'Language Learning Companion',
		description:
			'Master a new language with ease using our interactive learning companion. Perfect for students and language learners seeking a fun and effective way to enhance their skills.',
		categoryId: '3',
		image: 'apps-work-3.jpeg',
	},
];

export const users = [
	{
		id: '9dsbhm0RhiuGKQ_c6jY6a',
		username: 'techlover123',
		email: 'techlover123@mail.com',
		password: 'techlover1231234',
	},
	{
		id: 'XDnUVyZvvfzbONPqk2x34',
		username: 'codegeek',
		email: 'codegeek@mail.com',
		password: 'codegeek1234',
	},
];

export const session = {
	expires: '2024-08-14T07:22:45.468Z',
	user: {
		id: users[0].id,
		username: users[0].username,
		email: users[0].email,
	},
};

export const posts = [
	{
		id: '1',
		title: 'The Future of AI in Web Development',
		description:
			'Exploring the impact of artificial intelligence on web development. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Commodi similique fuga provident accusantium, atque sequi odit rem veniam quisquam repellat recusandae tenetur beatae totam distinctio quod, esse incidunt, inventore illo?',
		image: 'https://placehold.co/400.png',
		content:
			'In recent years, artificial intelligence (AI) has revolutionized web development. From chatbots that enhance user interactions to personalized recommendations based on machine learning models, AI is omnipresent. Developers now leverage libraries like TensorFlow and PyTorch to create robust ML models. Neural networks and natural language processing (NLP) are transforming how we engage with the web. The future of AI in web development promises exciting innovations and improved user experiences!',
		userId: '9dsbhm0RhiuGKQ_c6jY6a',
		createdAt: '2024-06-19T20:00:00Z',
		user: {
			id: '9dsbhm0RhiuGKQ_c6jY6a',
			username: 'techlover123',
		},
	},
	{
		id: '2',
		title: 'JavaScript Frameworks Comparison',
		description:
			'Comparing React, Vue, and Angular for modern web development. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Commodi similique fuga provident accusantium, atque sequi odit rem veniam quisquam repellat recusandae tenetur beatae totam distinctio quod, esse incidunt, inventore illo?',
		image: 'https://placehold.co/400.png',
		content:
			"React, Vue, and Angular stand out as three prominent JavaScript frameworks. Each has its strengths and trade-offs. React dominates large-scale, complex applications, while Vue's simplicity and gentle learning curve attract developers. Angular, with its robust structure and extensive community, remains a solid choice. When comparing them, consider factors like performance, ease of adoption, and community support.",
		userId: '9dsbhm0RhiuGKQ_c6jY6a',
		createdAt: '2024-06-19T21:30:00Z',
		user: {
			id: '9dsbhm0RhiuGKQ_c6jY6a',
			username: 'techlover123',
		},
	},
	{
		id: '3',
		title: 'Building Scalable APIs with Node.js',
		description:
			'Best practices for creating robust APIs using Node.js. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Commodi similique fuga provident accusantium, atque sequi odit rem veniam quisquam repellat recusandae tenetur beatae totam distinctio quod, esse incidunt, inventore illo?',
		image: 'https://placehold.co/400.png',
		content:
			"Node.js shines when building scalable APIs. Its asynchronous programming model efficiently handles concurrent requests. Security, authentication, and data validation are critical considerations. Express.js simplifies route handling and middleware management. Don't forget thorough API documentation and adherence to performance best practices.",
		userId: 'XDnUVyZvvfzbONPqk2x34',
		createdAt: '2024-06-19T22:45:00Z',
		user: {
			id: 'XDnUVyZvvfzbONPqk2x34',
			username: 'codegeek',
		},
	},
];

export function mockGoogleFonts() {
	vi.mock('next/font/google', () => ({
		Roboto_Condensed: () => ({
			style: {
				fontFamily: 'mocked',
			},
		}),
		Roboto: () => ({
			style: {
				fontFamily: 'mocked',
			},
		}),
	}));
}

export const notificationMock = {
	data: {
		title: 'Test Title',
		message: 'Test Message',
		autoClose: 300,
		closeOnClick: true,
	},
	isVisible: true,
	show: vi.fn(),
	hide: vi.fn(),
};
export const loadingSessionMock = {
	data: null,
	status: 'loading',
};
export const unauthenticatedSessionMock = {
	data: null,
	status: 'unauthenticated',
};
export const authenticatedSessionMock = {
	data: session,
	status: 'authenticated',
	update: vi.fn(),
};
export const failureSignIn = new Promise((resolve) => {
	setTimeout(() => {
		return resolve({
			error: 'Credentials are invalid',
			status: 401,
			ok: false,
			url: null,
		});
	}, 500);
});
export const nextAuthMock = {
	useSession: vi.fn(() => loadingSessionMock),
	signOut: vi.fn(),
	signIn: vi.fn(() => {
		return new Promise((resolve) => {
			setTimeout(() => {
				return resolve({
					error: undefined,
					status: 200,
					ok: true,
					url: '/',
				});
			}, 500);
		});
	}),
};
export const useRouterMock = {
	push: vi.fn(),
	replace: vi.fn(),
	refresh: vi.fn(),
	back: vi.fn(),
	forward: vi.fn(),
	asPath: '/',
	isFallback: false,
};
export const navigationMock = {
	useRouter: vi.fn(() => useRouterMock),
	useSearchParams: vi.fn(() => new URLSearchParams()),
	usePathname: vi.fn(() => '/'),
};
