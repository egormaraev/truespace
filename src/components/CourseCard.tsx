'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FiVideo, FiHeart } from 'react-icons/fi';
import { motion } from 'framer-motion';

interface CourseCardProps {
  id: string;
  title: string;
  description: string;
  thumbnailUrl: string;
  lessonsCount: number;
  category: string;
  isFavorite?: boolean;
  onToggleFavorite?: (id: string) => void;
  requiresPromoCode?: boolean;
}

const CourseCard: React.FC<CourseCardProps> = ({
  id,
  title,
  description,
  thumbnailUrl,
  lessonsCount,
  category,
  isFavorite = false,
  onToggleFavorite,
  requiresPromoCode = false,
}) => {
  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (onToggleFavorite) {
      onToggleFavorite(id);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="card group overflow-hidden relative h-full flex flex-col"
    >
      {requiresPromoCode && (
        <div className="absolute top-2 right-2 z-10 bg-blue-500 text-white py-1 px-3 rounded-full text-xs font-semibold">
          Требуется прокод
        </div>
      )}
      
      <Link href={`/courses/${id}`}>
        <div className="relative h-48 w-full rounded-t-lg overflow-hidden">
          <Image
            src={thumbnailUrl}
            alt={title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />
        </div>
        
        <div className="p-5 flex flex-col flex-grow">
          <div className="flex justify-between items-start mb-2">
            <span className="text-xs font-medium text-blue-400 bg-blue-500 bg-opacity-20 rounded-full px-2 py-1">
              {category}
            </span>
            <button
              onClick={handleToggleFavorite}
              className="text-lg focus:outline-none transition-colors"
            >
              {isFavorite ? <FiHeart className="text-red-500 fill-current" /> : <FiHeart />}
            </button>
          </div>
          
          <h3 className="font-bold text-lg mb-2 text-white">{title}</h3>
          
          <p className="text-gray-300 text-sm mb-4 line-clamp-2 flex-grow">
            {description}
          </p>
          
          <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-700">
            <div className="flex items-center text-sm text-gray-400">
              <FiVideo className="mr-1" />
              <span>{lessonsCount} уроков</span>
            </div>
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="text-blue-400 text-sm font-medium"
            >
              Подробнее →
            </motion.div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default CourseCard; 