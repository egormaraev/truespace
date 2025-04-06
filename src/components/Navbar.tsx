'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { FiMenu, FiX } from 'react-icons/fi';
import { FaUserCircle } from 'react-icons/fa';
import { useSession, signOut } from 'next-auth/react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const { data: session } = useSession();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Главная', href: '/' },
    { name: 'Курсы', href: '/courses' },
    { name: 'О нас', href: '/about' },
  ];

  const handleLogout = async () => {
    await signOut();
  };

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled || isOpen ? 'glass-effect shadow-lg' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 md:px-6 py-3">
        <div className="flex items-center justify-between">
          <Link 
            href="/" 
            className="flex items-center space-x-2"
          >
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
              TrueSpace
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-base font-medium transition-all duration-300 ${
                  pathname === link.href
                    ? 'text-blue-400'
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {session ? (
              <div className="relative group">
                <button className="flex items-center space-x-2 text-gray-300 hover:text-white transition-all duration-300">
                  <FaUserCircle className="text-xl" />
                  <span>{session.user?.name}</span>
                </button>
                <div className="absolute right-0 top-full mt-2 w-48 rounded-md shadow-lg glass-effect z-10 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                  <div className="py-1">
                    <Link 
                      href="/profile" 
                      className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-800 hover:text-white transition-colors"
                    >
                      Профиль
                    </Link>
                    <Link 
                      href="/dashboard" 
                      className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-800 hover:text-white transition-colors"
                    >
                      Мои курсы
                    </Link>
                    {session.user?.role === 'admin' && (
                      <Link 
                        href="/admin" 
                        className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-800 hover:text-white transition-colors"
                      >
                        Панель администратора
                      </Link>
                    )}
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-800 hover:text-white transition-colors"
                    >
                      Выйти
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <>
                <Link
                  href="/auth/signin"
                  className="text-sm font-medium text-gray-300 hover:text-white transition-all duration-300"
                >
                  Вход
                </Link>
                <Link
                  href="/auth/signup"
                  className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md transition-colors duration-300"
                >
                  Регистрация
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-2xl text-gray-300 hover:text-white transition-colors"
            >
              {isOpen ? <FiX /> : <FiMenu />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="md:hidden glass-effect"
        >
          <div className="px-4 pt-2 pb-5 space-y-3">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`block py-2 text-base font-medium ${
                  pathname === link.href
                    ? 'text-blue-400'
                    : 'text-gray-300 hover:text-white'
                }`}
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <div className="pt-4 border-t border-gray-700">
              {session ? (
                <>
                  <Link
                    href="/profile"
                    className="block py-2 text-base font-medium text-gray-300 hover:text-white"
                    onClick={() => setIsOpen(false)}
                  >
                    Профиль
                  </Link>
                  <Link
                    href="/dashboard"
                    className="block py-2 text-base font-medium text-gray-300 hover:text-white"
                    onClick={() => setIsOpen(false)}
                  >
                    Мои курсы
                  </Link>
                  {session.user?.role === 'admin' && (
                    <Link
                      href="/admin"
                      className="block py-2 text-base font-medium text-gray-300 hover:text-white"
                      onClick={() => setIsOpen(false)}
                    >
                      Панель администратора
                    </Link>
                  )}
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsOpen(false);
                    }}
                    className="block w-full text-left py-2 text-base font-medium text-gray-300 hover:text-white"
                  >
                    Выйти
                  </button>
                </>
              ) : (
                <div className="flex flex-col space-y-3">
                  <Link
                    href="/auth/signin"
                    className="block py-2 text-base font-medium text-gray-300 hover:text-white"
                    onClick={() => setIsOpen(false)}
                  >
                    Вход
                  </Link>
                  <Link
                    href="/auth/signup"
                    className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md text-center transition-colors duration-300"
                    onClick={() => setIsOpen(false)}
                  >
                    Регистрация
                  </Link>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </nav>
  );
};

export default Navbar; 