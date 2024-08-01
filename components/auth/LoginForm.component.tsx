'use client';

import { UserLoginType } from '@/types/custom.types';
import { HttpError, loginFormValidation } from '@/utils';
import { signIn } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { ZodError } from 'zod';
import styles from './auth.styles.module.css';

type FormErrorType = Partial<UserLoginType>;

const formSchema: UserLoginType = {
	email: '',
	password: '',
};

function LoginForm(): JSX.Element {
	const [formData, setFormData] = useState<UserLoginType>(formSchema);
	const [error, setError] = useState<FormErrorType | null>(null);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const router = useRouter();

	async function handleSubmit(
		e: React.FormEvent<HTMLFormElement>
	): Promise<void> {
		e.preventDefault();

		setIsLoading(true);
		setError(null);
		try {
			const parsedData = loginFormValidation.parse(formData);
			const res = await signIn('credentials', {
				redirect: false,
				email: parsedData.email,
				password: parsedData.password,
			});

			if (!res?.ok) {
				throw new HttpError({
					statusCode: 401,
					reason: { email: res?.error },
				});
			}

			router.replace('/dashboard');
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
					value={formData.email}
					name='email'
					className='form__control'
					type='email'
					placeholder='Your email address'
				/>
				{error?.email && (
					<small className='c-danger-500'>{error?.email}</small>
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
				className='button button--primary w-100 mb-16'
				data-testid='login-submit-button'
				type='submit'
			>
				{isLoading ? 'Logging in...' : 'Login'}
			</button>
			<p>
				<span>Don&apos;t have an account?</span>{' '}
				<Link
					href='/dashboard/register'
					className='link'
				>
					Sign up
				</Link>
			</p>
		</form>
	);
}

export default LoginForm;
