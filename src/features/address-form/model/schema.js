import { z } from 'zod'
import { nameField, phoneField, requiredString, zipField } from '@/shared/lib'

export const addressSchema = z.object({
  lastName: nameField,
  firstName: nameField,
  country: requiredString('Укажите страну').max(60, 'Максимум 60 символов'),
  region: requiredString('Укажите область').max(60, 'Максимум 60 символов'),
  district: requiredString('Укажите район').max(60, 'Максимум 60 символов'),
  city: requiredString('Укажите город').max(60, 'Максимум 60 символов'),
  street: requiredString('Укажите улицу').max(100, 'Максимум 100 символов'),
  house: requiredString('Укажите дом').max(10, 'Максимум 10 символов'),
  apartment: requiredString('Укажите квартиру').max(10, 'Максимум 10 символов'),
  zip: zipField,
  phone: phoneField,
})

export const EMPTY_ADDRESS = {
  lastName: '',
  firstName: '',
  country: '',
  region: '',
  district: '',
  city: '',
  street: '',
  house: '',
  apartment: '',
  zip: '',
  phone: '+992',
}

export const ADDRESS_FIELDS = [
  { name: 'lastName', label: 'Фамилия', autoComplete: 'family-name' },
  { name: 'firstName', label: 'Имя', autoComplete: 'given-name' },
  { name: 'country', label: 'Страна', autoComplete: 'country-name' },
  { name: 'region', label: 'Область', autoComplete: 'address-level1' },
  { name: 'district', label: 'Район' },
  { name: 'city', label: 'Город', autoComplete: 'address-level2' },
  { name: 'street', label: 'Улица', autoComplete: 'address-line1' },
  { name: 'house', label: 'Дом' },
  { name: 'apartment', label: 'Квартира' },
  { name: 'zip', label: 'Индекс', autoComplete: 'postal-code', inputMode: 'numeric' },
  { name: 'phone', label: 'Телефон', autoComplete: 'tel', type: 'tel' },
]
