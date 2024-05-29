import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { sql } from '@vercel/postgres';
import { v4 as uuidv4 } from 'uuid';

export const {
    auth,
    handlers: { GET, POST }
} = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET
        })
    ],
    callbacks: {
        async signIn({ user, account, profile }) {
            let users = await sql`
        SELECT * FROM public."User" WHERE email = ${user.email}
      `;

            if (users.rows.length === 0) {
                await sql`
          INSERT INTO public."User" (id, email, name, image)
          VALUES (${uuidv4()}, ${user.email}, ${user.name}, ${user.image})
        `;
                users = await sql`
          SELECT * FROM public."User" WHERE email = ${user.email}
        `;
            }

            user.id = users.rows[0].id;
            return true;
        },
        async session({ session, token }) {
            session.user.id = token.uid;
            return session;
        },
        async jwt({ token, user }) {
            if (user) {
                token.uid = user.id;
            }
            return token;
        },
        async authorized({ auth, request: { nextUrl } }) {
            const isLoggedIn = !!auth?.user;
            const isOnDashboard = !nextUrl.pathname.includes('auth');
            if (isOnDashboard) {
                return isLoggedIn;
            } else if (isLoggedIn) {
                return Response.redirect(new URL('/', nextUrl));
            }
        }
    },
    secret: process.env.AUTH_SECRET
});
