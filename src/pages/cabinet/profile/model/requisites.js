// Реквизиты для оплаты (экран 13) — данные из макета. logo — вместо таблицы показываем логотип.
export const REQUISITES = [
  {
    title: 'Privat 24',
    rows: [
      { label: 'Номер карточки:', value: '4462617345592244' },
      { label: 'ФИО:', value: 'Jelena Boikova' },
    ],
  },
  {
    title: 'Тинькофф',
    rows: [
      { label: 'Номер карточки:', value: '4462617345592244' },
      { label: 'ФИО:', value: 'Jelena Boikova' },
    ],
  },
  { title: 'Paypal', logo: 'paypal' },
  { title: 'Card-PayZone', logo: 'card' },
  {
    title: 'Unistream',
    rows: [
      { label: 'Name:', value: 'Mykhaylo Prykhodko' },
      { label: 'Tel:', value: '00447782164776' },
      { label: 'Branch:', value: 'London-Unistream' },
      { label: 'Adress:', value: 'Canary Wharf Beatty House, Admirals Way 5 E14 9UF' },
    ],
  },
  {
    title: 'SWIFT',
    rows: [
      { label: 'ФИО:', value: 'Mykhaylo Prykhodko' },
      { label: 'Адрес проживания:', value: 'Unit 1 Cromwell industrial Estate, Staffa Road, E10 7QZ, London' },
      { label: 'Branch:', value: 'London-Unistream' },
      { label: 'Адрес и название отделения банка:', value: 'Westfiled Stratford City, E20' },
      { label: 'Sort code:', value: '40-43-65' },
      { label: 'Номер счета (Account number):', value: '60019836' },
      { label: 'IBAN:', value: 'GB46HBUK40436560019836' },
      { label: 'SWIFTBIC:', value: 'HBUKGB4194C' },
      { label: 'Телефон получателя:', value: '00447782164776' },
    ],
  },
]
