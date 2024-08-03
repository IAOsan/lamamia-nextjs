export const NEXTAUTH_SECRET = process.env.NEXTAUTH_SECRET;
export const SALT_HASH_ROUNDS = 12;
export const BASE_URL =
	process.env.NEXT_PUBLIC_BASE_URL ||
	(typeof window !== 'undefined' ? window.origin : undefined);
