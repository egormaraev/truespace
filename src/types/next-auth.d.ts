import NextAuth, { DefaultSession } from 'next-auth';
import { JWT } from 'next-auth/jwt';

declare module 'next-auth' {
  /**
   * Расширение типа User для NextAuth
   */
  interface User {
    id: string;
    name: string;
    email: string;
    image?: string;
    role: string;
  }

  /**
   * Расширение типа Session для NextAuth
   */
  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
      role: string;
    } & DefaultSession['user'];
  }
}

declare module 'next-auth/jwt' {
  /**
   * Расширение типа JWT для NextAuth
   */
  interface JWT {
    id: string;
    role: string;
  }
} 