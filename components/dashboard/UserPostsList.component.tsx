'use client';

import { usePostsContext } from '@/context/Posts.context';
import UserPostCard from './UserPostCard.component';
import styles from './UserPostsList.styles.module.css';

function UserPostsList(): JSX.Element {
	const { data, status, handleRemovePost } = usePostsContext();

	if (status === 'loading') {
		return <p>Loading...</p>;
	}

	if (!data.length) {
		return (
			<div className='h-100 flex flex-column flex-jc-c text-center c-dark-300'>
				<p className='h2'>
					<b>No posts yet</b>
				</p>
				<p className='h5'>The posts you create will appear here</p>
			</div>
		);
	}

	return (
		<ul className={styles.wrapper}>
			{data.map((p, idx) => (
				<UserPostCard
					key={idx}
					onDelete={handleRemovePost}
					{...p}
				/>
			))}
		</ul>
	);
}

export default UserPostsList;
