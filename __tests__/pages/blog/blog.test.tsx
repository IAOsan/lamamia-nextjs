import { posts } from '@/__tests__/fixtures';
import { render, screen } from '@/__tests__/testsUtils';
import BlogPage from '@/app/blog/page';
import { describe, expect, it } from 'vitest';

async function renderPage() {
	return render(await BlogPage());
}

const expectedPosts = posts;

describe('<BlogPage />', () => {
	describe('Layout', () => {
		it('should display the list of posts', async () => {
			await renderPage();

			expect(screen.queryByText(expectedPosts[0].title)).toBeInTheDocument();
			expect(
				screen.queryByText(expectedPosts[0].description)
			).toBeInTheDocument();
			expect(screen.queryByText(expectedPosts[1].title)).toBeInTheDocument();
			expect(
				screen.queryByText(expectedPosts[1].description)
			).toBeInTheDocument();
			expect(screen.queryByText(expectedPosts[2].title)).toBeInTheDocument();
			expect(
				screen.queryByText(expectedPosts[2].description)
			).toBeInTheDocument();
		});
		it('should each item has an image', async () => {
			await renderPage();

			const expectedResult = screen
				.queryAllByTestId('blog-post')
				.every((i) => i.querySelector('img') !== null);
			expect(expectedResult).toBeTruthy();
		});
		it('should each item has a link', async () => {
			await renderPage();

			const items = screen
				.queryAllByTestId('blog-post')
				.every((i) => i.querySelector('a') !== null);
			expect(items).toBeTruthy();
		});
		it('should each item link has the correct attributes', async () => {
			await renderPage();

			const expectedResult = expectedPosts.map((p) => `/blog/${p.id}`);
			const items = screen
				.queryAllByTestId('blog-post')
				.map((i) => i.querySelector('a'))
				.map((i) => i?.getAttribute('href'));

			expect(items).toEqual(expectedResult);
		});
	});
});
