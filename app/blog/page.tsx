import PostCard from '@/components/blog/PostCard.component';
import apiService from '@/services/api.service';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'lamamia | Blog',
	description:
		'Explore interesting articles on various topics on our blog. Find inspiration, practical advice and in-depth analysis to enrich your knowledge',
};

async function BlogPage(): Promise<JSX.Element> {
	// revalidate every 5mins
	const posts = await apiService.getPosts({
		next: {
			revalidate: 300,
		},
	});

	return (
		<main>
			<div className='container'>
				<ul>
					{posts.map((p) => (
						<PostCard
							key={p.id}
							{...p}
						/>
					))}
				</ul>
			</div>
		</main>
	);
}

export default BlogPage;
