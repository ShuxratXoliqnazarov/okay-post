// Итоговая цена в фунтах: база + вес * тариф + доп. услуги
export const calcTotal = (method, weight, extra = 0) => method.from + method.perKg * weight + extra
