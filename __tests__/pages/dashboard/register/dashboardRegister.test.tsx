import {
	$emailInput,
	$passwordInput,
	$registerSubmitBtn,
	$usernameInput,
	authenticatedSessionMock,
	navigationMock,
	nextAuthMock,
	unauthenticatedSessionMock,
	users,
} from '@/__tests__/fixtures';
import { render, screen, setupUser, waitFor } from '@/__tests__/testsUtils';
import RegisterPage from '@/app/dashboard/register/page';
import Layout from '@/app/layout';
import { IUser } from '@/types/custom.types';
import { signIn, useSession } from 'next-auth/react';
import { Mock, beforeEach, describe, expect, it, vi } from 'vitest';

// /////////
// MOCKS
// /////////
vi.mock('next/font/google');
vi.mock('next/navigation', () => navigationMock);
vi.mock('next-auth/react', () => nextAuthMock);
// /////////

const user = setupUser();

function renderPage() {
	return render(
		<Layout>
			<RegisterPage />
		</Layout>
	);
}

async function submitForm(data?: Partial<IUser>) {
	await user.type($usernameInput()!, data?.username || ' ');
	await user.type($emailInput()!, data?.email || ' ');
	await user.type($passwordInput()!, data?.password || ' ');
	await user.click($registerSubmitBtn()!);
}

