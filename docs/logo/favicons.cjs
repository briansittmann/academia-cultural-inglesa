const sharp = require(process.cwd() + '/node_modules/sharp');
const fs = require('fs');
const [, , original, escudo] = process.argv;
const CREMA = '#FBFBF9';
const cuadrado = async (lado, alto, fondo) => {
  const img = await sharp(escudo).resize({ height: alto, fit: 'inside', kernel: 'lanczos3' }).toBuffer();
  return sharp({ create: { width: lado, height: lado, channels: 4, background: fondo ?? { r: 0, g: 0, b: 0, alpha: 0 } } })
    .composite([{ input: img, gravity: 'center' }]).png({ compressionLevel: 9 }).toBuffer();
};
(async () => {
  // Logo sin márgenes transparentes
  await sharp(original).trim({ threshold: 1 }).png({ compressionLevel: 9 }).toFile('src/assets/logo/logo.png');
  fs.copyFileSync(escudo, 'src/assets/logo/escudo.png');
  // Favicons: el escudo ocupa casi todo el alto
  const ico = await Promise.all([16, 32, 48].map((l) => cuadrado(l, l)));
  fs.writeFileSync('public/favicon-96.png', await cuadrado(96, 94));
  const apple = await cuadrado(180, 144, CREMA);
  fs.writeFileSync('public/apple-touch-icon.png', await sharp(apple).flatten({ background: CREMA }).png().toBuffer());
  // ICO con PNG adentro
  const cab = Buffer.alloc(6 + 16 * ico.length);
  cab.writeUInt16LE(0, 0); cab.writeUInt16LE(1, 2); cab.writeUInt16LE(ico.length, 4);
  let off = cab.length;
  ico.forEach((b, i) => {
    const l = [16, 32, 48][i], e = 6 + 16 * i;
    cab.writeUInt8(l, e); cab.writeUInt8(l, e + 1); cab.writeUInt8(0, e + 2); cab.writeUInt8(0, e + 3);
    cab.writeUInt16LE(1, e + 4); cab.writeUInt16LE(32, e + 6); cab.writeUInt32LE(b.length, e + 8); cab.writeUInt32LE(off, e + 12);
    off += b.length;
  });
  fs.writeFileSync('public/favicon.ico', Buffer.concat([cab, ...ico]));
  for (const f of ['src/assets/logo/logo.png', 'src/assets/logo/escudo.png', 'public/favicon-96.png', 'public/apple-touch-icon.png']) {
    const m = await sharp(f).metadata(); console.log(f, m.width, m.height, fs.statSync(f).size);
  }
})();
