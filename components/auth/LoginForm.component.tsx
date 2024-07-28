'use client';

import { loginFormValidation } from '@/utils';
import { signIn } from 'next-auth/react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { ZodError } from 'zod';
import styles from './auth.styles.module.css';

interface ILogin {
	email: string;
	password: string;
}

type FormErrorType = Partial<ILogin>;

const formSchema: ILogin = {
	email: '',
	password: '',
};

function LoginForm(): JSX.Element {
	const [formData, setFormData] = useState<ILogin>(formSchema);
	const [error, setError] = useState<FormErrorType | null>(null);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const searchParams = useSearchParams();
	const loginError = searchParams.get('error');
	const router = useRouter();

	async function handleSubmit(
		e: React.FormEvent<HTMLFormElement>
	): Promise<void> {
		e.preventDefault();

		setError(null);
		setIsLoading(true);
		try {
			const parsedData = loginFormValidation.parse(formData);
			await signIn('credentials', {
				email: parsedData.email,
				password: parsedData.password,
			});
			router.replace('/dashboard');
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
				{error?.email ||
					(loginError && (
						<small className='c-danger-500'>
							{error?.email || loginError}
						</small>
					))}
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
