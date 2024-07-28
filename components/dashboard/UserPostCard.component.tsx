import { IPost, PostIdType } from '@/types/custom.types';
import Image from 'next/image';
import Icon from '../common/Icon.component';

interface IProps extends IPost {
	onDelete: (postId: PostIdType) => Promise<void>;
}

function UserPostCard({ id, image, title, onDelete }: IProps): JSX.Element {
	const imgUrl = image.startsWith('http') ? image : `/images/${image}`;

	return (
		<li
			className='grid'
			data-testid='user-post-card'
		>
			<div className='col-lg-4'>
				<Image
					src={imgUrl}
					alt=''
					width={480}
					height={360}
				/>
			</div>
			<div className='col-lg-12 flex flex-ai-c flex-jc-sb'>
				<h3 className='h5 mr-16'>{title}</h3>
				<button
					onClick={() => onDelete(id)}
					className='button button--sm button--danger'
					data-testid='delete-button'
					type='button'
				>
					<Icon
						name='close'
						inline
					/>
				</button>
			</div>
		</li>
	);
}

export default UserPostCard;
