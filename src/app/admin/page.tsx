'use client';

import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { 
  FiUsers, FiVideo, FiTag, FiKey, FiPlus, 
  FiEdit, FiTrash2, FiCheck, FiX, FiSearch 
} from 'react-icons/fi';
import { motion } from 'framer-motion';
import AuthCheck from '@/components/AuthCheck';

interface PromoCode {
  id: string;
  code: string;
  description: string;
  courses: string[];
  isActive: boolean;
  expiresAt: string;
  createdAt: string;
}

const AdminPage = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('promocodes');
  const [loading, setLoading] = useState(true);
  const [promoCodes, setPromoCodes] = useState<PromoCode[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [newPromoCode, setNewPromoCode] = useState({
    code: '',
    description: '',
    courses: [] as string[],
    isActive: true,
    expiresAt: '',
  });
  const [isAddingPromoCode, setIsAddingPromoCode] = useState(false);

  useEffect(() => {
    if (session && session.user.role === 'admin') {
      fetchPromoCodes();
    }
  }, [session]);

  const fetchPromoCodes = async () => {
    try {
      setLoading(true);
      // В реальном проекте здесь будет запрос к API
      // const response = await fetch('/api/promocodes');
      // const data = await response.json();
      // setPromoCodes(data);
      
      // Имитация загрузки данных
      setTimeout(() => {
        setPromoCodes([
          {
            id: '1',
            code: 'START2023',
            description: 'Стартовый промо-код для новых пользователей',
            courses: ['1', '2', '3'],
            isActive: true,
            expiresAt: '2023-12-31',
            createdAt: '2023-01-01',
          },
          {
            id: '2',
            code: 'SUMMER2023',
            description: 'Летняя акция',
            courses: ['4', '5'],
            isActive: false,
            expiresAt: '2023-09-01',
            createdAt: '2023-06-01',
          },
        ]);
        setLoading(false);
      }, 1000);
    } catch (error) {
      console.error('Ошибка при получении промо-кодов:', error);
      setLoading(false);
    }
  };

  const handleAddPromoCode = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      setLoading(true);
      
      // В реальном проекте здесь будет запрос к API
      // const response = await fetch('/api/promocodes', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify(newPromoCode),
      // });
      // const data = await response.json();
      
      // Имитация задержки
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      // Обновление списка промо-кодов
      setPromoCodes([
        ...promoCodes,
        {
          id: `${promoCodes.length + 1}`,
          ...newPromoCode,
          createdAt: new Date().toISOString(),
        },
      ]);
      
      // Сброс формы
      setNewPromoCode({
        code: '',
        description: '',
        courses: [],
        isActive: true,
        expiresAt: '',
      });
      
      setIsAddingPromoCode(false);
      setLoading(false);
    } catch (error) {
      console.error('Ошибка при создании промо-кода:', error);
      setLoading(false);
    }
  };

  const handleDeletePromoCode = async (id: string) => {
    if (!window.confirm('Вы уверены, что хотите удалить этот промо-код?')) {
      return;
    }
    
    try {
      setLoading(true);
      
      // В реальном проекте здесь будет запрос к API
      // await fetch(`/api/promocodes/${id}`, {
      //   method: 'DELETE',
      // });
      
      // Имитация задержки
      await new Promise((resolve) => setTimeout(resolve, 500));
      
      // Удаление промо-кода из списка
      setPromoCodes(promoCodes.filter((code) => code.id !== id));
      
      setLoading(false);
    } catch (error) {
      console.error('Ошибка при удалении промо-кода:', error);
      setLoading(false);
    }
  };

  const handleTogglePromoCode = async (id: string, isActive: boolean) => {
    try {
      setLoading(true);
      
      // В реальном проекте здесь будет запрос к API
      // await fetch(`/api/promocodes/${id}`, {
      //   method: 'PATCH',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify({ isActive }),
      // });
      
      // Имитация задержки
      await new Promise((resolve) => setTimeout(resolve, 500));
      
      // Обновление промо-кода в списке
      setPromoCodes(
        promoCodes.map((code) =>
          code.id === id ? { ...code, isActive } : code
        )
      );
      
      setLoading(false);
    } catch (error) {
      console.error('Ошибка при обновлении промо-кода:', error);
      setLoading(false);
    }
  };

  // Фильтрация промо-кодов по поисковому запросу
  const filteredPromoCodes = promoCodes.filter(
    (code) =>
      code.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      code.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const tabs = [
    { id: 'promocodes', label: 'Промо-коды', icon: <FiKey /> },
    { id: 'courses', label: 'Курсы', icon: <FiVideo /> },
    { id: 'lessons', label: 'Уроки', icon: <FiTag /> },
    { id: 'users', label: 'Пользователи', icon: <FiUsers /> },
  ];

  return (
    <AuthCheck requireAdmin>
      <div className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-6xl mx-auto"
        >
          <h1 className="text-3xl font-bold mb-8 text-white">Панель администратора</h1>

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
              {activeTab === 'promocodes' && (
                <div>
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                    <div className="relative w-full sm:w-auto">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FiSearch className="text-gray-500" />
                      </div>
                      <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="input-field pl-10 w-full sm:w-64"
                        placeholder="Поиск промо-кодов..."
                      />
                    </div>
                    <button
                      onClick={() => setIsAddingPromoCode(true)}
                      className="btn-primary flex items-center"
                      disabled={isAddingPromoCode}
                    >
                      <FiPlus className="mr-2" />
                      <span>Добавить промо-код</span>
                    </button>
                  </div>

                  {isAddingPromoCode && (
                    <motion.div
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="glass-effect p-6 rounded-lg mb-6"
                    >
                      <h3 className="text-xl font-bold mb-4 text-white">Новый промо-код</h3>
                      <form onSubmit={handleAddPromoCode} className="space-y-4">
                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-400 mb-1">
                              Код
                            </label>
                            <input
                              type="text"
                              required
                              value={newPromoCode.code}
                              onChange={(e) =>
                                setNewPromoCode({ ...newPromoCode, code: e.target.value })
                              }
                              className="input-field w-full"
                              placeholder="Например: SUMMER2023"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-400 mb-1">
                              Дата окончания
                            </label>
                            <input
                              type="date"
                              value={newPromoCode.expiresAt}
                              onChange={(e) =>
                                setNewPromoCode({ ...newPromoCode, expiresAt: e.target.value })
                              }
                              className="input-field w-full"
                            />
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-400 mb-1">
                            Описание
                          </label>
                          <input
                            type="text"
                            required
                            value={newPromoCode.description}
                            onChange={(e) =>
                              setNewPromoCode({ ...newPromoCode, description: e.target.value })
                            }
                            className="input-field w-full"
                            placeholder="Описание промо-кода"
                          />
                        </div>
                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            id="isActive"
                            checked={newPromoCode.isActive}
                            onChange={(e) =>
                              setNewPromoCode({ ...newPromoCode, isActive: e.target.checked })
                            }
                            className="h-4 w-4 mr-2"
                          />
                          <label htmlFor="isActive" className="text-gray-300">
                            Активен
                          </label>
                        </div>
                        <div className="flex justify-end space-x-3">
                          <button
                            type="button"
                            onClick={() => setIsAddingPromoCode(false)}
                            className="btn-secondary"
                          >
                            Отмена
                          </button>
                          <button
                            type="submit"
                            className="btn-primary"
                            disabled={loading}
                          >
                            {loading ? 'Сохранение...' : 'Сохранить'}
                          </button>
                        </div>
                      </form>
                    </motion.div>
                  )}

                  {loading && !isAddingPromoCode ? (
                    <div className="flex justify-center py-16">
                      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                    </div>
                  ) : filteredPromoCodes.length > 0 ? (
                    <div className="overflow-x-auto">
                      <table className="min-w-full">
                        <thead>
                          <tr className="bg-dark-300 text-gray-300 text-left">
                            <th className="py-3 px-4 rounded-tl-lg">Код</th>
                            <th className="py-3 px-4">Описание</th>
                            <th className="py-3 px-4">Статус</th>
                            <th className="py-3 px-4">Дата окончания</th>
                            <th className="py-3 px-4">Создан</th>
                            <th className="py-3 px-4 rounded-tr-lg text-right">Действия</th>
                          </tr>
                        </thead>
                        <tbody>
                          {filteredPromoCodes.map((code) => (
                            <tr
                              key={code.id}
                              className="border-b border-gray-700 text-gray-200 hover:bg-dark-300 transition-colors"
                            >
                              <td className="py-3 px-4 font-medium">{code.code}</td>
                              <td className="py-3 px-4">{code.description}</td>
                              <td className="py-3 px-4">
                                <span
                                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                    code.isActive
                                      ? 'bg-green-200 text-green-800'
                                      : 'bg-red-200 text-red-800'
                                  }`}
                                >
                                  {code.isActive ? 'Активен' : 'Неактивен'}
                                </span>
                              </td>
                              <td className="py-3 px-4">
                                {code.expiresAt
                                  ? new Date(code.expiresAt).toLocaleDateString()
                                  : 'Бессрочно'}
                              </td>
                              <td className="py-3 px-4">
                                {new Date(code.createdAt).toLocaleDateString()}
                              </td>
                              <td className="py-3 px-4 text-right space-x-2">
                                <button
                                  onClick={() => handleTogglePromoCode(code.id, !code.isActive)}
                                  className={`p-1 rounded-full ${
                                    code.isActive
                                      ? 'text-red-500 hover:bg-red-200 hover:bg-opacity-10'
                                      : 'text-green-500 hover:bg-green-200 hover:bg-opacity-10'
                                  }`}
                                  title={code.isActive ? 'Деактивировать' : 'Активировать'}
                                >
                                  {code.isActive ? <FiX /> : <FiCheck />}
                                </button>
                                <button
                                  className="p-1 rounded-full text-blue-400 hover:bg-blue-200 hover:bg-opacity-10"
                                  title="Редактировать"
                                >
                                  <FiEdit />
                                </button>
                                <button
                                  onClick={() => handleDeletePromoCode(code.id)}
                                  className="p-1 rounded-full text-red-400 hover:bg-red-200 hover:bg-opacity-10"
                                  title="Удалить"
                                >
                                  <FiTrash2 />
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <div className="text-center py-16 text-gray-400">
                      <FiKey className="text-5xl mx-auto mb-4 opacity-50" />
                      <p>
                        {searchTerm
                          ? 'Промо-коды не найдены. Попробуйте изменить параметры поиска.'
                          : 'Промо-коды не найдены. Создайте первый промо-код.'}
                      </p>
                    </div>
                  )}
                </div>
              )}

              {activeTab !== 'promocodes' && (
                <div className="text-center py-16 text-gray-400">
                  <p>Этот раздел находится в разработке</p>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </AuthCheck>
  );
};

export default AdminPage; 