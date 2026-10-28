// Распродажи в магазинах Великобритании.
// Разметка в строках: **жирный**, {{зелёный}}. Каждая группа (g1, g2) — отдельный абзац.
export const SALES = [
  {
    id: 'abercrombie',
    shop: 'Abercrombie & Fitch',
    photo: 'saleAbercrombie',
    groups: [
      ['цены от **£7.99 (3365₽)** разделе:', 'мужские вещи: {{CLEARANCE}}', 'женские вещи: {{CLEARANCE}}'],
      ['качественные детские вещи', 'на {{Abercrombie kids}}'],
    ],
    action: 'Только выкуп с оператором',
  },
  {
    id: 'timberland',
    shop: 'Timberland',
    photo: 'saleTimberland',
    groups: [
      ['**NEW!**', 'Коллаб {{Tommy Hilfiger x}}', '{{Timberland!}}'],
      ['Ботинки от **£7.99 (3365₽)**', 'Зимние шапки за **£7.99 (3365₽)**'],
    ],
    action: 'Только выкуп с оператором',
  },
  {
    id: 'polo',
    shop: 'Polo Ralph Lauren',
    photo: 'salePolo',
    groups: [
      ['{{Рубашка}} за **£7.99 (3365₽)**', '{{Худи}} за **£7.99 (3365₽)**', '{{Свитшот с лого}} за **£7.99 (3365₽)**'],
      ['До - **40%** в разделе SALE'],
    ],
    action: 'Только выкуп с оператором',
  },
  {
    id: 'hollister',
    shop: 'Hollister Co.',
    photo: 'saleHollister',
    groups: [['цены от **£7.99 (3365₽)** разделе:', 'мужские вещи: {{CLEARANCE}}', 'женские вещи: {{CLEARANCE}}']],
    action: 'Только выкуп с оператором',
  },
  {
    id: 'michael-kors',
    shop: 'Michael Kors',
    photo: 'saleMichaelKors',
    groups: [
      ['**Новая коллекция!**', '**Michael Kors x 007 (James Bond)**'],
      ['**HOLIDAY HEAD START**', '**- 60%** на сумки, обувь и одежду'],
    ],
    action: 'В магазин',
  },
  {
    id: 'saks',
    shop: 'Аутлет Saks OFF 5TH',
    photo: 'saleSaks',
    groups: [
      ['**Black Friday Early Access**', 'Брендовые шапки, шарфы и перчатки - **60% OFF**'],
      ['Shop Pajar, Sorel, UGG, Calvin Klein Jeans, Tommy Hilfiger'],
    ],
    action: 'Только выкуп с оператором',
  },
  {
    id: 'victorias-secret',
    shop: 'Victoria\'s Secret',
    photo: 'saleVictoriasSecret',
    groups: [
      ['**Лосьоны и мисты за £7.99 (3365₽)**', '**7 трусиков за £7.99 (3365₽)**', 'Халаты за **£7.99 (3365₽)**'],
      ['Потрать **£7.99 (3365₽)** - получи **купон на $25** на следующий заказ'],
    ],
    action: 'В магазин',
  },
  {
    id: 'levis',
    shop: 'levi.com',
    photo: 'saleLevis',
    groups: [['{{Джинсы}} от **£7.99 (3365₽)**'], ['**Скидка 30% на заказы от $100 с кодом TREAT30**']],
    action: 'В магазин',
  },
  {
    id: 'ugg',
    shop: 'UGG® - вход с VPN',
    photo: 'saleUgg',
    groups: [
      ['Угги за **£7.99 (3365₽)**', 'Ботинки UGG от **£7.99 (3365₽)**', 'в разделе {{SALE}}'],
      ['{{Мужские угги}} за **£7.99 (3365₽)**', '{{Слипперы}} за **£7.99 (3365₽)**'],
    ],
    action: 'Только выкуп с оператором',
  },
  {
    id: 'new-balance',
    shop: 'New Balance',
    photo: 'saleNewBalance',
    groups: [['**Вход с VPN**', '**- 30%** на некоторые модели', '**Бесплатная** доставка **$50+**']],
    action: 'Только выкуп с оператором',
  },
]
