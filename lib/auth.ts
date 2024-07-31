import { SALT_HASH_ROUNDS } from '@/config';
import bcrypt from 'bcrypt';

export async function hashPassword(password: string): Promise<string> {
	return await bcrypt.hash(password, SALT_HASH_ROUNDS);
}

export async function verifyPassword(
	password: string,
	hashedPassword: string
): Promise<boolean> {
	return await bcrypt.compare(password, hashedPassword);
}
