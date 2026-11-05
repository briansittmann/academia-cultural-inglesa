# Imagen al compartir

`og.html` arma la imagen que se ve al compartir el link del sitio (WhatsApp, Facebook, Instagram, X): 1200 × 630, con el logo, el nombre, el público, "Desde 1979", "Exámenes Cambridge" y la foto real de la fachada de Villa Urquiza (`fachada-villa-urquiza.jpg`, la que entregó el dueño del proyecto el 2026-10-12).

Usa los colores del sitio y Plus Jakarta Sans desde `node_modules`.

Para regenerarla, desde la raíz del proyecto:

```sh
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --headless=new --hide-scrollbars \
  --force-device-scale-factor=2 --window-size=1200,630 --virtual-time-budget=2000 \
  --screenshot=/tmp/og@2x.png "file://$PWD/docs/imagen-compartir/og.html"
node -e "require('sharp')('/tmp/og@2x.png').resize(1200,630).jpeg({quality:88,mozjpeg:true}).toFile('public/og.jpg')"
cp public/og.jpg src/assets/img/instituto/seo/imagen.jpeg
```

`src/assets/img/instituto/seo/imagen.jpeg` es el campo "Imagen al compartir" del panel y pisa a `public/og.jpg`. Si la dueña sube otra desde el panel, esa manda.
