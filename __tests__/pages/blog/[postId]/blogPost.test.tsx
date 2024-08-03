import { posts } from '@/__tests__/fixtures';
import { render, screen } from '@/__tests__/testsUtils';
import BlogPostPage from '@/app/blog/[postId]/page';
import { ReactElement } from 'react';
import { describe, expect, it } from 'vitest';

async function renderPage(postId: string) {
	return render(
		(await BlogPostPage({ params: { postId } })) as ReactElement<any>
	);
}

const expectedPostId = '1';
const expectedPost = posts[Number(1) - 1];

describe('<BlogPostPage />', () => {
	describe('Layout', () => {
		it('should display the title of the specified post', async () => {
			await renderPage(expectedPostId);

			expect(screen.queryByText(expectedPost.title)).toBeInTheDocument();
		});
		it('should display the description of the specified post', async () => {
			await renderPage(expectedPostId);

			expect(
				screen.queryByText(expectedPost.description)
			).toBeInTheDocument();
		});
		it('should display the name of the owner of the specified post', async () => {
			await renderPage(expectedPostId);

			expect(
				screen.queryByText(expectedPost.user.username)
			).toBeInTheDocument();
		});
		it('should display the image of the specified post', async () => {
			await renderPage(expectedPostId);

			const img = document.querySelector('img');
			expect(img).toBeInTheDocument();
		});
		it('should display the content of the specified post', async () => {
			await renderPage(expectedPostId);

			expect(
				screen.queryByText(expectedPost.description)
			).toBeInTheDocument();
		});
	});
});
