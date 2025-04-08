import { NextAuthOptions } from 'next-auth';
import NextAuth from 'next-auth/next';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';
import dbConnect from '@/lib/mongodb';
import User, { UserDocument } from '@/models/User';

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Требуется email и пароль');
        }

        await dbConnect();

        // Найти пользователя по email и явно указать тип результата
        const user: UserDocument | null = await User.findOne({ email: credentials.email }).select('+password');
        
        if (!user) {
          throw new Error('Неверный email или пароль');
        }
        
        // Проверить пароль
        const isPasswordCorrect = await bcrypt.compare(credentials.password, user.password);
        
        if (!isPasswordCorrect) {
          throw new Error('Неверный email или пароль');
        }
        
        return {
          id: user._id.toString(), // Теперь тип user известен
          name: user.name,
          email: user.email,
          image: user.image,
          role: user.role,
          promoCodes: user.promoCodes || [],
        };
      },
    }),
  ],
  pages: {
    signIn: '/auth/signin',
    signOut: '/auth/signout',
    error: '/auth/error',
  },
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 дней
  },
  jwt: {
    secret: process.env.JWT_SECRET,
    maxAge: 30 * 24 * 60 * 60, // 30 дней
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.promoCodes = user.promoCodes as string[] | undefined;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string;
        session.user.role = token.role as string;
        session.user.promoCodes = (token.promoCodes as string[]) || [];
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST }; 