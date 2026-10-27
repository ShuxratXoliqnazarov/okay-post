// адрес склада в лондоне
export const WAREHOUSE_ADDRESS = {
  firstLine: 'Unit 5 Cromwell Estate',
  secondLine: 'Staffa road UK16988',
  county: 'London',
  postcode: 'E10 7QZ',
  city: 'London',
  country: 'Great Britain',
  phone: '07308187545',
}

export const getVirtualAddressRows = (user) => [
  { label: 'Ваш ID Клиента:', value: user.virtualId },
  { label: 'Name, Surname:', value: `${user.lastName} ${user.firstName} ${user.virtualId}` },
  { label: 'First line of address:', value: `${WAREHOUSE_ADDRESS.firstLine} ${user.virtualId}` },
  { label: 'Second line of address:', value: WAREHOUSE_ADDRESS.secondLine },
  { label: 'County:', value: WAREHOUSE_ADDRESS.county },
  { label: 'Postcode:', value: WAREHOUSE_ADDRESS.postcode },
  { label: 'Town, City:', value: WAREHOUSE_ADDRESS.city },
  { label: 'Country:', value: WAREHOUSE_ADDRESS.country },
  { label: 'Telephone:', value: WAREHOUSE_ADDRESS.phone },
]

export const getFullName = (user) => [user?.firstName, user?.lastName].filter(Boolean).join(' ')
