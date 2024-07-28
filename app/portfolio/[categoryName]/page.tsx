import PortfolioCard from '@/components/portfolio/PortfolioCard.component';
import apiService from '@/services/api.service';
import { capitalize } from '@/utils';
import { notFound } from 'next/navigation';

interface IParams {
	params: {
		categoryName: string;
	};
}

export async function generateStaticParams() {
	const cats = await apiService.getPortfolioCategories({
		searchParams: {
			fields: 'name',
		},
	});

	return cats.map((c) => ({
		categoryName: c.name,
	}));
}

export async function generateMetadata({ params }: IParams) {
	const cat = await apiService.getPortfolioCategories({
		searchParams: {
			name: params.categoryName,
			fields: 'description',
		},
	});

	return {
		title: cat[0]
			? `lamamia | ${capitalize(params.categoryName)}`
			: 'lamamia',
		description: cat[0] ? cat[0].description : '',
	};
}

async function PortfolioDetailPage({ params }: IParams): Promise<JSX.Element> {
	// regenerate each 24hrs
	const works = await apiService.getPortfolioWorks(params.categoryName, {
		next: {
			revalidate: 86400,
		},
	});

	if (!works) return notFound();

	return (
		<main>
			<div className='container'>
				{!works.length ? (
					<p className='h1'>No works, yet</p>
				) : (
					<>
						<h1 className='h1'>Our Works</h1>
						<h3 className='h4 c-primary'>
							{capitalize(params.categoryName)}
						</h3>
						<ul>
							{works.map((w, idx) => (
								<PortfolioCard
									key={w.id}
									reverse={idx % 2 === 0 ? false : true}
									{...w}
								/>
							))}
						</ul>
					</>
				)}
			</div>
		</main>
	);
}

export default PortfolioDetailPage;
