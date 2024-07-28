import { loadDB } from '@/lib';
import { IUser } from '@/types/custom.types';
import { JSONresponse } from '@/utils';
import bcrypt from 'bcrypt';
import { nanoid } from 'nanoid';
import { NextRequest, NextResponse } from 'next/server';

const SALT_ROUNDS = 10;

export async function POST(request: NextRequest) {
	try {
		const db = await loadDB();
		const { username, email, password } = await request.json();

		if (db.data.users.find((u) => u.email === email)) {
			return NextResponse.json(
				JSONresponse.error({
					statusCode: 400,
					message: 'The user already exists',
				}),
				{ status: 400 }
			);
		}

		const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
		const newUser: IUser = {
			id: nanoid(),
			username,
			email,
			password: hashedPassword,
		};

		await db.update(({ users }) => users.push(newUser));

		return NextResponse.json(JSONresponse.success(newUser));
	} catch (error) {
		return NextResponse.json(JSONresponse.error({ reason: error }), {
			status: 500,
		});
	}
}
