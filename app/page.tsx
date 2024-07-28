import Image from 'next/image';
import Link from 'next/link';
import styles from './page.styles.module.css';

export default function HomePage() {
	return (
		<main className='flex flex-column flex-jc-c'>
			<div className='container'>
				<div className='grid'>
					<div className='col-lg-8'>
						<h1 className={`h1 font-xb lineheight-xs ${styles.copy}`}>
							Better design for your digital products
						</h1>
						<p className='h5 my-20'>
							Turning your idea into reality. We bring together the teams
							from the global tech industry
						</p>
						<Link
							href='/portfolio'
							className='button button--primary'
						>
							<b>See Our Works</b>
						</Link>
					</div>
					<div className='col-lg-8 flex flex-column flex-jc-c'>
						<Image
							src='/images/hero-home.svg'
							alt=''
							width={600}
							height={600}
						/>
					</div>
				</div>
			</div>
		</main>
	);
}
