import PortfolioCard from '@/components/portfolio/PortfolioCard.component';
import apiService from '@/services/api.service';
import { capitalize } from '@/utils';
import { notFound } from 'next/navigation';

interface IParams {
	params: {
		categoryName: string;
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
