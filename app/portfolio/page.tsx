import apiService from '@/services/api.service';
import { capitalize } from '@/utils';
import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import styles from './portfolio.styles.module.css';

export const metadata: Metadata = {
	title: 'lamamia | Portfolio',
	description: 'You can view all portfolio categories',
};

async function PortfolioPage(): Promise<JSX.Element> {
	// revalidate each 7days
	const data = await apiService.getPortfolioCategories({
		searchParams: {
			fields: 'name',
		},
		next: {
			revalidate: 604800,
		},
	});

	return (
		<main>
			<div className='container'>
				<h1 className='h1'>Our Works</h1>
				<p className='h4'>Choose a gallery</p>
				<ul className='grid flex-jc-sb'>
					{data.map((c) => (
						<li
							key={c.id}
							className='col-lg-5'
						>
							<Link
								href={`/portfolio/${c.name}`}
								className={styles.link}
							>
								<Image
									src={`/images/portfolio-${c.name}.jpeg`}
									alt=''
									width={600}
									height={600}
									className={styles.image}
								/>
								<b className={`h3 ${styles.linkTag}`}>
									{capitalize(c.name)}
								</b>
							</Link>
						</li>
					))}
				</ul>
			</div>
		</main>
	);
}

export default PortfolioPage;
