import { APIFeatures, loadDB } from '@/lib';
import { IPost } from '@/types/custom.types';
import { JSONresponse } from '@/utils';
import { NextRequest, NextResponse } from 'next/server';

interface IParams {
	params: {
		postId: string;
	};
}

export async function GET(req: NextRequest, { params: { postId } }: IParams) {
	const searchParams = req.nextUrl.searchParams;
	try {
		const db = await loadDB();
		const post = db.data.posts.filter((p) => p.id === postId);

		if (!post.length) {
			return NextResponse.json(
				JSONresponse.error({ statusCode: 404, message: 'Post not found' }),
				{ status: 404 }
			);
		}

		const features = new APIFeatures(db, post)
			.embedRelatedData(searchParams, 'id,username')
			.limiter(searchParams);

		return NextResponse.json(JSONresponse.success(features.data[0]));
	} catch (error) {
		return NextResponse.json(JSONresponse.error({ reason: error }), {
			status: 500,
		});
	}
}

export async function DELETE(_: NextRequest, { params: { postId } }: IParams) {
	try {
		let removedPost: IPost | undefined;
		const db = await loadDB();

		const filteredPosts = db.data.posts.filter((p) => {
			if (p.id.toString() === postId) removedPost = p;
			return p.id.toString() !== postId;
		});

		if (!removedPost) {
			return NextResponse.json(
				JSONresponse.error({ statusCode: 404, message: 'Post not found' }),
				{ status: 404 }
			);
		}

		db.data.posts = filteredPosts;
		await db.write();

		return NextResponse.json(
			JSONresponse.success({
				message: 'Post removed successfully',
				removedPost,
			})
		);
	} catch (error) {
		return NextResponse.json(JSONresponse.error({ reason: error }), {
			status: 500,
		});
	}
}
