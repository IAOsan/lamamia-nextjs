import Public from '@/components/auth/Public.component';
import RegisterForm from '@/components/auth/RegisterForm.component';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'lamamia | Register',
	description: 'Log in or create an account on lamamia to access your content',
};

function RegisterPage(): JSX.Element {
	return (
		<Public>
			<main
				data-testid='register-page'
				className='flex flex-column flex-ai-c flex-jc-c'
			>
				<section>
					<h1 className='h2 text-center mb-16'>Sign Up</h1>
					<RegisterForm />
				</section>
			</main>
		</Public>
	);
}

export default RegisterPage;
