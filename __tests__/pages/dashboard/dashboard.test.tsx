import {
	$logoutBtn,
	authenticatedSessionMock,
	navigationMock,
	nextAuthMock,
	posts,
	unauthenticatedSessionMock,
} from '@/__tests__/fixtures';
import { mockServer } from '@/__tests__/mocks/server';
import { getEmptyPosts } from '@/__tests__/mocks/serverHandlers';
import DashboardPage from '@/app/dashboard/page';
import Layout from '@/app/layout';
import { NewPostType } from '@/types/custom.types';
import { signOut, useSession } from 'next-auth/react';
import { Mock, beforeEach, describe, expect, it, vi } from 'vitest';
import { render, screen, setupUser, waitFor } from '../../testsUtils';

// ///////////
// MOCKS
// ///////////
vi.mock('next/navigation', () => navigationMock);
vi.mock('next-auth/react', () => nextAuthMock);
// ///////////

const user = setupUser();
const $titleInput = () => screen.queryByPlaceholderText('Title');
const $descriptionInput = () => screen.queryByPlaceholderText('Description');
const $imageInput = () => screen.queryByPlaceholderText('Image');
const $contentInput = () => screen.queryByPlaceholderText('Content');
const $submitButton = () => screen.queryByTestId('dashboard-submit-button');
const newPost = {
	title: 'new post',
	description: 'Description',
	image: 'https://placehold.co/600x400',
	content: 'Content',
};

function setup() {
	return render(<DashboardPage />);
}

async function submitForm(data?: Partial<NewPostType>) {
	await user.type($titleInput()!, data?.title || ' ');
	await user.type($descriptionInput()!, data?.description || ' ');
	await user.type($imageInput()!, data?.image || ' ');
	await user.type($contentInput()!, data?.content || ' ');
	await user.click($submitButton()!);
}

