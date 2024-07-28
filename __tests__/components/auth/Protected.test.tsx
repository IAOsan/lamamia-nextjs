import { authenticatedSessionMock, navigationMock, nextAuthMock, unauthenticatedSessionMock, useRouterMock } from "@/__tests__/fixtures";
import Protected from "@/components/auth/Protected.component";
import { render, screen } from "@testing-library/react";
import { useSession } from "next-auth/react";
import { Mock, describe, expect, it, vi } from "vitest";

////////////////
// MOCKS
////////////////
vi.mock('next-auth/react', () => nextAuthMock);
vi.mock('next/navigation', () => navigationMock);
////////////////

function setup() {
    return render(<Protected>
        <p>children</p>
    </Protected>)
}

describe('<Protected />', () => {
    it('should call router.replace(/dashboard/login) if you are not authenticated', () => {
        (useSession as Mock).mockReturnValueOnce(unauthenticatedSessionMock);
        setup();

        expect(useRouterMock.replace).toHaveBeenCalledWith('/dashboard/login');
    })
    it('should display the children if you are authenticated', () => {
        (useSession as Mock).mockReturnValueOnce(authenticatedSessionMock);
        setup();

        expect(screen.queryByText('children')).toBeInTheDocument();
    })
    it('should display the loader state if the status is not authenticated and unauthenticated', () => {
			setup();

			expect(screen.queryByText('Hang on there...')).toBeInTheDocument();
		});
})