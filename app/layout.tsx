import AllProviders from '@/components/common/AllProviders.components';
import Notification from '@/components/common/Notification.component';
import Footer from '@/components/layout/Footer.component';
import MainHeader from '@/components/layout/MainHeader.component';
import type { Metadata } from 'next';
import { Roboto, Roboto_Condensed } from 'next/font/google';
import './globals.css';

const roboto_condensed_init = Roboto_Condensed({
	subsets: ['latin'],
	display: 'swap',
	variable: '--heading-font',
	weight: ['700', '900'],
});

const roboto_init = Roboto({
	subsets: ['latin'],
	display: 'swap',
	variable: '--body-font',
	weight: ['400'],
});

export const metadata: Metadata = {
	title: 'lamamia',
	description:
		'Explore a world of creativity in my personal portfolio. Discover featured projects, blog inspiration, and the chance to connect with others passionate about creativity',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang='en'>
			<body
				className={`${roboto_condensed_init.variable} ${roboto_init.variable}`}
			>
				<AllProviders>
					<MainHeader />
					{children}
					<Footer />
					<Notification />
				</AllProviders>
			</body>
		</html>
	);
}
