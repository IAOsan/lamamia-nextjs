import { notificationMock } from '@/__tests__/fixtures';
import { render, screen, setupUser, waitFor } from '@/__tests__/testsUtils';
import Notification from '@/components/common/Notification.component';
import { describe, expect, it, vi } from 'vitest';

// ///////////
// MOCKS
// ///////////
vi.mock('@/context/Notification.context', () => ({
	useNotificationContext: () => notificationMock,
}));
// ///////////

const user = setupUser();

function renderComponent() {
	return render(<Notification />);
}

describe('<Notification />', () => {
	it('should display the notification with correct title and message', () => {
		renderComponent();

		expect(screen.getByTestId('notification')).toBeInTheDocument();
		expect(screen.getByText(notificationMock.data.title)).toBeInTheDocument();
		expect(
			screen.getByText(notificationMock.data.message)
		).toBeInTheDocument();
	});
	it('should call hide function after n seconds automatically', async () => {
		renderComponent();

		await waitFor(() => expect(notificationMock.hide).toHaveBeenCalled());
	});
	it('should call the hide function when clicking on the notification', async () => {
		renderComponent();

		await user.click(screen.queryByTestId('notification')!);

		expect(notificationMock.hide).toHaveBeenCalled();
	});
});
