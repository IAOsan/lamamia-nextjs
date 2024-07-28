import { loadDB } from '@/lib';
import { JSONresponse } from '@/utils';
import { NextResponse } from 'next/server';

export async function GET() {
	try {
		const db = await loadDB();
		const data = {
			categories: db.data.portfolioCategories,
			works: db.data.portfolioWorks,
		};

		return NextResponse.json(JSONresponse.success(data));
	} catch (error) {
		return NextResponse.json(JSONresponse.error({ reason: error }), {
			status: 500,
		});
	}
}
