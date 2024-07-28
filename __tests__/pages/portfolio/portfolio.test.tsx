import { describe, expect, it } from 'vitest';
import PortfolioPage from '../../../app/portfolio/page';
import { render, screen } from '../../testsUtils';

const $illustrationsLink = () =>
	screen.queryByRole('link', { name: 'Illustrations' });
const $websitesLink = () => screen.queryByRole('link', { name: 'Webpages' });
const $appsLink = () => screen.queryByRole('link', { name: 'Apps' });

async function setup() {
	// return render(<PortfolioPage />, { wrapper: Layout });
	// return render(Layout({ children: await PortfolioPage() }));
	return render(await PortfolioPage());
}

describe('<PortfolioPage />', () => {
	describe('Layout', () => {
		it('should display the title', async () => {
			await setup();

			expect(screen.queryByText('Our Works')).toBeInTheDocument();
		});
		it('should display the sub-title', async () => {
			await setup();

			expect(screen.queryByText('Choose a gallery')).toBeInTheDocument();
		});
		it('should display the works links', async () => {
			await setup();

			expect($illustrationsLink()).toBeInTheDocument();
			expect($websitesLink()).toBeInTheDocument();
			expect($appsLink()).toBeInTheDocument();
		});
		it('should each work link has an image', async () => {
			await setup();

			expect($illustrationsLink()?.querySelector('img')).toBeInTheDocument();
			expect($websitesLink()?.querySelector('img')).toBeInTheDocument();
			expect($appsLink()?.querySelector('img')).toBeInTheDocument();
		});
		it('should each work link has the correct attributes', async () => {
			await setup();

			expect($illustrationsLink()).toHaveAttribute(
				'href',
				'/portfolio/illustrations'
			);
			expect($websitesLink()).toHaveAttribute('href', '/portfolio/webpages');
			expect($appsLink()).toHaveAttribute('href', '/portfolio/apps');
		});
	});
});
