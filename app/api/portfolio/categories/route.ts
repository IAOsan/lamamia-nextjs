import { APIFeatures, loadDB } from '@/lib';
import { JSONresponse } from '@/utils';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
	const searchParams = req.nextUrl.searchParams;

	try {
		const db = await loadDB();
		const features = new APIFeatures(db, db.data.portfolioCategories)
			.filter(searchParams, ['id', 'name'])
			.limiter(searchParams);

		return NextResponse.json(JSONresponse.success(features.data));
	} catch (error) {
		return NextResponse.json(JSONresponse.error({ reason: error }), {
			status: 500,
		});
	}
}
