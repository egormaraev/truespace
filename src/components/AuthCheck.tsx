'use client';

import { useSession } from 'next-auth/react';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect } from 'react';

interface AuthCheckProps {
  children: React.ReactNode;
  requireAuth?: boolean;
  requireAdmin?: boolean;
  redirectTo?: string;
}

const AuthCheck: React.FC<AuthCheckProps> = ({
  children,
  requireAuth = true,
  requireAdmin = false,
  redirectTo = '/auth/signin',
}) => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Если статус загрузки - ждем
    if (status === 'loading') return;

    // Если требуется аутентификация и пользователь не авторизован
    if (requireAuth && status === 'unauthenticated') {
      router.push(`${redirectTo}?callbackUrl=${pathname}`);
      return;
    }

    // Если требуется админ и пользователь не админ
    if (requireAdmin && (!session || session.user.role !== 'admin')) {
      router.push('/');
      return;
    }
  }, [status, session, requireAuth, requireAdmin, router, pathname, redirectTo]);

  // Пока статус загрузки - отображаем ничего или загрузку
  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  // Если требуется авторизация и пользователь не авторизован или требуется админ и пользователь не админ
  if (
    (requireAuth && status === 'unauthenticated') ||
    (requireAdmin && (!session || session.user.role !== 'admin'))
  ) {
    return null;
  }

  // Если всё в порядке, отображаем дочерние компоненты
  return <>{children}</>;
};

export default AuthCheck; 