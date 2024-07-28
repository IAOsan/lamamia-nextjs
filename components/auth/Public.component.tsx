'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React from 'react';

interface IProps {
	children: React.ReactNode;
}

function Public({ children }: IProps): React.ReactNode {
	const { status } = useSession();
	const router = useRouter();

	if (status === 'authenticated') {
		router.replace('/dashboard');
		return null;
	}

	if (status === 'unauthenticated') {
		return children;
	}

	return (
		<main className='flex flex-column flex-ai-c flex-jc-c'>
			<p className='h2 text-center'>Hang on there...</p>
		</main>
	);
}

export default Public;
