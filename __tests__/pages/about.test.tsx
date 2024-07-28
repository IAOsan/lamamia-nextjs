import { describe, expect, it } from 'vitest';
import AboutPage from '../../app/about/page';
import { render, screen } from '../testsUtils';

function renderPage() {
	return render(<AboutPage />);
}

describe('<AboutPage />', () => {
	describe('Layout', () => {
		it('should display the hero image', () => {
			renderPage();

			expect(
				screen.queryByTestId('about-hero')?.querySelector('img')
			).toBeInTheDocument();
		});
		it('should display the hero copy', () => {
			renderPage();

			expect(screen.queryByText('Digital Storytellers')).toBeInTheDocument();
			expect(
				screen.queryByText('Handcrafting award winning digital experiences')
			).toBeInTheDocument();
		});
		it('should display about us title', () => {
			renderPage();

			expect(screen.queryByText('Who Are We?')).toBeInTheDocument();
		});
		it('should display about us description', () => {
			const expectedP1 =
				'Digital agency, where creativity, innovation, and cutting-edge technology converge to redefine digital experiences.';
			const expectedP2 =
				"As a leading digital agency, we are passionate about crafting impactful strategies, designing captivating visuals, and developing robust solutions that help businesses thrive in the digital realm. Our team of dedicated professionals is committed to delivering exceptional results that exceed our clients' expectations.";
			const expectedP3 =
				'Our mission is to empower businesses by leveraging the power of digital platforms. We believe that every brand has a unique story to tell, and our purpose is to help them tell it effectively through innovative and strategic digital solutions.';

			renderPage();

			expect(screen.queryByText(expectedP1)).toBeInTheDocument();
			expect(screen.queryByText(expectedP2)).toBeInTheDocument();
			expect(screen.queryByText(expectedP3)).toBeInTheDocument();
		});
		it('should display what we do title', () => {
			renderPage();

			expect(screen.queryByText('What We Do?')).toBeInTheDocument();
		});
		it('should display what we do description', () => {
			const expectedP =
				'We understand that a strong brand identity is the foundation of success in the digital landscape. Our team of creative strategists excels in developing brand strategies that resonate with your target audience. From logo design to brand messaging, we craft cohesive and compelling narratives that set your brand apart.';

			renderPage();

			expect(screen.queryByText(expectedP)).toBeInTheDocument();
			expect(
				screen.queryByText('Creative Illustrations')
			).toBeInTheDocument();
			expect(screen.queryByText('Dynamic Websites')).toBeInTheDocument();
			expect(
				screen.queryByText('Fast and Handy Mobile Apps')
			).toBeInTheDocument();
		});
		it('should display contact link', () => {
			renderPage();

			expect(
				screen.queryByRole('link', { name: 'Contact' })
			).toBeInTheDocument();
		});
		it('should has the correct attributes the contact link', () => {
			renderPage();

			expect(
				screen.queryByRole('link', { name: 'Contact' })
			).toHaveAttribute('href', '/contact');
		});
	});
});
