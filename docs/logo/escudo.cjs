// Saca los leones (componentes verdes grandes) y deja solo el escudo.
const sharp = require(process.argv[2] + '/node_modules/sharp');
const [, , , entrada, salida] = process.argv;
(async () => {
  const { data, info } = await sharp(entrada).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const { width: W, height: H } = info;
  const n = W * H;
  const verde = new Uint8Array(n);
  for (let i = 0; i < n; i++) {
    const r = data[i * 4], g = data[i * 4 + 1], b = data[i * 4 + 2], a = data[i * 4 + 3];
    // verde de los leones y sus bordes (incluye semitransparentes)
    if (a > 0 && g >= r && g >= b - 10 && r < 130 && g < 140) verde[i] = 1;
    else if (a > 0 && a < 200 && r < 160 && g < 170) verde[i] = 1; // borde suavizado oscuro
  }
  const comp = new Int32Array(n).fill(-1);
  const tam = [];
  const pila = new Int32Array(n);
  let id = 0;
  for (let s = 0; s < n; s++) {
    if (!verde[s] || comp[s] !== -1) continue;
    let top = 0, cuenta = 0;
    pila[top++] = s; comp[s] = id;
    while (top) {
      const p = pila[--top]; cuenta++;
      const x = p % W, y = (p / W) | 0;
      for (let dy = -1; dy <= 1; dy++) for (let dx = -1; dx <= 1; dx++) {
        const nx = x + dx, ny = y + dy;
        if (nx < 0 || ny < 0 || nx >= W || ny >= H) continue;
        const q = ny * W + nx;
        if (verde[q] && comp[q] === -1) { comp[q] = id; pila[top++] = q; }
      }
    }
    tam.push(cuenta); id++;
  }
  const grandes = new Set(tam.map((t, i) => (t > 20000 ? i : -1)).filter((i) => i >= 0));
  console.log('componentes grandes', [...grandes].map((i) => tam[i]));
  const out = Buffer.from(data);
  for (let i = 0; i < n; i++) if (comp[i] >= 0 && grandes.has(comp[i])) out[i * 4 + 3] = 0;
  // Además, todo lo que esté fuera del ancho del escudo
  await sharp(out, { raw: { width: W, height: H, channels: 4 } }).trim({ threshold: 1 }).png().toFile(salida);
  const m = await sharp(salida).metadata();
  console.log('escudo', m.width, m.height);
})();
