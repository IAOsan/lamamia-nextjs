import Link from 'next/link';
import Icon from '../common/Icon.component';
import styles from './Footer.styles.module.css';

function Footer(): JSX.Element {
	return (
		<footer className={styles.wrapper}>
			<div className='container flex flex-jc-sb'>
				<p>{new Date().getFullYear()} | lamamia. All rights reserved</p>
				<ul className='flex flex-jc-sb'>
					<li className='mr-8'>
						<Link href='/facebook.com'>
							<Icon name='facebook' />
						</Link>
					</li>
					<li className='mr-8'>
						<Link href='/instagram.com'>
							<Icon name='instagram' />
						</Link>
					</li>
					<li className='mr-8'>
						<Link href='/x.com'>
							<Icon name='x' />
						</Link>
					</li>
					<li>
						<Link href='/youtube.com'>
							<Icon name='youtube' />
						</Link>
					</li>
				</ul>
			</div>
		</footer>
	);
}

export default Footer;
