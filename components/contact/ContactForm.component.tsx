'use client';

import { useNotificationContext } from '@/context/Notification.context';
import { contactFormValidation } from '@/utils';
import { useState } from 'react';
import { ZodError } from 'zod';

interface IFormData {
	name: string;
	email: string;
	message: string;
}

type FormErrorType = Partial<IFormData>;

function ContactForm(): JSX.Element {
	const [formData, setFormData] = useState<IFormData>({
		name: '',
		email: '',
		message: '',
	});
	const [error, setError] = useState<FormErrorType | null>(null);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const notification = useNotificationContext();

	async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();

		setIsLoading(true);
		try {
			contactFormValidation.parse(formData);
			await new Promise((resolve, reject) => {
				setTimeout(() => {
					return resolve('ok');
				}, 3000);
			});
			notification.show({
				title: 'Done!',
				message: 'Your message has been sent',
			});
		} catch (error) {
			if (error instanceof ZodError) {
				const e = error.errors[0];
				setError({
					[e.path[0]]: e.message,
				});
			}
		} finally {
			setIsLoading(false);
		}
	}

	function handleChange(
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
	): void {
		setFormData((prevState) => ({
			...prevState,
			[e.target.name]: e.target.value,
		}));
	}

	return (
		<form onSubmit={handleSubmit}>
			<div className='form__group'>
				<input
					onChange={handleChange}
					value={formData.name}
					type='text'
					name='name'
					id='nameInput'
					placeholder='Your Name'
					className='form__control'
				/>
				{error?.name && (
					<small className='c-danger-500'>{error.name}</small>
				)}
			</div>
			<div className='form__group'>
				<input
					onChange={handleChange}
					value={formData.email}
					type='email'
					name='email'
					id='emailInput'
					placeholder='Your Email'
					className='form__control'
				/>
				{error?.email && (
					<small className='c-danger-500'>{error.email}</small>
				)}
			</div>
			<div className='form__group'>
				<textarea
					onChange={handleChange}
					value={formData.message}
					name='message'
					id='messageInput'
					placeholder='Your Message'
					className='form__control form__control--textarea'
				></textarea>
			</div>
			<button
				data-testid='contact-submit-button'
				className='button button--primary w-100'
				type='submit'
				disabled={isLoading}
			>
				<b>{isLoading ? 'SENDING...' : 'SEND'}</b>
			</button>
		</form>
	);
}

export default ContactForm;
