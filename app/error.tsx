'use client'; // Error components must be Client Components

import { useEffect } from 'react';

export default function Error({
	error,
	reset,
}: {
	error: Error & { digest?: string };
	reset: () => void;
}) {
	useEffect(() => {
		// Log the error to an error reporting service
		console.error(error);
	}, [error]);

	return (
		<main className='flex flex-column flex-ai-c flex-jc-c'>
			<h2>Something went wrong!</h2>
			<button
				onClick={
					// Attempt to recover by trying to re-render the segment
					() => reset()
				}
				className='button button--danger'
				type='button'
			>
				Try again
			</button>
		</main>
	);
}
