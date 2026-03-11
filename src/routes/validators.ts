import { z } from 'zod'

const requiredString = (label: string) => z.string().trim().min(1, `${label} обязательно`)

export const step1Schema = z.object({
  phone: z
    .string()
    .trim()
    .regex(/^0\d{3} \d{3} \d{3}$/, 'Телефон должен быть в формате 0XXX XXX XXX'),
  firstName: requiredString('Имя'),
  lastName: requiredString('Фамилия'),
  gender: z.enum(['male', 'female'], { message: 'Пол обязателен' }),
})

export const step2Schema = z.object({
  workCategory: requiredString('Место работы'),
  address: requiredString('Адрес проживания'),
})

export const step3Schema = z.object({
  loanAmount: z.number().min(200, 'Минимум $200').max(1000, 'Максимум $1000'),
  loanTermDays: z.number().min(10, 'Минимум 10 дней').max(30, 'Максимум 30 дней'),
})


