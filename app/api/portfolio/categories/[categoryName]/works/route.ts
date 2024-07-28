import { loadDB } from '@/lib';
import { IPortfolioCategory } from '@/types/custom.types';
import { JSONresponse } from '@/utils';
import { NextRequest, NextResponse } from 'next/server';

interface IParams {
	params: {
		categoryName: string;
	};
}

export async function GET(
	_: NextRequest,
	{ params: { categoryName } }: IParams
) {
	try {
		const db = await loadDB();
		const normalizedCategory = categoryName.toLowerCase();
		const category: IPortfolioCategory | undefined =
			db.data.portfolioCategories.find((c) => c.name === normalizedCategory);

		if (!category) {
			return NextResponse.json(
				JSONresponse.error({
					statusCode: 404,
					message: 'Category not found',
				}),
				{ status: 404 }
			);
		}

		const works = db.data.portfolioWorks.filter(
			(w) => w.categoryId === category?.id
		);

		return NextResponse.json(JSONresponse.success(works));
	} catch (error) {
		return NextResponse.json(JSONresponse.error({ reason: error }), {
			status: 500,
		});
	}
}
