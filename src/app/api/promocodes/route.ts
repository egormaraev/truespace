import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { z } from 'zod';
import dbConnect from '@/lib/mongodb';
import PromoCode from '@/models/PromoCode';
import { authOptions } from '../auth/[...nextauth]/route';

// Схема валидации промо-кода
const promoCodeSchema = z.object({
  code: z.string().min(3, 'Код должен содержать минимум 3 символа'),
  description: z.string().min(5, 'Описание должно содержать минимум 5 символов'),
  courses: z.array(z.string()).optional(),
  isActive: z.boolean().optional(),
  expiresAt: z.string().optional().nullable(),
});

// GET /api/promocodes - получить все промо-коды
export async function GET() {
  try {
    await dbConnect();
    
    const session = await getServerSession(authOptions);
    
    // Проверка авторизации
    if (!session) {
      return NextResponse.json(
        { message: 'Не авторизован' },
        { status: 401 }
      );
    }
    
    // Для обычных пользователей возвращаем только их промо-коды
    if (session.user.role !== 'admin') {
      const userPromoCodes = session.user.promoCodes || [];
      
      // Получаем пользователя с его промо-кодами
      const promoCodesData = await PromoCode.find({
        code: { $in: userPromoCodes },
        isActive: true,
      });
      
      return NextResponse.json(promoCodesData);
    }
    
    // Для админов возвращаем все промо-коды
    const promoCodes = await PromoCode.find().sort({ createdAt: -1 });
    
    return NextResponse.json(promoCodes);
  } catch (error) {
    console.error('Ошибка получения промо-кодов:', error);
    return NextResponse.json(
      { message: 'Внутренняя ошибка сервера' },
      { status: 500 }
    );
  }
}

// POST /api/promocodes - создать новый промо-код
export async function POST(request: NextRequest) {
  try {
    await dbConnect();
    
    const session = await getServerSession(authOptions);
    
    // Проверка авторизации и роли
    if (!session || session.user.role !== 'admin') {
      return NextResponse.json(
        { message: 'Доступ запрещен' },
        { status: 403 }
      );
    }
    
    const body = await request.json();
    
    // Валидация данных
    const validation = promoCodeSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        { message: validation.error.errors[0].message },
        { status: 400 }
      );
    }
    
    // Проверка существования промо-кода
    const existingPromoCode = await PromoCode.findOne({ code: validation.data.code });
    if (existingPromoCode) {
      return NextResponse.json(
        { message: 'Промо-код с таким кодом уже существует' },
        { status: 409 }
      );
    }
    
    // Создание промо-кода
    const newPromoCode = await PromoCode.create({
      ...validation.data,
      expiresAt: validation.data.expiresAt ? new Date(validation.data.expiresAt) : null,
    });
    
    return NextResponse.json(
      { 
        message: 'Промо-код успешно создан',
        promoCode: newPromoCode
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Ошибка создания промо-кода:', error);
    return NextResponse.json(
      { message: 'Внутренняя ошибка сервера' },
      { status: 500 }
    );
  }
} 