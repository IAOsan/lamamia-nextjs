import { describe, expect, it } from 'vitest';
import MainHeader from '../../../components/layout/MainHeader.component';
import { render, screen } from '../../testsUtils';

function renderComponent() {
	return render(<MainHeader />);
}

describe('<MainHeader />', () => {
	describe('Layout', () => {
		it('should display the logo', () => {
			renderComponent();

			expect(screen.queryByText(/lamamia/i)).toBeInTheDocument();
		});
		it('should display the navigation', () => {
			renderComponent();

			expect(
				screen.queryByRole('link', { name: 'Home' })
			).toBeInTheDocument();
			expect(
				screen.queryByRole('link', { name: 'Portfolio' })
			).toBeInTheDocument();
			expect(
				screen.queryByRole('link', { name: 'Blog' })
			).toBeInTheDocument();
			expect(
				screen.queryByRole('link', { name: 'About' })
			).toBeInTheDocument();
			expect(
				screen.queryByRole('link', { name: 'Contact' })
			).toBeInTheDocument();
			expect(
				screen.queryByRole('link', { name: 'Dashboard' })
			).toBeInTheDocument();
		});
		it('should each navigation link must have the correct attributes', () => {
			renderComponent();

			expect(screen.queryByRole('link', { name: 'Home' })).toHaveAttribute(
				'href',
				'/'
			);
			expect(
				screen.queryByRole('link', { name: 'Portfolio' })
			).toHaveAttribute('href', '/portfolio');
			expect(screen.queryByRole('link', { name: 'Blog' })).toHaveAttribute(
				'href',
				'/blog'
			);
			expect(screen.queryByRole('link', { name: 'About' })).toHaveAttribute(
				'href',
				'/about'
			);
			expect(
				screen.queryByRole('link', { name: 'Contact' })
			).toHaveAttribute('href', '/contact');
			expect(
				screen.queryByRole('link', { name: 'Dashboard' })
			).toHaveAttribute('href', '/dashboard');
		});
	});
});
