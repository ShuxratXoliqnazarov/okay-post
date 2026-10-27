import { createCollection, createFakeToken, delay, getCurrentUserId } from '@/shared/api'
import { USERS_SEED } from '../model/mock'

const users = createCollection('users', USERS_SEED)

// Пароль никогда не отдаём наружу
const withoutPassword = ({ password: _password, ...user }) => user

// Фейковое API пользователя. Ответы такие же, какие вернул бы настоящий сервер.
export const userApi = {
  login: async ({ email, password }) => {
    await delay()
    const user = users.find((item) => item.email === email)
    if (!user || user.password !== password) throw new Error('Неверный email или пароль')
    return { user: withoutPassword(user), token: createFakeToken(user.id) }
  },

  register: async ({ name, phone, email, password }) => {
    await delay()
    if (users.find((item) => item.email === email)) {
      throw new Error('Пользователь с таким email уже зарегистрирован')
    }
    if (users.find((item) => item.phone === phone)) {
      throw new Error('Пользователь с таким телефоном уже зарегистрирован')
    }
    const user = users.create({
      role: 'user',
      firstName: name,
      lastName: '',
      login: email.split('@')[0],
      email,
      password,
      phone,
      city: '',
      address: '',
      avatar: null,
      virtualId: `OK${String(Date.now()).slice(-11)}`,
      balance: 0,
      bonus: 0,
      subscribed: false,
    })
    return { user: withoutPassword(user), token: createFakeToken(user.id) }
  },

  forgotPassword: async ({ email }) => {
    await delay()
    if (!users.find((item) => item.email === email)) {
      throw new Error('Пользователь с таким email не найден')
    }
    return { message: `Инструкция по восстановлению отправлена на ${email}` }
  },

  getMe: async () => {
    await delay()
    return withoutPassword(users.getById(getCurrentUserId()))
  },

  updateProfile: async (data) => {
    await delay()
    const userId = getCurrentUserId()
    if (data.email && users.find((item) => item.email === data.email && item.id !== userId)) {
      throw new Error('Этот email уже занят')
    }
    if (data.login && users.find((item) => item.login === data.login && item.id !== userId)) {
      throw new Error('Этот логин уже занят')
    }
    return withoutPassword(users.update(userId, data))
  },

  // delta > 0 — пополнение, delta < 0 — списание
  changeBalance: async (delta) => {
    await delay()
    const userId = getCurrentUserId()
    const balance = Math.round((users.getById(userId).balance + delta) * 100) / 100
    if (balance < 0) throw new Error('Недостаточно средств на балансе')
    return withoutPassword(users.update(userId, { balance }))
  },

  changePassword: async ({ oldPassword, newPassword }) => {
    await delay()
    const userId = getCurrentUserId()
    if (users.getById(userId).password !== oldPassword) throw new Error('Старый пароль введён неверно')
    users.update(userId, { password: newPassword })
    return { message: 'Пароль успешно изменён' }
  },
}
