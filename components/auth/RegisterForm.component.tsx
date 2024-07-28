'use client';

import apiService from '@/services/api.service';
import { IUser, UserRegisterType } from '@/types/custom.types';
import { HttpError, registerFormValidation } from '@/utils';
import { signIn } from 'next-auth/react';
import Link from 'next/link';
import { useState } from 'react';
import { ZodError } from 'zod';
import styles from './auth.styles.module.css';

type FormErrorType = Partial<IUser>;

const formSchema: UserRegisterType = {
	username: '',
	email: '',
	password: '',
};

function RegisterForm() {
	const [formData, setFormData] = useState<UserRegisterType>(formSchema);
	const [error, setError] = useState<FormErrorType | null>(null);
	const [isLoading, setIsLoading] = useState<boolean>(false);

	async function handleSubmit(
		e: React.FormEvent<HTMLFormElement>
	): Promise<void> {
		e.preventDefault();

		setError(null);
		setIsLoading(true);
		try {
			const parsedData = registerFormValidation.parse(formData);
			await apiService.registerWithEmailAndPassword(parsedData);
			await signIn('credentials', {
				redirect: false,
				email: parsedData.email,
				password: parsedData.password,
			});
			setFormData(formSchema);
		} catch (error) {
			if (error instanceof ZodError) {
				const e = error.errors[0];
				setError({
					[e.path[0]]: e.message,
				});
			}
			if (error instanceof HttpError) {
				setError(error.reason as FormErrorType);
			}
		} finally {
			setIsLoading(false);
		}
	}

	function handleChange(e: React.ChangeEvent<HTMLInputElement>): void {
		setFormData((prevState) => ({
			...prevState,
			[e.target.name]: e.target.value,
		}));
	}

	return (
		<form
			onSubmit={handleSubmit}
			className={styles.wrapper}
		>
			<div className='form__group'>
				<input
					onChange={handleChange}
					value={formData.username}
					name='username'
					className='form__control'
					type='text'
					placeholder='Your username'
				/>
				{error?.username && (
					<small className='c-danger-500'>{error.username}</small>
				)}
			</div>
			<div className='form__group'>
				<input
					onChange={handleChange}
					value={formData.email}
					name='email'
					className='form__control'
					type='email'
					placeholder='Your email address'
				/>
				{error?.email && (
					<small className='c-danger-500'>{error.email}</small>
				)}
			</div>
			<div className='form__group'>
				<input
					onChange={handleChange}
					value={formData.password}
					name='password'
					className='form__control'
					type='password'
					placeholder='Your password'
				/>
				{error?.password && (
					<small className='c-danger-500'>{error.password}</small>
				)}
			</div>
			<button
				disabled={isLoading}
				type='submit'
				data-testid='register-submit-button'
				className='button button--primary w-100 mb-16'
			>
				{isLoading ? 'Registering...' : 'Register'}
			</button>
			<p>
				<span>Do you already have an account?</span>{' '}
				<Link
					href='/dashboard/login'
					className='link'
				>
					Login
				</Link>
			</p>
		</form>
	);
}

export default RegisterForm;
