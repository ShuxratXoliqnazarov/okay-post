import { z } from 'zod'

/*
  Общие правила валидации полей. Собирай из них схемы форм в features/<name>/model/schema.js:
    z.object({ email: emailField, password: passwordField })
  Так все формы проекта проверяют email/телефон/пароль одинаково.
*/

export const requiredString = (message = 'Обязательное поле') => z.string().trim().min(1, message)

export const emailField = z
  .string()
  .trim()
  .min(1, 'Введите email')
  .toLowerCase()
  .pipe(z.email('Некорректный email'))

// Таджикистан: принимает "+992 (90) 123-45-67", сохраняет "+992901234567"
export const phoneField = z
  .string()
  .trim()
  .min(1, 'Введите номер телефона')
  .transform((value) => value.replace(/[\s()-]/g, ''))
  .pipe(z.string().regex(/^\+992\d{9}$/, 'Формат: +992 XX XXX XX XX'))

export const nameField = z
  .string()
  .trim()
  .min(2, 'Минимум 2 символа')
  .max(50, 'Максимум 50 символов')
  .regex(/^[a-zA-Zа-яА-ЯёЁ\s-]+$/, 'Только буквы, пробел и дефис')

// Для создания/смены пароля. Во входе используй requiredString — там проверяем только наличие.
export const passwordField = z
  .string()
  .min(8, 'Минимум 8 символов')
  .max(32, 'Максимум 32 символа')
  .regex(/^\S+$/, 'Пароль не должен содержать пробелы')
  .regex(/[a-zA-Z]/, 'Нужна хотя бы одна латинская буква')
  .regex(/\d/, 'Нужна хотя бы одна цифра')

export const loginField = z
  .string()
  .trim()
  .min(3, 'Минимум 3 символа')
  .max(30, 'Максимум 30 символов')
  .regex(/^[a-zA-Z0-9._-]+$/, 'Только латиница, цифры и . _ -')

export const trackNumberField = z
  .string()
  .trim()
  .min(1, 'Введите трек-номер')
  .regex(/^[a-zA-Z0-9]{8,30}$/, 'Трек-номер: 8–30 латинских букв и цифр')

// Принимает "12", "12.5", "12,50" (строка из инпута) -> число 12.5
export const moneyField = z
  .string()
  .trim()
  .min(1, 'Введите сумму')
  .regex(/^\d+([.,]\d{1,2})?$/, 'Только цифры, до 2 знаков после запятой')
  .transform((value) => Number(value.replace(',', '.')))
  .pipe(z.number().positive('Сумма должна быть больше 0').max(100000, 'Слишком большая сумма'))

export const quantityField = z
  .string()
  .trim()
  .min(1, 'Укажите количество')
  .regex(/^\d+$/, 'Только целое число')
  .transform(Number)
  .pipe(z.number().min(1, 'Минимум 1').max(99, 'Максимум 99'))

export const urlField = z.string().trim().min(1, 'Вставьте ссылку').pipe(z.url('Некорректная ссылка'))

export const zipField = z
  .string()
  .trim()
  .min(1, 'Введите индекс')
  .regex(/^\d{6}$/, 'Индекс — 6 цифр')
