// Категории и товары для блока «Насколько выгодно покупать?».
// ru — цена в России (₽), uk — цена в UK (£), saving — выгода в $; image — ключ картинки (если нет — иконка категории)
export const SHOWCASE_CATEGORIES = [
  { id: 'clothes', label: 'Одежда', icon: 'catClothes' },
  { id: 'electronics', label: 'Электроника', icon: 'catElectronics' },
  { id: 'accessories', label: 'Аксессуары', icon: 'catAccessories' },
  { id: 'kids', label: 'Для детей', icon: 'catKids' },
  { id: 'sport', label: 'Для спорта', icon: 'catSport' },
  { id: 'cosmetics', label: 'Косметика', icon: 'catCosmetics' },
]

export const SHOWCASE_PRODUCTS = {
  clothes: [
    { id: 'tshirt', title: 'Daisy Print Oversized T-Shirt', ru: '2 490', uk: '£15.00', delivery: '£7.79', days: 10, saving: '$21.40', image: 'tshirt' },
    { id: 'jacket', title: 'Columbia Barlow Pass 550 Turbodown Jacket', ru: '7891,46', uk: '£80.62', delivery: '£7.79', days: 10, saving: '$119.56', image: 'jacket' },
    { id: 'jeans', title: 'Levi’s 501 Original Fit Jeans', ru: '6 990', uk: '£49.00', delivery: '£7.79', days: 10, saving: '$64.30', image: 'jeans' },
  ],
  electronics: [
    { id: 'airpods', title: 'Apple AirPods Pro 2nd Generation', ru: '24 990', uk: '£229.00', delivery: '£9.99', days: 10, saving: '$58.00' },
    { id: 'watch', title: 'Apple Watch Series 7 GPS 41mm', ru: '39 990', uk: '£349.00', delivery: '£9.99', days: 10, saving: '$92.00' },
  ],
  accessories: [
    { id: 'bag', title: 'Michael Kors Jet Set Medium Tote', ru: '21 490', uk: '£138.00', delivery: '£7.79', days: 10, saving: '$75.20' },
    { id: 'wallet', title: 'Fossil Leather Bifold Wallet', ru: '5 790', uk: '£32.00', delivery: '£7.79', days: 10, saving: '$26.10' },
  ],
  kids: [
    { id: 'lego', title: 'LEGO Classic Large Creative Brick Box', ru: '4 590', uk: '£29.99', delivery: '£7.79', days: 10, saving: '$18.90' },
    { id: 'toy', title: 'Fisher-Price Laugh & Learn Smart Stages', ru: '3 290', uk: '£21.00', delivery: '£7.79', days: 10, saving: '$15.40' },
  ],
  sport: [
    { id: 'nike', title: 'Nike Air Zoom Pegasus 38', ru: '12 990', uk: '£84.95', delivery: '£7.79', days: 10, saving: '$48.30' },
    { id: 'adidas', title: 'Adidas Ultraboost 22 Running Shoes', ru: '16 490', uk: '£109.00', delivery: '£7.79', days: 10, saving: '$62.70' },
  ],
  cosmetics: [
    { id: 'serum', title: 'Estée Lauder Advanced Night Repair', ru: '9 490', uk: '£64.00', delivery: '£7.79', days: 10, saving: '$37.50' },
    { id: 'palette', title: 'Charlotte Tilbury Pillow Talk Palette', ru: '5 990', uk: '£42.00', delivery: '£7.79', days: 10, saving: '$24.80' },
  ],
}

// Преимущества сервиса под витриной
export const ADVANTAGES = [
  { id: 'savings', icon: 'advSavings', text: 'Экономия до 70%' },
  { id: 'original', icon: 'advOriginal', text: 'Только подлинная продукция' },
  { id: 'fast', icon: 'advFast', text: 'Оперативная доставка' },
  { id: 'choice', icon: 'advChoice', text: 'Огромный выбор товаров' },
]
