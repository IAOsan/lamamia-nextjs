import { portfolioCategories, portfolioWorks } from '@/__tests__/fixtures';
import SlugPage from '@/app/portfolio/[categoryName]/page';
import { describe, expect, it } from 'vitest';
import { render, screen } from '../../../testsUtils';

const works: Array<string> = ['illustrations', 'webpages', 'apps'];
const expectedIllustrationsWorks = portfolioWorks.filter((w) => {
	const cat = portfolioCategories.find((c) => c.name === works[0]);
	return w.categoryId === cat?.id;
});
const expectedWebpagesWorks = portfolioWorks.filter((w) => {
	const cat = portfolioCategories.find((c) => c.name === works[1]);
	return w.categoryId === cat?.id;
});
const expectedAppsWorks = portfolioWorks.filter((w) => {
	const cat = portfolioCategories.find((c) => c.name === works[2]);
	return w.categoryId === cat?.id;
});

async function setup(param: string) {
	// return render(<SlugPage params={{ slug: param }} />, { wrapper: Layout });
	// return render(
	// 	Layout({ children: await SlugPage({ params: { categoryName: param } }) })
	// );
	return render(await SlugPage({ params: { categoryName: param } }));
}

describe('<PortfolioSlugPage />', () => {
	describe('Layout', () => {
		it('should display the title', async () => {
			await setup(works[0]);

			expect(screen.queryByText('Our Works')).toBeInTheDocument();
		});
		it('should display a message if there are no works', () => {
			setup('random');

			expect(screen.queryByText('No works, yet'));
		});
		describe('Illustrations', () => {
			const category = works[0];
			it('should display the category name', async () => {
				await setup(category);

				expect(
					screen.queryByRole('heading', { name: 'Illustrations' })
				).toBeInTheDocument();
			});
			it('should display the list of works', async () => {
				await setup(category);

				expect(
					screen.queryByText(expectedIllustrationsWorks[0].title)
				).toBeInTheDocument();
				expect(
					screen.queryByText(expectedIllustrationsWorks[0].description)
				).toBeInTheDocument();
				expect(
					screen.queryByText(expectedIllustrationsWorks[1].title)
				).toBeInTheDocument();
				expect(
					screen.queryByText(expectedIllustrationsWorks[1].description)
				).toBeInTheDocument();
				expect(
					screen.queryByText(expectedIllustrationsWorks[2].title)
				).toBeInTheDocument();
				expect(
					screen.queryByText(expectedIllustrationsWorks[2].description)
				).toBeInTheDocument();
			});
			it('should each element of the list has the corresponding link', async () => {
				await setup(category);

				expect(
					screen.queryAllByRole('link', { name: 'SEE MORE' })
				).toHaveLength(3);
			});
			it('should each element of the list has an image', async () => {
				await setup(category);

				expect(
					screen
						.queryAllByTestId('portfolio-card')
						.every((e) => e.querySelector('img') !== null)
				).toBeTruthy();
			});
		});
		describe('Webpages', () => {
			const category = works[1];
			it('should display the category name', async () => {
				await setup(category);

				expect(
					screen.queryByRole('heading', { name: 'Webpages' })
				).toBeInTheDocument();
			});
			it('should display the list of works', async () => {
				await setup(category);

				expect(
					screen.queryByText(expectedWebpagesWorks[0].title)
				).toBeInTheDocument();
				expect(
					screen.queryByText(expectedWebpagesWorks[0].description)
				).toBeInTheDocument();
				expect(
					screen.queryByText(expectedWebpagesWorks[1].title)
				).toBeInTheDocument();
				expect(
					screen.queryByText(expectedWebpagesWorks[1].title)
				).toBeInTheDocument();
				expect(
					screen.queryByText(expectedWebpagesWorks[2].description)
				).toBeInTheDocument();
				expect(
					screen.queryByText(expectedWebpagesWorks[2].description)
				).toBeInTheDocument();
			});
			it('should each element of the list has the corresponding link', async () => {
				await setup(category);

				expect(
					screen.queryAllByRole('link', { name: 'SEE MORE' })
				).toHaveLength(3);
			});
			it('should each element of the list has an image', async () => {
				await setup(category);

				expect(
					screen
						.queryAllByTestId('portfolio-card')
						.every((e) => e.querySelector('img') !== null)
				).toBeTruthy();
			});
		});
		describe('Apps', () => {
			const category = works[2];
			it('should display the category name', async () => {
				await setup(category);

				expect(
					screen.queryByRole('heading', { name: 'Apps' })
				).toBeInTheDocument();
			});
			it('should display the list of works', async () => {
				await setup(category);

				expect(
					screen.queryByText(expectedAppsWorks[0].title)
				).toBeInTheDocument();
				expect(
					screen.queryByText(expectedAppsWorks[0].description)
				).toBeInTheDocument();
				expect(
					screen.queryByText(expectedAppsWorks[1].title)
				).toBeInTheDocument();
				expect(
					screen.queryByText(expectedAppsWorks[1].title)
				).toBeInTheDocument();
				expect(
					screen.queryByText(expectedAppsWorks[2].description)
				).toBeInTheDocument();
				expect(
					screen.queryByText(expectedAppsWorks[2].description)
				).toBeInTheDocument();
			});
			it('should each element of the list has the corresponding link', async () => {
				await setup(category);

				expect(
					screen.queryAllByRole('link', { name: 'SEE MORE' })
				).toHaveLength(3);
			});
			it('should each element of the list has an image', async () => {
				await setup(category);

				expect(
					screen
						.queryAllByTestId('portfolio-card')
						.every((e) => e.querySelector('img') !== null)
				).toBeTruthy();
			});
		});
	});
});
