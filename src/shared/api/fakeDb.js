/*
  Фейковый бэкенд на localStorage.
  Каждая коллекция (users, orders, parcels...) хранится под ключом "okeypost-db-v<версия>-<name>".
  При первом запуске коллекция заполняется стартовыми данными (seed) из entities/<name>/model/mock.js.

  Посмотреть/почистить данные: DevTools → Application → Local Storage.
  Сбросить всё к стартовым данным: удалить ключи okeypost-* и обновить страницу.

  Когда появится настоящий сервер — меняем только entities/<name>/api/*.js на request(),
  страницы и компоненты трогать не нужно.
*/

// Имитация задержки сети, чтобы были видны состояния загрузки
export const delay = (ms = 400) => new Promise((resolve) => setTimeout(resolve, ms))

// Поменяли структуру mock-данных — увеличь версию, и у всех данные перезальются заново
const DB_VERSION = 2

export function createCollection(name, seed = []) {
  const key = `okeypost-db-v${DB_VERSION}-${name}`

  const read = () => {
    const raw = localStorage.getItem(key)
    if (raw) {
      try {
        return JSON.parse(raw)
      } catch {
        // Битые данные — перезаписываем стартовыми
      }
    }
    localStorage.setItem(key, JSON.stringify(seed))
    return seed
  }

  const write = (items) => localStorage.setItem(key, JSON.stringify(items))

  return {
    getAll: () => read(),
    getById: (id) => read().find((item) => item.id === id) ?? null,
    find: (predicate) => read().find(predicate) ?? null,
    filter: (predicate) => read().filter(predicate),

    create: (data) => {
      const item = { id: Date.now(), ...data }
      write([...read(), item])
      return item
    },

    update: (id, data) => {
      let updated = null
      write(read().map((item) => (item.id === id ? (updated = { ...item, ...data }) : item)))
      if (!updated) throw new Error('Запись не найдена')
      return updated
    },

    remove: (id) => write(read().filter((item) => item.id !== id)),
  }
}
