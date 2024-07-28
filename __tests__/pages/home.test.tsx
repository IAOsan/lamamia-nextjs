import HomePage from '@/app/page';
import { describe, expect, it } from 'vitest';
import { render, screen } from '../testsUtils';

function renderComponent() {
	return render(<HomePage />);
}

describe('<HomePage />', () => {
	describe('Layout', () => {
		it('should display the title', () => {
			renderComponent();

			expect(
				screen.queryByText('Better design for your digital products')
			).toBeInTheDocument();
		});
		it('should display the description', () => {
			renderComponent();

			expect(
				screen.queryByText(
					'Turning your idea into reality. We bring together the teams from the global tech industry'
				)
			).toBeInTheDocument();
		});
		it('should display the link to all works', () => {
			renderComponent();

			expect(
				screen.queryByRole('link', { name: 'See Our Works' })
			).toBeInTheDocument();
		});
		it('should has the correct attributes the link to all works', () => {
			renderComponent();

			expect(
				screen.queryByRole('link', { name: 'See Our Works' })
			).toHaveAttribute('href', '/portfolio');
		});
		it('should display the image', () => {
			renderComponent();

			expect(document.querySelector('img')).toBeInTheDocument();
		});
	});
});
