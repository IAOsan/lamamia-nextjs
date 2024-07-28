import { APIFeatures, loadDB } from '@/lib';
import { IPost } from '@/types/custom.types';
import { JSONresponse } from '@/utils';
import { nanoid } from 'nanoid';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
	const searchParams = req.nextUrl.searchParams;
	try {
		const db = await loadDB();
		const features = await new APIFeatures(db, db.data.posts)
			.limit(searchParams)
			.sort(searchParams)
			.limiter(searchParams);

		return NextResponse.json(JSONresponse.success(features.data));
	} catch (error) {
		return NextResponse.json(JSONresponse.error({ reason: error }), {
			status: 500,
		});
	}
}

export async function POST(req: NextRequest) {
	const { title, description, image, content, userId } = await req.json();
	const newPost: IPost = {
		id: nanoid(),
		title,
		description,
		image,
		content,
		userId,
		createdAt: new Date().toISOString(),
	};

	try {
		const db = await loadDB();

		await db.update(({ posts }) => posts.push(newPost));

		return NextResponse.json(JSONresponse.success(newPost));
	} catch (error) {
		return NextResponse.json(JSONresponse.error({ reason: error }), {
			status: 500,
		});
	}
}
