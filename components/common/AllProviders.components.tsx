'use client';

import NotificationContextProvider from '@/context/Notification.context';
import PostsContextProvider from '@/context/Posts.context';
import { SessionProvider } from 'next-auth/react';

interface IProps {
	children: React.ReactNode;
}

function AllProviders({ children }: IProps): JSX.Element {
	return (
		<SessionProvider>
			<NotificationContextProvider>
				<PostsContextProvider>{children}</PostsContextProvider>
			</NotificationContextProvider>
		</SessionProvider>
	);
}

export default AllProviders;
