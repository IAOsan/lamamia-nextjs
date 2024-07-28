import { render, screen } from '@/__tests__/testsUtils';
import UserPostCard from '@/components/dashboard/UserPostCard.component';
import { IPost } from '@/types/custom.types';
import { describe, expect, it } from 'vitest';

const data: IPost = {
	id: 1,
	username: 'unknown',
	createdAt: new Date().toISOString(),
	title: 'p1',
	description: 'Description',
	image: 'https://placehold.co/600x400',
	content: 'Content',
};

function renderComponent() {
	return render(
		<UserPostCard
			{...data}
			onDelete={() => {}}
		/>
	);
}

describe('<UserPostCard />', () => {
	describe('Layout', () => {
		it('should display the post image', () => {
			renderComponent();

			expect(document.querySelector('img')).toBeInTheDocument();
		});
		it('should display the title', () => {
			renderComponent();

			expect(screen.queryByText(data.title)).toBeInTheDocument();
		});
		it('should display the delete button', () => {
			renderComponent();

			expect(screen.queryByTestId('delete-button')).toBeInTheDocument();
		});
		it('should be of type button the delete button', () => {
			renderComponent();

			expect(screen.queryByTestId('delete-button')).toHaveProperty(
				'type',
				'button'
			);
		});
	});
});
