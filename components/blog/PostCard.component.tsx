import { IPost } from '@/types/custom.types';
import Image from 'next/image';
import Link from 'next/link';

function PostCard({ id, title, description, image }: IPost) {
	const imgUrl = image.startsWith('http') ? image : `/images/${image}`;

	return (
		<li data-testid='blog-post'>
			<Link
				href={`/blog/${id}`}
				className='grid'
			>
				<div className='col-lg-5'>
					<Image
						src={imgUrl}
						alt=''
						width={360}
						height={360}
					/>
				</div>
				<div className='col-lg-11 flex flex-column flex-jc-c text-justify'>
					<h3 className='h3 mb-8'>{title}</h3>
					<p>{description}</p>
				</div>
			</Link>
		</li>
	);
}

export default PostCard;
