import Icon from '@/components/common/Icon.component';
import apiService from '@/services/api.service';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import styles from '../blog.styles.module.css';

interface IParams {
	params: {
		postId: string;
	};
}

async function BlogPostPage({ params }: IParams) {
	const post = await apiService.getPostById(params.postId, {
		searchParams: {
			embed: 'user',
		},
	});

	if (!post) notFound();

	const imgUrl = post.image.startsWith('http')
		? post.image
		: `/images/${post.image}`;

	return (
		<main>
			<div className='container'>
				<div className='grid'>
					<div className='col-lg-8'>
						<h1 className='h2 mb-16'>{post.title}</h1>
						<p className='text-justify mb-8'>{post.description}</p>
						<div className='flex flex-ai-c'>
							<Icon
								className='c-dark-300 mr-8'
								name='profile'
								size='2x'
							/>
							<span>{post.user?.username || ''}</span>
						</div>
					</div>
					<div className='col-lg-8'>
						<div className={styles.postDetailImageWrapper}>
							<Image
								src={imgUrl}
								alt=''
								fill
							/>
						</div>
					</div>
					<div className='col-lg-16'>
						<p className='text-justify'>{post.content}</p>
					</div>
				</div>
			</div>
		</main>
	);
}

export default BlogPostPage;
