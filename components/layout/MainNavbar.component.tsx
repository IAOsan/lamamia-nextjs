'use client';

import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './MainNavbar.styles.module.css';

const menu: Array<{ label: string; path: string }> = [
	{
		label: 'Home',
		path: '/',
	},
	{
		label: 'Portfolio',
		path: '/portfolio',
	},
	{
		label: 'Blog',
		path: '/blog',
	},
	{
		label: 'About',
		path: '/about',
	},
	{
		label: 'Contact',
		path: '/contact',
	},
	{
		label: 'Dashboard',
		path: '/dashboard',
	},
];

function MainNavbar() {
	const pathname = usePathname();
	const { status } = useSession();

	function isActiveLink(path: string): boolean {
		return pathname === path || (pathname || '').includes(`${path}/`);
	}

	return (
		<nav className={`flex flex-ai-c flex-jc-sb ${styles.wrapper}`}>
			<Link href='/'>
				<b>lamamia</b>
			</Link>
			<ul className={styles.menu}>
				{menu.map((l) => (
					<li
						key={l.path}
						className={styles.item}
					>
						<Link
							href={l.path}
							className={
								isActiveLink(l.path) ? styles.activeLink : styles.link
							}
						>
							{l.label}
						</Link>
					</li>
				))}
				{status === 'authenticated' && (
					<li className={styles.item}>
						<button
							onClick={() => signOut()}
							data-testid='logout-btn'
							className='button button--primary button--sm'
							type='button'
						>
							Logout
						</button>
					</li>
				)}
			</ul>
		</nav>
	);
}

export default MainNavbar;
