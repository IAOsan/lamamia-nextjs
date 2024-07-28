import { APIFeatures, loadDB } from '@/lib';
import { JSONresponse } from '@/utils';
import { NextRequest, NextResponse } from 'next/server';

interface IParams {
	params: {
		userId: string;
	};
}

export async function GET(req: NextRequest, { params: { userId } }: IParams) {
	const searchParams = req.nextUrl.searchParams;
	try {
		const db = await loadDB();
		const user = db.data.users.find((u) => u.id === userId);

		if (!user) {
			return NextResponse.json(
				JSONresponse.error({ statusCode: 404, message: 'User not found' }),
				{ status: 404 }
			);
		}

		const posts = db.data.posts.filter((p) => p.userId === userId);
		const features = new APIFeatures(db, posts)
			.sort(searchParams)
			.limiter(searchParams);

		return NextResponse.json(JSONresponse.success(features.data));
	} catch (error) {
		return NextResponse.json(JSONresponse.error({ reason: error }), {
			status: 500,
		});
	}
}
