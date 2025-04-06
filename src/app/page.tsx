'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FiArrowRight, FiPlay, FiVideo, FiStar, FiUser } from 'react-icons/fi';
import { motion } from 'framer-motion';

export default function Home() {
  const [promoCode, setPromoCode] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Перенаправить на страницу курсов с промо-кодом
    window.location.href = `/courses?promo=${promoCode}`;
  };

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/hero-bg.jpg"
            alt="TrueSpace Background"
            layout="fill"
            objectFit="cover"
            className="opacity-30"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-dark-400/70 to-dark-500/95"></div>
        </div>
        
        <div className="container mx-auto px-4 py-16 relative z-10">
          <div className="max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                Образовательная платформа TrueSpace
              </h1>
              <p className="text-xl md:text-2xl text-gray-300 mb-8">
                Получите доступ к качественным видеоурокам и курсам с помощью промо-кода
              </p>
            </motion.div>
            
            <motion.form
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              onSubmit={handleSubmit}
              className="max-w-md mx-auto mb-16"
            >
              <div className="glass-effect p-1 rounded-lg flex overflow-hidden shadow-glow-blue">
                <input
                  type="text"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  className="flex-grow bg-transparent border-0 text-white px-4 py-3 focus:outline-none"
                  placeholder="Введите промо-код..."
                  required
                />
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-6 py-3 rounded-md hover:bg-blue-600 transition-colors flex items-center"
                >
                  <span>Получить доступ</span>
                  <FiArrowRight className="ml-2" />
                </button>
              </div>
            </motion.form>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-wrap justify-center gap-8 mb-16"
            >
              <div className="flex items-center text-gray-300">
                <FiVideo className="text-blue-400 mr-2 text-xl" />
                <span>Более 100 уроков</span>
              </div>
              <div className="flex items-center text-gray-300">
                <FiStar className="text-blue-400 mr-2 text-xl" />
                <span>Высокое качество</span>
              </div>
              <div className="flex items-center text-gray-300">
                <FiUser className="text-blue-400 mr-2 text-xl" />
                <span>Проверенные преподаватели</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-dark-400">
        <div className="container mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl font-bold text-center mb-16 text-white"
          >
            Почему именно TrueSpace?
          </motion.h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: 'Качественные видеоуроки',
                description: 'Смотрите видеоуроки в высоком разрешении с детальными объяснениями.',
                icon: <FiPlay className="text-4xl text-blue-400" />,
              },
              {
                title: 'Доступ по промо-коду',
                description: 'Получите доступ к эксклюзивным курсам, используя специальные промо-коды.',
                icon: <FiStar className="text-4xl text-blue-400" />,
              },
              {
                title: 'Личный кабинет',
                description: 'Отслеживайте прогресс и сохраняйте избранные уроки в личном кабинете.',
                icon: <FiUser className="text-4xl text-blue-400" />,
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="card h-full"
              >
                <div className="rounded-full bg-dark-300 w-16 h-16 flex items-center justify-center mb-6">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-4 text-white">{feature.title}</h3>
                <p className="text-gray-300">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 relative">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-dark-400 to-dark-500"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="card max-w-3xl mx-auto text-center p-10"
          >
            <h2 className="text-3xl font-bold mb-6 text-white">Готовы начать обучение?</h2>
            <p className="text-xl text-gray-300 mb-8">
              Зарегистрируйтесь сейчас, чтобы получить доступ к эксклюзивному образовательному контенту
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/auth/signup"
                className="btn-primary text-center py-3 px-8"
              >
                Регистрация
              </Link>
              <Link
                href="/courses"
                className="bg-transparent border border-blue-500 text-blue-400 py-3 px-8 rounded-md hover:bg-blue-500 hover:text-white transition-colors text-center"
              >
                Посмотреть курсы
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
