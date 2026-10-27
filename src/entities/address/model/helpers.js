// "Karimov Dmitro, Душанбе, Проспект Рудаки 3а, кв. 98"
export const formatAddress = (address) =>
  `${address.lastName} ${address.firstName}, ${address.city}, ${address.street} ${address.house}, кв. ${address.apartment}`

// "Karimov D." — для колонки «ФИО» в посылках
export const getRecipientShortName = (address) => `${address.lastName} ${address.firstName[0]}.`
