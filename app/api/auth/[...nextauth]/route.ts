import { loadDB } from '@/lib';
import { IUser } from '@/types/custom.types';
import bcrypt from 'bcrypt';
import NextAuth, { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

const authOpts: NextAuthOptions = {
	secret: process.env.NEXTAUTH_SECRET,
	providers: [
		CredentialsProvider({
			id: 'credentials',
			name: 'Credentials',
			credentials: {},
			async authorize(credentials) {
				const { email, password } = credentials as IUser;
				const db = await loadDB();
				const user: IUser | undefined = db.data.users.find(
					(u) => u.email === email
				);
				if (!user) throw new Error('Credentials are invalid');
				const isValidPassword = await bcrypt.compare(
					password,
					user.password
				);
				if (!isValidPassword) throw new Error('Credentials are invalid');
				return {
					id: user.id,
					username: user.username,
					email: user.email,
				} as any;
			},
		}),
	],
	pages: {
		error: '/dashboard/login',
		signIn: '/dashboard/login',
	},
	callbacks: {
		jwt: async ({ token, user }) => {
			if (user) {
				token.user = user;
			}
			return token;
		},
		session: ({ session, token }) => {
			if (token.user) {
				session.user = token.user as IUser;
			}
			return session;
		},
	},
};

const handler = NextAuth(authOpts);

export { handler as GET, handler as POST };
