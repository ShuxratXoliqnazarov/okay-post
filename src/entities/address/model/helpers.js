export const formatAddress = (address) =>
  `${address.lastName} ${address.firstName}, ${address.city}, ${address.street} ${address.house}, кв. ${address.apartment}`

export const getRecipientShortName = (address) => `${address.lastName} ${address.firstName[0]}.`
