# Planning Poker - Estimación Colaborativa

Una aplicación moderna y minimalista de Planning Poker para equipos ágiles, construida con React, Firebase y Tailwind CSS.

## 🎯 Características

- ✨ **Diseño Minimalista**: Interfaz limpia y moderna sin elementos de casino
- 🌓 **Modo Claro/Oscuro**: Toggle funcional con persistencia
- 🎉 **Reacciones con Emojis**: Animaciones flotantes visibles para todos
- 🔄 **Tiempo Real**: Sincronización instantánea con Firebase Firestore
- 🔐 **Sin Login**: Solo ingresa tu nombre y comienza
- 📱 **Responsive**: Funciona perfectamente en móviles y escritorio
- 🎨 **Paleta Pastel**: Colores suaves y agradables a la vista

## 🚀 Stack Tecnológico

- **Frontend**: React 18 + Vite
- **Estilos**: Tailwind CSS
- **Backend**: Firebase (Firestore + Auth Anónima)
- **Animaciones**: Framer Motion
- **Iconos**: Lucide React
- **Routing**: React Router DOM
- **Hosting**: GitHub Pages

## 📋 Requisitos Previos

- Node.js 18 o superior
- npm o yarn
- Cuenta de Firebase (gratuita)
- Cuenta de GitHub (para deployment)

## 🛠️ Instalación

### 1. Clonar el repositorio

```bash
git clone <tu-repositorio>
cd planning-poker
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Configurar Firebase

1. Ve a [Firebase Console](https://console.firebase.google.com/)
2. Crea un nuevo proyecto
3. Habilita **Firestore Database** (modo de prueba está bien para empezar)
4. Habilita **Authentication** → **Anonymous**
5. En la configuración del proyecto, copia las credenciales

6. Edita `src/firebase.js` y reemplaza con tus credenciales:

```javascript
const firebaseConfig = {
  apiKey: "TU_API_KEY",
  authDomain: "TU_PROJECT_ID.firebaseapp.com",
  projectId: "TU_PROJECT_ID",
  storageBucket: "TU_PROJECT_ID.appspot.com",
  messagingSenderId: "TU_MESSAGING_SENDER_ID",
  appId: "TU_APP_ID"
};
```

### 4. Configurar reglas de Firestore

En Firebase Console → Firestore Database → Reglas, usa:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /rooms/{roomId} {
      allow read, write: if request.auth != null;
      
      match /users/{userId} {
        allow read, write: if request.auth != null;
      }
      
      match /reactions/{reactionId} {
        allow read, write: if request.auth != null;
      }
    }
  }
}
```

## 🏃‍♂️ Desarrollo Local

```bash
npm run dev
```

La aplicación estará disponible en `http://localhost:5173`

## 📦 Build para Producción

```bash
npm run build
```

Los archivos optimizados estarán en la carpeta `dist/`

## 🌐 Deploy a GitHub Pages

### Opción 1: GitHub Actions (Recomendado)

1. Asegúrate de que `vite.config.js` tenga el `base` correcto:
   ```javascript
   base: '/planning-poker/', // Cambia 'planning-poker' por el nombre de tu repo
   ```

2. Sube tu código a GitHub:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/TU_USUARIO/planning-poker.git
   git push -u origin main
   ```

3. En GitHub, ve a **Settings** → **Pages**
4. En **Source**, selecciona **GitHub Actions**
5. El workflow `.github/workflows/deploy.yml` se ejecutará automáticamente

### Opción 2: Manual con gh-pages

```bash
npm run deploy
```

## 📖 Uso

### Crear una Sala

1. Ingresa tu nombre
2. Haz clic en "Crear Nueva Sala"
3. Comparte el ID de la sala (4 caracteres) con tu equipo

### Unirse a una Sala

1. Ingresa tu nombre
2. Haz clic en "Unirse a una Sala"
3. Ingresa el ID de la sala
4. Haz clic en "Entrar a la Sala"

### Votar

1. Selecciona una carta de la secuencia Fibonacci
2. Espera a que todos voten
3. Haz clic en "Revelar Cartas" para ver los resultados
4. El promedio se calcula automáticamente

### Reacciones

Usa los botones de emojis (🎉, 👍, 🔥, 🤔) para reaccionar durante la sesión.

## 🎨 Personalización

### Cambiar Colores

Edita `tailwind.config.js`:

```javascript
colors: {
  primary: {
    light: '#TU_COLOR',
    DEFAULT: '#TU_COLOR',
    dark: '#TU_COLOR',
  },
  // ...
}
```

### Cambiar Secuencia de Votación

Edita `src/components/PokerTable.jsx`:

```javascript
const FIBONACCI = [0, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, '?'];
// Cambia a tu secuencia preferida
```

## 🏗️ Estructura del Proyecto

```
planning-poker/
├── .github/
│   └── workflows/
│       └── deploy.yml          # GitHub Actions workflow
├── src/
│   ├── components/
│   │   ├── Card.jsx            # Componente de carta
│   │   ├── CreateJoinScreen.jsx # Pantalla de inicio
│   │   ├── EmojiReaction.jsx   # Sistema de reacciones
│   │   ├── PokerTable.jsx      # Mesa principal
│   │   └── ThemeToggle.jsx     # Toggle de tema
│   ├── App.jsx                 # Componente principal
│   ├── firebase.js             # Configuración de Firebase
│   ├── index.css               # Estilos globales
│   └── main.jsx                # Punto de entrada
├── index.html
├── package.json
├── tailwind.config.js          # Configuración de Tailwind
├── vite.config.js              # Configuración de Vite
└── README.md
```

## 🔧 Solución de Problemas

### Error: Firebase not configured
- Verifica que hayas configurado correctamente `src/firebase.js`
- Asegúrate de haber habilitado Firestore y Auth Anónima

### Error: Permission denied
- Revisa las reglas de Firestore
- Asegúrate de que la autenticación anónima esté habilitada

### Las rutas no funcionan en GitHub Pages
- Verifica que `base` en `vite.config.js` coincida con el nombre de tu repositorio
- Asegúrate de que `basename` en `App.jsx` sea el mismo

### Los estilos no se aplican
- Ejecuta `npm run build` de nuevo
- Limpia la caché del navegador

## 📝 Licencia

MIT License - Siéntete libre de usar este proyecto para tus equipos.

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Por favor:

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📧 Contacto

Si tienes preguntas o sugerencias, no dudes en abrir un issue.

---

Hecho con ❤️ para equipos ágiles