describe('<DashboardPage />', () => {
	describe('auth', () => {
		it('should not display the page if you are not authenticated', () => {
			(useSession as Mock).mockReturnValueOnce(unauthenticatedSessionMock);

			expect(screen.queryByTestId('dashboard-page')).not.toBeInTheDocument();
		});
		it('should not display the logout button if you are not authenticated', async () => {
			(useSession as Mock).mockReturnValue(unauthenticatedSessionMock);
			render(
				<Layout>
					<DashboardPage />
				</Layout>
			);

			expect($logoutBtn()).not.toBeInTheDocument();
		});
		it('should display the logout button if you are authenticated', async () => {
			(useSession as Mock).mockReturnValue(authenticatedSessionMock);
			render(
				<Layout>
					<DashboardPage />
				</Layout>
			);

			expect($logoutBtn()).toBeInTheDocument();
		});
		it('should call signOut() when clicks the logout button', async () => {
			(useSession as Mock).mockReturnValue(authenticatedSessionMock);
			render(
				<Layout>
					<DashboardPage />
				</Layout>
			);

			await user.click($logoutBtn()!);

			expect(signOut).toHaveBeenCalled();
		});
	});
	describe('Layout', () => {
		beforeEach(() => {
			(useSession as Mock).mockReturnValue(authenticatedSessionMock);
		});

		describe('List of posts', () => {
			it('should display the loading status when the page loads', () => {
				setup();

				expect(screen.queryByText('Loading...')).toBeInTheDocument();
			});
			it('should display a message if the list is empty', async () => {
				mockServer.use(getEmptyPosts);
				setup();

				await waitFor(() =>
					expect(screen.queryByText('Loading...')).not.toBeInTheDocument()
				);

				expect(screen.queryByText('No posts yet')).toBeInTheDocument();
				expect(
					screen.queryByText('The posts you create will appear here')
				).toBeInTheDocument();
			});
			it('should display the user posts when the page loads', async () => {
				setup();

				await waitFor(() =>
					expect(screen.queryByText('Loading...')).not.toBeInTheDocument()
				);

				expect(screen.queryByText(posts[0].title)).toBeInTheDocument();
				expect(screen.queryByText(posts[1].title)).toBeInTheDocument();
				expect(screen.queryByText(posts[2].title)).not.toBeInTheDocument();
			});
			it('should display the user posts sorted from the most newer to the oldest', async () => {
				setup();

				await waitFor(() =>
					expect(screen.queryByText('Loading...')).not.toBeInTheDocument()
				);

				const sortedPosts = screen
					.queryAllByTestId('user-post-card')
					.map((p) => {
						return p.querySelector('h3')?.textContent;
					});
				const expectedPosts = posts
					.slice(0, 2)
					.sort((a, b) => {
						return (
							new Date(b.createdAt).getTime() -
							new Date(a.createdAt).getTime()
						);
					})
					.map((p) => p.title);

				expect(sortedPosts).toEqual(expectedPosts);
			});
		});
		describe('Form', () => {
			it('should display the form title', () => {
				setup();

				expect(
					screen.queryByRole('heading', { name: 'Add New Post' })
				).toBeInTheDocument();
			});
			it('should display the title input', () => {
				setup();

				expect($titleInput()).toBeInTheDocument();
			});
			it('should be of type text the title input', () => {
				setup();

				expect($titleInput()).toHaveAttribute('type', 'text');
			});
			it('should be able to type in the title input', async () => {
				setup();

				await user.type($titleInput()!, 'goku');

				expect($titleInput()).toHaveValue('goku');
			});
			it('should display the description input', () => {
				setup();

				expect($descriptionInput()).toBeInTheDocument();
			});
			it('should be of type text the description input', () => {
				setup();

				expect($descriptionInput()).toHaveAttribute('type', 'text');
			});
			it('should be able to type in the description input', async () => {
				setup();

				await user.type($descriptionInput()!, 'goku');

				expect($descriptionInput()).toHaveValue('goku');
			});
			it('should display the image input', () => {
				setup();

				expect($imageInput()).toBeInTheDocument();
			});
			it('should be of type url the image input', () => {
				setup();

				expect($imageInput()).toHaveAttribute('type', 'url');
			});
			it('should be able to type in the image input', async () => {
				setup();

				await user.type($imageInput()!, 'https://placehold.co/600x400');

				expect($imageInput()).toHaveValue('https://placehold.co/600x400');
			});
			it('should display the content input', () => {
				setup();

				expect($contentInput()).toBeInTheDocument();
			});
			it('should be a textarea the content input', () => {
				setup();

				expect($contentInput()?.tagName).toBe('TEXTAREA');
			});
			it('should be able to type in the content input', async () => {
				setup();

				await user.type($contentInput()!, 'content');

				expect($contentInput()).toHaveValue('content');
			});
			it('should display the submit button', () => {
				setup();

				expect($submitButton()).toBeInTheDocument();
			});
			it('should be of type submit the submit button', () => {
				setup();

				expect($submitButton()).toHaveAttribute('type', 'submit');
			});
		});
	});
	describe('Interaction', () => {
		beforeEach(() => {
			(useSession as Mock).mockReturnValue(authenticatedSessionMock);
		});
		describe('Add posts', () => {
			it('should disable the submit button when the form is submitted', async () => {
				setup();

				await submitForm(newPost);

				expect($submitButton()).toHaveProperty('disabled', true);
			});
			it('should display the text loader when the form is submitted', async () => {
				setup();

				await submitForm(newPost);

				expect($submitButton()).toHaveTextContent('ADDING...');
			});
			it('should enable the submit button after the form is submitted', async () => {
				setup();

				await submitForm(newPost);

				await waitFor(() =>
					expect($submitButton()).not.toHaveProperty('disabled', true)
				);
			});
			it('should not display the text loader after the form is submitted', async () => {
				setup();

				await submitForm(newPost);

				await waitFor(() =>
					expect($submitButton()).not.toHaveTextContent('ADDING...')
				);
			});
			it('should clear the form when is submitted', async () => {
				setup();

				await submitForm(newPost);

				await waitFor(() => expect($titleInput()).toHaveValue(''));
				await waitFor(() => expect($descriptionInput()).toHaveValue(''));
				await waitFor(() => expect($imageInput()).toHaveValue(''));
				await waitFor(() => expect($contentInput()).toHaveValue(''));
			});
			it('should display the new post after the form is submitted', async () => {
				setup();

				await submitForm(newPost);

				await waitFor(() =>
					expect(screen.queryByText(newPost.title)).toBeInTheDocument()
				);
			});
			it('should not display the empty list message after adding a new post', async () => {
				setup();

				await submitForm(newPost);
				await waitFor(() =>
					expect(screen.queryByText(newPost.title)).toBeInTheDocument()
				);

				expect(screen.queryByText('No posts yet')).not.toBeInTheDocument();
				expect(
					screen.queryByText('The posts you create will appear here')
				).not.toBeInTheDocument();
			});
			it('should add the new post to the top of the posts list', async () => {
				setup();

				await waitFor(() =>
					expect(screen.queryByText('Loading...')).not.toBeInTheDocument()
				);
				await submitForm(newPost);
				await waitFor(() =>
					expect(screen.queryByText(newPost.title)).toBeInTheDocument()
				);

				const userPosts = screen
					.queryAllByTestId('user-post-card')
					.map((p) => p.querySelector('h3')?.textContent);

				expect(userPosts[0]).toBe(newPost.title);
			});
		});
		describe('Delete posts', () => {
			it('should remove a post after clicking the delete button', async () => {
				setup();

				await waitFor(() =>
					expect(screen.queryByText('Loading...')).not.toBeInTheDocument()
				);

				const $deleteBtn = screen.queryAllByTestId('delete-button')[0];
				await user.click($deleteBtn);

				await waitFor(() =>
					expect(screen.queryByText(newPost.title)).not.toBeInTheDocument()
				);
			});
		});
		describe('Validation', () => {
			it('should display an error if the title is empty and the form is submitted', async () => {
				setup();

				await submitForm();

				expect(
					screen.queryByText('Please, fill this field')
				).toBeInTheDocument();
			});
			it('should display an error if the description is empty and the form is submitted', async () => {
				setup();

				await submitForm({ title: newPost.title });

				expect(
					screen.queryByText('Please, fill this field')
				).toBeInTheDocument();
			});
			it('should display an error if the image is empty and the form is submitted', async () => {
				setup();

				await submitForm({
					title: newPost.title,
					description: newPost.description,
				});

				expect(
					screen.queryByText('Please, fill this field')
				).toBeInTheDocument();
			});
			it('should display an error if the content is empty and the form is submitted', async () => {
				setup();

				await submitForm({
					title: newPost.title,
					description: newPost.description,
					image: newPost.image,
				});

				expect(
					screen.queryByText('Please, fill this field')
				).toBeInTheDocument();
			});
			it('should not show any errors when the form is corrected and resubmitted', async () => {
				setup();

				await submitForm({
					title: newPost.title,
					description: newPost.description,
					image: newPost.image,
				});

				expect(
					screen.queryByText('Please, fill this field')
				).toBeInTheDocument();

				await submitForm({
					title: newPost.title,
					description: newPost.description,
					image: newPost.image,
					content: newPost.content,
				});

				await waitFor(() =>
					expect(
						screen.queryByText('Please, fill this field')
					).not.toBeInTheDocument()
				);
			});
		});
	});
});
