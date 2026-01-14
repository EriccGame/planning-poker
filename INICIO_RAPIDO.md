# 🚀 Inicio Rápido - Planning Poker

Guía rápida para poner en marcha tu aplicación de Planning Poker en 5 minutos.

## ⚡ Pasos Rápidos

### 1. Instalar Dependencias (2 min)

```bash
cd planning-poker
npm install
```

### 2. Configurar Firebase (2 min)

1. Ve a [Firebase Console](https://console.firebase.google.com/)
2. Crea un proyecto nuevo
3. Habilita **Firestore Database** (modo prueba)
4. Habilita **Authentication** → **Anonymous**
5. Copia las credenciales de tu app web

6. Edita `src/firebase.js`:
```javascript
const firebaseConfig = {
  apiKey: "TU_API_KEY_AQUI",
  authDomain: "tu-proyecto.firebaseapp.com",
  projectId: "tu-proyecto",
  storageBucket: "tu-proyecto.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abc123"
};
```

### 3. Ejecutar en Desarrollo (1 min)

```bash
npm run dev
```

Abre `http://localhost:5173` en tu navegador.

---

## ✅ Verificación Rápida

### ¿Funciona correctamente?

- [ ] La página carga sin errores
- [ ] Puedes ingresar tu nombre
- [ ] Puedes crear una sala
- [ ] Puedes seleccionar cartas
- [ ] El toggle de tema funciona
- [ ] Los emojis se animan

### Si algo falla:

1. **Error de Firebase**: Verifica las credenciales en `src/firebase.js`
2. **Página en blanco**: Abre la consola del navegador (F12)
3. **Estilos rotos**: Ejecuta `npm install` de nuevo

---

## 🎯 Uso Básico

### Crear una Sala

1. Ingresa tu nombre
2. Clic en "Crear Nueva Sala"
3. Comparte el ID (4 letras/números) con tu equipo

### Unirse a una Sala

1. Ingresa tu nombre
2. Clic en "Unirse a una Sala"
3. Ingresa el ID de la sala
4. Clic en "Entrar a la Sala"

### Votar

1. Selecciona una carta (0, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, ?)
2. Espera a que todos voten
3. Clic en "Revelar Cartas"
4. Ve el promedio calculado
5. Clic en "Nueva Votación" para reiniciar

---

## 🌐 Deploy a GitHub Pages

### Opción Rápida (GitHub Actions)

1. Sube tu código a GitHub:
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/TU_USUARIO/planning-poker.git
git push -u origin main
```

2. En GitHub: **Settings** → **Pages** → **Source**: GitHub Actions

3. ¡Listo! Se desplegará automáticamente

### URL Final
```
https://TU_USUARIO.github.io/planning-poker/
```

---

## 🎨 Personalización Rápida

### Cambiar Colores

Edita `tailwind.config.js`:

```javascript
primary: {
  light: '#E0F2FE',    // Azul claro
  DEFAULT: '#7DD3FC',  // Azul medio
  dark: '#0284C7',     // Azul oscuro
}
```

### Cambiar Secuencia de Votación

Edita `src/components/PokerTable.jsx`:

```javascript
const FIBONACCI = [1, 2, 3, 5, 8, 13, 21];  // Tu secuencia
```

### Cambiar Emojis

Edita `src/components/EmojiReaction.jsx`:

```javascript
const EMOJIS = ['🎉', '👍', '🔥', '🤔'];  // Tus emojis
```

---

## 📱 Compartir con el Equipo

### Desarrollo Local (misma red WiFi)

1. Encuentra tu IP local:
   - Windows: `ipconfig`
   - Mac/Linux: `ifconfig`

2. Comparte: `http://TU_IP:5173`

### Producción (GitHub Pages)

Comparte: `https://TU_USUARIO.github.io/planning-poker/`

---

## 🔧 Comandos Útiles

```bash
# Desarrollo
npm run dev          # Servidor local

# Producción
npm run build        # Compilar
npm run preview      # Vista previa del build

# Deploy
npm run deploy       # Deploy manual a GitHub Pages
```

---

## 📚 Documentación Completa

- **README.md**: Documentación principal
- **GUIA_CONFIGURACION_FIREBASE.md**: Guía detallada de Firebase
- **ESTRUCTURA_PROYECTO.md**: Arquitectura del proyecto

---

## 💡 Tips

### Para Equipos Remotos
- Usa GitHub Pages para acceso público
- Comparte el link de la sala directamente
- Usa el botón "Copiar Link" en la sala

### Para Equipos Locales
- Usa el servidor de desarrollo
- Todos deben estar en la misma red WiFi
- Comparte tu IP local

### Mejores Prácticas
- Crea una sala nueva para cada sesión
- Usa nombres descriptivos
- Reinicia la votación después de cada historia

---

## ❓ Preguntas Frecuentes

**¿Necesito crear cuentas?**
No, solo ingresa tu nombre y comienza.

**¿Los datos se guardan?**
Sí, en Firebase Firestore en tiempo real.

**¿Cuántos usuarios pueden unirse?**
Ilimitados (dentro del plan gratuito de Firebase).

**¿Funciona en móviles?**
Sí, es completamente responsive.

**¿Necesito internet?**
Sí, para sincronizar con Firebase.

---

## 🆘 Ayuda

Si tienes problemas:

1. Revisa la consola del navegador (F12)
2. Consulta **GUIA_CONFIGURACION_FIREBASE.md**
3. Verifica que Firebase esté configurado
4. Abre un issue en GitHub

---

¡Listo para estimar! 🎯
