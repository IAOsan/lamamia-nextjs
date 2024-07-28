import { IPortfolioWork } from '@/types/custom.types';
import Image from 'next/image';
import Link from 'next/link';
import styles from './PortfolioCard.styles.module.css';

interface IProps extends IPortfolioWork {
	reverse?: boolean;
}

function PortfolioCard({
	title,
	description,
	image,
	reverse,
}: IProps): JSX.Element {
	return (
		<li
			data-testid='portfolio-card'
			className={`grid ${reverse ? 'flex-row-reverse' : ''}`}
		>
			<div className='col-lg-8 flex flex-column flex-jc-c'>
				<h3 className='h3 mb-16'>{title}</h3>
				<p className='mb-16 text-justify'>{description}</p>
				<Link
					href='/'
					className={`button button--primary ${styles.button}`}
				>
					SEE MORE
				</Link>
			</div>
			<div className='col-lg-8'>
				<Image
					src={`/images/${image}`}
					alt=''
					width={600}
					height={600}
				/>
			</div>
		</li>
	);
}

export default PortfolioCard;
