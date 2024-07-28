import LoginForm from '@/components/auth/LoginForm.component';
import Public from '@/components/auth/Public.component';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'lamamia | Login',
	description: 'Log in or create an account on lamamia to access your content',
};

function LoginPage(): JSX.Element {
	return (
		<Public>
			<main
				data-testid='login-page'
				className='flex flex-colum flex-ai-c flex-jc-c'
			>
				<section>
					<h1 className='h2 text-center mb-16'>Login</h1>
					<LoginForm />
				</section>
			</main>
		</Public>
	);
}

export default LoginPage;