describe('<DashboardRegisterPage />', () => {
	describe('Auth', () => {
		it('should not display the page if you are authenticated', () => {
			(useSession as Mock).mockReturnValue(authenticatedSessionMock);
			renderPage();

			expect(screen.queryByTestId('register-page')).not.toBeInTheDocument();
		});
		it('should display the page if you are not authenticated', () => {
			(useSession as Mock).mockReturnValue(unauthenticatedSessionMock);
			renderPage();

			expect(screen.queryByTestId('register-page')).toBeInTheDocument();
		});
	});
	describe('Layout', () => {
		beforeEach(() => {
			(useSession as Mock).mockReturnValue(unauthenticatedSessionMock);
		});

		it('should display the username input', () => {
			renderPage();

			expect($usernameInput()).toBeInTheDocument();
		});
		it('should be of type "text" the username input', () => {
			renderPage();

			expect($usernameInput()).toHaveAttribute('type', 'text');
		});
		it('should display the email input', () => {
			renderPage();

			expect($emailInput()).toBeInTheDocument();
		});
		it('should be of type "email" the email input', () => {
			renderPage();

			expect($emailInput()).toHaveAttribute('type', 'email');
		});
		it('should display the password input', () => {
			renderPage();

			expect($passwordInput()).toBeInTheDocument();
		});
		it('should be of type "password" the password input', () => {
			renderPage();

			expect($passwordInput()).toHaveAttribute('type', 'password');
		});
		it('should display the submit button', () => {
			renderPage();

			expect($registerSubmitBtn()).toBeInTheDocument();
			expect($registerSubmitBtn()).toHaveTextContent('Register');
		});
		it('should be of type "submit" the submit button', () => {
			renderPage();

			expect($registerSubmitBtn()).toHaveAttribute('type', 'submit');
		});
		it('should display a link to the login', () => {
			renderPage();

			expect(
				screen.queryByText('Do you already have an account?')
			).toBeInTheDocument();
			expect(
				screen.queryByRole('link', {
					name: 'Login',
				})
			).toBeInTheDocument();
		});
		it('should the login link have the correct attributes', () => {
			renderPage();

			expect(
				screen.queryByRole('link', {
					name: 'Login',
				})
			).toHaveAttribute('href', '/dashboard/login');
		});
	});
	describe('Interaction', () => {
		beforeEach(() => {
			(useSession as Mock).mockReturnValue(unauthenticatedSessionMock);
		});

		it('should be able to write in the name input', async () => {
			const expectedValue = 'goku';

			renderPage();

			await user.type($usernameInput()!, expectedValue);

			expect($usernameInput()).toHaveValue();
		});
		it('should be able to write in the email input', async () => {
			const expectedValue = 'goku@mail.com';

			renderPage();

			await user.type($usernameInput()!, expectedValue);

			expect($usernameInput()).toHaveValue();
		});
		it('should be able to write in the password input', async () => {
			const expectedValue = 'thisisthepassword';

			renderPage();

			await user.type($passwordInput()!, expectedValue);

			expect($passwordInput()).toHaveValue();
		});
		it('should disable the submit button when the form is submitted', async () => {
			renderPage();

			await submitForm(users[0]);

			expect($registerSubmitBtn()).toHaveProperty('disabled', true);
		});
		it('should display the loading text when the form is submitted', async () => {
			renderPage();

			await submitForm(users[0]);

			expect($registerSubmitBtn()).toHaveTextContent('Registering...');
		});
		it('should enable the submit button after the form is submitted', async () => {
			renderPage();

			await submitForm(users[0]);

			await waitFor(
				() =>
					expect($registerSubmitBtn()).not.toHaveProperty(
						'disabled',
						true
					),
				{
					timeout: 5000,
				}
			);
		});
		it('should not display the loading text after the form is submitted', async () => {
			renderPage();

			await submitForm(users[0]);

			await waitFor(
				() =>
					expect($registerSubmitBtn()).not.toHaveTextContent(
						'Registering...'
					),
				{ timeout: 5000 }
			);
		});
		it('should call signIn("credentials", {credentials}) after the form is submitted successfully', async () => {
			renderPage();

			await submitForm(users[0]);

			await waitFor(
				() =>
					expect(signIn).toHaveBeenCalledWith('credentials', {
						redirect: false,
						email: users[0].email,
						password: users[0].password,
					}),
				{
					timeout: 5000,
				}
			);
		});
		it('should clear the form after successfully submission', async () => {
			renderPage();

			await submitForm(users[0]);

			await waitFor(() =>
				expect(screen.queryByText('Registering...')).not.toBeInTheDocument()
			);
			expect($usernameInput()).toHaveValue('');
			expect($emailInput()).toHaveValue('');
			expect($passwordInput()).toHaveValue('');
		});
		describe('Validation', () => {
			it('should display an error if the username input is empty and the form is submitted', async () => {
				renderPage();

				await submitForm();

				expect(
					screen.queryByText('Please, fill this field')
				).toBeInTheDocument();
			});
			it('should display an error if the username is less than 4 characters and the form is submitted', async () => {
				renderPage();

				await submitForm({ username: '12' });

				expect(
					screen.queryByText('The name must be at least 4 characters')
				).toBeInTheDocument();
			});
			it('should display an error if the email input is empty and the form is submitted', async () => {
				renderPage();

				await submitForm({ username: users[0].username });

				expect(
					screen.queryByText('Please, fill this field')
				).toBeInTheDocument();
			});
			it('should display an error if the email is not valid and the form is submitted', async () => {
				renderPage();

				await submitForm({
					username: users[0].username,
					email: 'goku@mail',
				});

				expect(
					screen.queryByText('The email is not valid')
				).toBeInTheDocument();
			});
			it('should display an error if the password input is empty and the form is submitted', async () => {
				renderPage();

				await submitForm({
					username: users[0].username,
					email: users[0].email,
				});

				expect(
					screen.queryByText('Please, fill this field')
				).toBeInTheDocument();
			});
			it.skip('should display an error if the password is less than 8 characteres and the form is submitted', async () => {
				renderPage();

				await submitForm({
					username: users[0].username,
					email: users[0].email,
					password: '123456',
				});

				expect(
					screen.queryByText(
						'The password must have at least 8 characters'
					)
				).toBeInTheDocument();
			});
			it.skip('should display an error if the user already exists', async () => {
				renderPage();

				await submitForm({
					...users[0],
					email: 'exists@mail.com',
				});

				await waitFor(() =>
					expect(
						screen.queryByText('The user already exists')
					).toBeInTheDocument()
				);
			});
		});
	});
});
