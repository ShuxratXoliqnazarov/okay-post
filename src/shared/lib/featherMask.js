// Иллюстрации баннеров вырезаны из макета вместе с градиентным фоном.
// Маска плавно гасит края картинки, и она сливается с градиентом самого баннера.
export const featherMaskStyle = {
  maskImage:
    'linear-gradient(to right, transparent, #000 14%, #000 86%, transparent), linear-gradient(to bottom, transparent, #000 10%, #000 90%, transparent)',
  maskComposite: 'intersect',
  WebkitMaskImage:
    'linear-gradient(to right, transparent, #000 14%, #000 86%, transparent), linear-gradient(to bottom, transparent, #000 10%, #000 90%, transparent)',
  WebkitMaskComposite: 'source-in',
}
