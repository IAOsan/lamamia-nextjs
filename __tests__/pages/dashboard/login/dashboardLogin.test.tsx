import {
	$emailInput,
	$loginSubmitBtn,
	$passwordInput,
	authenticatedSessionMock,
	failureSignIn,
	navigationMock,
	nextAuthMock,
	unauthenticatedSessionMock,
	useRouterMock,
	users,
} from '@/__tests__/fixtures';
import { render, screen, setupUser, waitFor } from '@/__tests__/testsUtils';
import LoginPage from '@/app/dashboard/login/page';
import { IUserLogin } from '@/types/custom.types';
import { signIn, useSession } from 'next-auth/react';
import { Mock, beforeEach, describe, expect, it, vi } from 'vitest';

// /////////////
// MOCKS
vi.mock('next/navigation', () => navigationMock);
vi.mock('next-auth/react', () => nextAuthMock);
// /////////////

const user = setupUser();

function setup() {
	return render(<LoginPage />);
}

async function submitForm(data?: Partial<IUserLogin>) {
	await user.type($emailInput()!, data?.email || ' ');
	await user.type($passwordInput()!, data?.password || ' ');
	await user.click($loginSubmitBtn()!);
}

describe('<DashboardLoginPage />', () => {
	describe('Auth', () => {
		it('should not display the login page if you are authenticated', () => {
			(useSession as Mock).mockReturnValueOnce(authenticatedSessionMock);
			setup();

			expect(screen.queryByTestId('login-page')).not.toBeInTheDocument();
		});
		it('should call router.replace(/dashboard) if you are authenticated', () => {
			(useSession as Mock).mockReturnValueOnce(authenticatedSessionMock);
			setup();

			expect(useRouterMock.replace).toHaveBeenCalledWith('/dashboard');
		});
		it('should display the login page if you are not authenticated', () => {
			(useSession as Mock).mockReturnValueOnce(unauthenticatedSessionMock);
			setup();

			expect(screen.queryByTestId('login-page')).toBeInTheDocument();
		});
	});
	describe('Layout', () => {
		beforeEach(() => {
			(useSession as Mock).mockReturnValueOnce(unauthenticatedSessionMock);
		});

		it('should display the email input', () => {
			setup();
			expect($emailInput()).toBeInTheDocument();
		});
		it('should be of type "email" the email input', () => {
			setup();
			screen.debug();
			expect($emailInput()).toHaveAttribute('type', 'email');
		});
		it('should display the password input', () => {
			setup();
			expect($passwordInput()).toBeInTheDocument();
		});
		it('should be of type "password" the password input', () => {
			setup();
			expect($passwordInput()).toHaveAttribute('type', 'password');
		});
		it('should display the submit button', () => {
			setup();
			expect($loginSubmitBtn()).toBeInTheDocument();
			expect($loginSubmitBtn()).toHaveTextContent('Login');
		});
		it('should be of type "submit" the submit button', () => {
			setup();
			expect($loginSubmitBtn()).toHaveAttribute('type', 'submit');
		});
		it('should show the link to register', () => {
			setup();
			expect(
				screen.queryByText("Don't have an account?")
			).toBeInTheDocument();
			expect(
				screen.queryByRole('link', { name: 'Sign up' })
			).toBeInTheDocument();
		});
		it('should have the correct attributes the link to register', async () => {
			setup();
			expect(
				screen.queryByRole('link', { name: 'Sign up' })
			).toHaveAttribute('href', '/dashboard/register');
		});
	});
	describe('Interaction', () => {
		beforeEach(() => {
			(useSession as Mock).mockReturnValueOnce(unauthenticatedSessionMock);
		});

		it('should be able to wite in the email input', async () => {
			const expectedValue = 'email@example.com';
			setup();

			await user.type($emailInput()!, expectedValue);

			expect($emailInput()).toHaveValue(expectedValue);
		});
		it('should be able to wite in the password input', async () => {
			const expectedValue = 'thepasswordishere';
			setup();

			await user.type($passwordInput()!, expectedValue);

			expect($passwordInput()).toHaveValue(expectedValue);
		});
		it('should disable the submit button when the form is submitted', async () => {
			setup();

			await submitForm({
				email: users[0].email,
				password: users[0].password,
			});

			expect($loginSubmitBtn()).toHaveProperty('disabled', true);
		});
		it('should display the loader text when the form is submitted', async () => {
			setup();

			await submitForm({
				email: users[0].email,
				password: users[0].password,
			});

			expect($loginSubmitBtn()).toHaveTextContent('Logging in...');
		});
		it('should enable the submit button after the form is submitted', async () => {
			setup();

			await submitForm({
				email: users[0].email,
				password: users[0].password,
			});

			await waitFor(
				() =>
					expect($loginSubmitBtn()).not.toHaveProperty('disabled', true),
				{
					timeout: 5000,
				}
			);
		});
		it('should not display the loader text after the form is submitted', async () => {
			setup();

			await submitForm({
				email: users[0].email,
				password: users[0].password,
			});

			await waitFor(
				() =>
					expect($loginSubmitBtn()).not.toHaveTextContent('Logging in...'),
				{
					timeout: 5000,
				}
			);
		});
		it('should call signIn() with the correct parameters after the form is submitted successfully', async () => {
			setup();

			await submitForm({
				email: users[0].email,
				password: users[0].password,
			});

			expect(signIn).toHaveBeenCalledWith('credentials', {
				redirect: false,
				email: users[0].email,
				password: users[0].password,
			});
		});
		describe('validation', () => {
			it('should display an error if the email input is empty and the form is submitted', async () => {
				setup();

				await submitForm();

				expect(
					screen.queryByText('Please, fill this field')
				).toBeInTheDocument();
			});
			it('should display an error if the email is not valid and the form is submitted', async () => {
				setup();

				await submitForm({
					email: 'hola@mail',
					password: users[0].password,
				});

				expect(
					screen.queryByText('The email is not valid')
				).toBeInTheDocument();
			});
			it('should display an error if the password input is empty and the form is submitted', async () => {
				setup();

				await submitForm({ email: users[0].email });

				expect(
					screen.queryByText('Please, fill this field')
				).toBeInTheDocument();
			});
			it('should display an error if something went wrong with the signin', async () => {
				(signIn as Mock).mockReturnValueOnce(failureSignIn);

				setup();

				await submitForm({
					email: 'notexist@mail.com',
					password: users[0].password,
				});

				await waitFor(
					() =>
						expect(
							screen.queryByText('Loading...')
						).not.toBeInTheDocument(),
					{
						timeout: 6000,
					}
				);

				await waitFor(() =>
					expect(
						screen.queryByText('Credentials are invalid')
					).toBeInTheDocument()
				);
			});
		});
	});
});
