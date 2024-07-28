import Protected from '@/components/auth/Protected.component';
import NewPostForm from '@/components/dashboard/NewPostForm.component';
import UserPostsList from '@/components/dashboard/UserPostsList.component';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'lamamia | Dashboard',
	description:
		'Explore your personal dashboard, where you will find your created posts and the possibility to add new ones. Connect with other creatives and share your ideas in this space dedicated to creativity',
};

function DashboardPage(): JSX.Element {
	return (
		<Protected>
			<main data-testid='dashboard-page'>
				<div className='container'>
					<div className='grid'>
						<div className='col-lg-8'>
							<UserPostsList />
						</div>
						<div className='col-lg-8'>
							<h1 className='h2 mb-16'>Add New Post</h1>
							<NewPostForm />
						</div>
					</div>
				</div>
			</main>
		</Protected>
	);
}

export default DashboardPage;
