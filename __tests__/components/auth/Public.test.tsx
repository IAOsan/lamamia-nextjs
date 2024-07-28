import {
	authenticatedSessionMock,
	navigationMock,
	nextAuthMock,
	unauthenticatedSessionMock,
	useRouterMock,
} from '@/__tests__/fixtures';
import { render, screen } from '@/__tests__/testsUtils';
import Public from '@/components/auth/Public.component';
import { useSession } from 'next-auth/react';
import { describe, expect, it, Mock, vi } from 'vitest';

// ////////////
// MOCKS
// ////////////
vi.mock('next-auth/react', () => nextAuthMock);
vi.mock('next/navigation', () => navigationMock);
// ////////////

function setup() {
	return render(
		<Public>
			<h1>children</h1>
		</Public>
	);
}

describe('<Public/>', () => {
	it('should call router.replace(/dashboard) if you are authenticated', () => {
		(useSession as Mock).mockReturnValueOnce(authenticatedSessionMock);
		setup();

		expect(useRouterMock.replace).toHaveBeenCalledWith('/dashboard');
	});
	it('should display the children if you are not authenticated', () => {
		(useSession as Mock).mockReturnValueOnce(unauthenticatedSessionMock);
		setup();

		expect(screen.queryByText('children')).toBeInTheDocument();
	});
	it('should display the loader state if the status is not authenticated and unauthenticated', () => {
		setup();

		expect(screen.queryByText('Hang on there...')).toBeInTheDocument();
	});
});
