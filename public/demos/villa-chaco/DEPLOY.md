# Villa Chaco — flujo de trabajo y deploy

## ¿Dónde vive el código?

| Carpeta | Rol |
|---------|-----|
| `proyectos/villa-chaco/` | **Fuente de verdad** — editas HTML, imágenes y contenido aquí |
| `proyectos/adis.lat/public/villachaco/` | **Copia de deploy** — lo que sirve Buscadis en producción |

**No muevas todo a adis.lat.** Mantén este proyecto separado: es más fácil de editar con IA, de versionar solo la web de la clienta y de reutilizar el patrón para otros clientes.

## Publicar en buscadis.com/villachaco

1. Edita en `villa-chaco/` (principalmente `index.html` e `images/`).
2. Sincroniza a Buscadis:

```bash
./scripts/sync-to-buscadis.sh
```

3. En `adis.lat`, commit y deploy (Vercel):

```bash
cd ../adis.lat
git add public/villachaco next.config.js
git commit -m "Update Villa Chaco landing"
git push
```

La URL final: **https://buscadis.com/villachaco/**

## Cómo funciona en Buscadis

- Los archivos estáticos están en `adis.lat/public/villachaco/`.
- `next.config.js` tiene rewrites para que `/villachaco` sirva `index.html`.
- Las imágenes cargan desde `/villachaco/images/...` (rutas relativas en el HTML).

## Vista previa local

El HTML usa `<base href="/villachaco/">` para que imágenes y enlaces funcionen en Buscadis. Para previsualizar:

```bash
cd ../adis.lat && npm run dev
# Abrir http://localhost:3000/villachaco
```

## Importante

- **No** crees un perfil `business_profiles` con slug `villachaco` en Supabase (chocaría con la landing custom).
- Tras cambiar textos o imágenes, siempre corre el script de sync antes del deploy de adis.lat.
