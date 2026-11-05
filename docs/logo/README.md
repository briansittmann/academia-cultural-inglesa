# Logo y favicons

- `src/assets/logo/logo.png`: logo completo (escudo con los dos leones), sin márgenes. Lo usan `Logo.astro` (header, footer) y los datos estructurados.
- `src/assets/logo/escudo.png`: solo el escudo. `escudo.cjs` lo saca del logo borrando los leones (las dos manchas verdes más grandes).
- `public/favicon.ico` (16, 32 y 48), `public/favicon-96.png` y `public/apple-touch-icon.png` (180, fondo crema porque iOS no admite transparencia) salen del escudo: con el logo entero, a 16 px los leones se vuelven manchas.

Para cambiar el logo, desde la raíz del proyecto (con el PNG nuevo en `/ruta/logo.png`, fondo transparente):

```sh
node docs/logo/escudo.cjs "$PWD" /ruta/logo.png /tmp/escudo.png
node docs/logo/favicons.cjs /ruta/logo.png /tmp/escudo.png
```

Después, regenerar la imagen al compartir (`docs/imagen-compartir/README.md`).
