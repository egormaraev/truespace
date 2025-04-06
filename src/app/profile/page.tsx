'use client';

import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { FiUser, FiMail, FiEdit, FiHeart, FiBookmark, FiKey } from 'react-icons/fi';
import { motion } from 'framer-motion';
import AuthCheck from '@/components/AuthCheck';

const ProfilePage = () => {
  const { data: session } = useSession();
  const [activeTab, setActiveTab] = useState('profile');
  const [favoriteCourses, setFavoriteCourses] = useState([]);
  const [savedLessons, setSavedLessons] = useState([]);
  const [promoCodes, setPromoCodes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // На реальном проекте здесь будет запрос к API
        // для получения избранных курсов, сохраненных уроков и промо-кодов пользователя
        
        // Имитация задержки загрузки
        setTimeout(() => {
          setFavoriteCourses([]);
          setSavedLessons([]);
          setPromoCodes([]);
          setLoading(false);
        }, 1000);
      } catch (error) {
        console.error('Ошибка при получении данных пользователя:', error);
        setLoading(false);
      }
    };

    if (session) {
      fetchUserData();
    }
  }, [session]);

  if (!session) {
    return <AuthCheck>
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    </AuthCheck>;
  }

  const tabs = [
    {
      id: 'profile',
      label: 'Профиль',
      icon: <FiUser />,
    },
    {
      id: 'favorites',
      label: 'Избранное',
      icon: <FiHeart />,
    },
    {
      id: 'saved',
      label: 'Сохраненное',
      icon: <FiBookmark />,
    },
    {
      id: 'promocodes',
      label: 'Промо-коды',
      icon: <FiKey />,
    },
  ];

  return (
    <div className="container mx-auto px-4 py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-5xl mx-auto"
      >
        <h1 className="text-3xl font-bold mb-8 text-white">Личный кабинет</h1>

        <div className="card p-0 overflow-hidden">
          {/* Tabs */}
          <div className="flex border-b border-gray-700 overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center px-6 py-4 text-gray-300 hover:text-white transition-colors ${
                  activeTab === tab.id
                    ? 'text-blue-400 border-b-2 border-blue-400 bg-dark-300'
                    : ''
                }`}
              >
                <span className="mr-2">{tab.icon}</span>
                <span>{tab.label}</span>
              </button>
            ))}
          </div>

          {/* Content */}
          <div className="p-6">
            {activeTab === 'profile' && (
              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex flex-col items-center">
                  <div className="relative w-32 h-32 rounded-full overflow-hidden glass-effect mb-4">
                    {session.user.image ? (
                      <Image
                        src={session.user.image}
                        alt={session.user.name || 'User profile'}
                        layout="fill"
                        objectFit="cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-5xl text-gray-400">
                        <FiUser />
                      </div>
                    )}
                  </div>
                  <button className="text-blue-400 hover:text-blue-300 transition-colors text-sm flex items-center">
                    <FiEdit className="mr-1" />
                    <span>Изменить фото</span>
                  </button>
                </div>
                
                <div className="flex-1 space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">Имя</label>
                    <div className="glass-effect p-3 rounded-md text-white">
                      {session.user.name}
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-1">Email</label>
                    <div className="glass-effect p-3 rounded-md text-white flex items-center">
                      <FiMail className="mr-2 text-gray-400" />
                      {session.user.email}
                    </div>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-3 pt-4">
                    <button className="btn-primary">Изменить данные</button>
                    <button className="btn-secondary">Изменить пароль</button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'favorites' && (
              <div>
                {loading ? (
                  <div className="flex justify-center py-16">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                  </div>
                ) : favoriteCourses.length > 0 ? (
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* Здесь будут карточки избранных курсов */}
                    <div className="text-center py-16 text-gray-400 col-span-full">
                      Список избранных курсов будет отображаться здесь
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-16 text-gray-400">
                    <FiHeart className="text-5xl mx-auto mb-4 opacity-50" />
                    <p>У вас пока нет избранных курсов</p>
                    <Link
                      href="/courses"
                      className="text-blue-400 hover:text-blue-300 transition-colors mt-4 inline-block"
                    >
                      Перейти к курсам
                    </Link>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'saved' && (
              <div>
                {loading ? (
                  <div className="flex justify-center py-16">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                  </div>
                ) : savedLessons.length > 0 ? (
                  <div className="space-y-4">
                    {/* Здесь будут сохраненные уроки */}
                    <div className="text-center py-16 text-gray-400">
                      Список сохраненных уроков будет отображаться здесь
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-16 text-gray-400">
                    <FiBookmark className="text-5xl mx-auto mb-4 opacity-50" />
                    <p>У вас пока нет сохраненных уроков</p>
                    <Link
                      href="/courses"
                      className="text-blue-400 hover:text-blue-300 transition-colors mt-4 inline-block"
                    >
                      Перейти к курсам
                    </Link>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'promocodes' && (
              <div>
                {loading ? (
                  <div className="flex justify-center py-16">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                  </div>
                ) : promoCodes.length > 0 ? (
                  <div className="space-y-4">
                    {/* Здесь будут промо-коды */}
                    <div className="text-center py-16 text-gray-400">
                      Список ваших промо-кодов будет отображаться здесь
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-16 text-gray-400">
                    <FiKey className="text-5xl mx-auto mb-4 opacity-50" />
                    <p>У вас пока нет активных промо-кодов</p>
                    <div className="mt-4">
                      <form className="max-w-md mx-auto">
                        <div className="glass-effect p-1 rounded-lg flex overflow-hidden">
                          <input
                            type="text"
                            className="flex-grow bg-transparent border-0 text-white px-4 py-2 focus:outline-none"
                            placeholder="Введите промо-код..."
                            required
                          />
                          <button
                            type="submit"
                            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
                          >
                            Активировать
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ProfilePage; 