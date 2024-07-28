import { loadDB } from '@/lib';
import { JSONresponse } from '@/utils';
import { NextResponse } from 'next/server';

export async function GET() {
	try {
		const db = await loadDB();
		return NextResponse.json(JSONresponse.success(db.data.portfolioWorks));
	} catch (error) {
		return NextResponse.json(JSONresponse.error({ reason: error }), {
			status: 500,
		});
	}
}
