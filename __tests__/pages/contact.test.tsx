import RootLayout from '@/app/layout';
import { describe, expect, it, vi } from 'vitest';
import ContactPage from '../../app/contact/page';
import { render, screen, setupUser, waitFor } from '../testsUtils';

// ///////////
// MOCKS
// ///////////
vi.mock('next/font/google');
// ///////////

const user = setupUser();
const contactData = {
	name: 'goku',
	email: 'goku@gmail.com',
	message: 'This is the message',
};
const nameInput = () => screen.queryByPlaceholderText('Your Name');
const emailInput = () => screen.queryByPlaceholderText('Your Email');
const messageInput = () => screen.queryByPlaceholderText('Your Message');
const submitButton = () => screen.queryByTestId('contact-submit-button');

function renderPage() {
	return render(
		<RootLayout>
			<ContactPage />
		</RootLayout>
	);
}

async function submitForm(data?: {
	name?: string;
	email?: string;
	message?: string;
}) {
	await user.type(nameInput()!, data?.name || ' ');
	await user.type(emailInput()!, data?.email || ' ');
	await user.type(messageInput()!, data?.message || ' ');
	await user.click(submitButton()!);
}

describe('<ContactPage />', () => {
	describe('Layout', () => {
		it('should display the title', () => {
			renderPage();

			expect(screen.queryByText("Let's Keep in Touch")).toBeInTheDocument();
		});
		it('should display the image', () => {
			renderPage();

			expect(document.querySelector('img')).toBeInTheDocument();
		});
		it('should display the name input', () => {
			renderPage();

			expect(nameInput()).toBeInTheDocument();
		});
		it('should the name input be of type text', () => {
			renderPage();

			expect(nameInput()).toHaveAttribute('type', 'text');
		});
		it('should display the email input', () => {
			renderPage();

			expect(emailInput()).toBeInTheDocument();
		});
		it('should the name input be of type email', () => {
			renderPage();

			expect(emailInput()).toHaveAttribute('type', 'email');
		});
		it('should display the message input', () => {
			renderPage();

			expect(messageInput()).toBeInTheDocument();
		});
		it('should the message input be a textarea', () => {
			renderPage();

			expect(messageInput()?.tagName).toBe('TEXTAREA');
		});
		it('should display the submit button', () => {
			renderPage();

			expect(submitButton()).toBeInTheDocument();
		});
		it('should the submit button be of type submit', () => {
			renderPage();

			expect(submitButton()).toHaveAttribute('type', 'submit');
		});
	});
	describe('Interaction', () => {
		it('should disable the submit button when submitting the form', async () => {
			renderPage();

			await submitForm(contactData);

			expect(submitButton()).toHaveProperty('disabled', true);
		});
		it('should display the loading text when submitting the form', async () => {
			renderPage();

			await submitForm(contactData);

			expect(screen.queryByText('SENDING...')).toBeInTheDocument();
		});
		it('should enable the submit button after submitting the form', async () => {
			renderPage();

			await submitForm(contactData);

			await waitFor(
				() => expect(submitButton()).not.toHaveProperty('disabled', true),
				{
					timeout: 5000,
				}
			);
		});
		it('should not display the loading state after submitting the form', async () => {
			renderPage();

			await submitForm(contactData);

			await waitFor(
				() =>
					expect(screen.queryByText('SENDING...')).not.toBeInTheDocument(),
				{
					timeout: 5000,
				}
			);
		});
		it('should display a notification after submitting the form', async () => {
			renderPage();

			await submitForm(contactData);

			await waitFor(
				() => expect(screen.queryByText('Done!')).toBeInTheDocument(),
				{
					timeout: 5000,
				}
			);
		});
		it('should hide the notification after n seconds after submitting the form', async () => {
			renderPage();

			await submitForm(contactData);

			await waitFor(() =>
				expect(screen.queryByTestId('notification')).not.toBeInTheDocument()
			);
		});
		it('should hide the notification when clicking on it after submitting the form', async () => {
			renderPage();

			await submitForm(contactData);
			await user.click(screen.queryByTestId('notification')!);

			expect(screen.queryByTestId('notification')).not.toBeInTheDocument();
		});
		describe('Validation', () => {
			it('should display an error if the name input is empty and the form is submitted', async () => {
				renderPage();

				await submitForm();

				expect(
					screen.queryByText('Please, fill this field')
				).toBeInTheDocument();
			});
			it('should display an error if the name length less than 4 characters and the form is submitted', async () => {
				renderPage();

				await submitForm({
					name: '123',
				});

				expect(
					screen.queryByText('The name must be at least 4 characters')
				).toBeInTheDocument();
			});
			it('should display an error if the email is an empty string and the form is submitted', async () => {
				renderPage();

				await submitForm({
					name: 'goku',
				});

				expect(
					screen.queryByText('Please, fill this field')
				).toBeInTheDocument();
			});
			it('should display an error if the email is not valid and the form is submitted', async () => {
				renderPage();

				await submitForm({
					name: 'goku',
					email: 'goku@mail',
				});

				expect(
					screen.queryByText('The email is not valid')
				).toBeInTheDocument();
			});
		});
	});
});
