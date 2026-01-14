# 📁 Estructura del Proyecto Planning Poker

Este documento describe la estructura completa del proyecto y la función de cada archivo.

## 🌳 Árbol de Directorios

```
planning-poker/
├── .github/
│   └── workflows/
│       └── deploy.yml              # GitHub Actions para deploy automático
├── src/
│   ├── components/
│   │   ├── Card.jsx                # Componente de carta de votación
│   │   ├── CreateJoinScreen.jsx    # Pantalla de inicio/bienvenida
│   │   ├── EmojiReaction.jsx       # Sistema de reacciones con emojis
│   │   ├── PokerTable.jsx          # Mesa principal de votación
│   │   └── ThemeToggle.jsx         # Toggle de modo claro/oscuro
│   ├── App.jsx                     # Componente raíz de la aplicación
│   ├── firebase.js                 # Configuración de Firebase
│   ├── index.css                   # Estilos globales y Tailwind
│   └── main.jsx                    # Punto de entrada de React
├── .gitignore                      # Archivos ignorados por Git
├── ESTRUCTURA_PROYECTO.md          # Este archivo
├── GUIA_CONFIGURACION_FIREBASE.md  # Guía de configuración de Firebase
├── index.html                      # HTML principal
├── package.json                    # Dependencias y scripts
├── postcss.config.js               # Configuración de PostCSS
├── README.md                       # Documentación principal
├── tailwind.config.js              # Configuración de Tailwind CSS
└── vite.config.js                  # Configuración de Vite
```

---

## 📄 Descripción de Archivos

### Configuración del Proyecto

#### `package.json`
**Propósito**: Define las dependencias y scripts del proyecto.

**Dependencias principales**:
- `react` & `react-dom`: Framework de UI
- `react-router-dom`: Navegación entre páginas
- `firebase`: Backend y base de datos
- `framer-motion`: Animaciones suaves
- `lucide-react`: Iconos modernos
- `tailwindcss`: Framework de CSS

**Scripts**:
- `npm run dev`: Servidor de desarrollo
- `npm run build`: Compilar para producción
- `npm run preview`: Vista previa del build
- `npm run deploy`: Deploy a GitHub Pages

#### `vite.config.js`
**Propósito**: Configuración del bundler Vite.

**Configuraciones clave**:
```javascript
base: '/planning-poker/'  // Ruta base para GitHub Pages
```

#### `tailwind.config.js`
**Propósito**: Configuración de Tailwind CSS.

**Características**:
- Modo oscuro con clase (`darkMode: 'class'`)
- Paleta de colores pasteles personalizada
- Animaciones personalizadas (float-up, pulse-soft)
- Keyframes para emojis flotantes

#### `postcss.config.js`
**Propósito**: Configuración de PostCSS para procesar Tailwind.

---

### Archivos de Entrada

#### `index.html`
**Propósito**: HTML principal de la aplicación.

**Elementos clave**:
- Meta tags para SEO
- Div `#root` donde se monta React
- Script de entrada a `main.jsx`

#### `src/main.jsx`
**Propósito**: Punto de entrada de React.

**Función**:
- Importa React y ReactDOM
- Monta el componente `App` en el DOM
- Envuelve en `StrictMode` para desarrollo

---

### Componente Principal

#### `src/App.jsx`
**Propósito**: Componente raíz que maneja el routing y estado global.

**Responsabilidades**:
- Autenticación anónima con Firebase
- Gestión del nombre de usuario (localStorage)
- Configuración de React Router
- Renderizado del ThemeToggle

**Rutas**:
- `/`: Pantalla de crear/unirse
- `/room/:roomId`: Mesa de votación
- `*`: Redirección a inicio

---

### Firebase

#### `src/firebase.js`
**Propósito**: Configuración y utilidades de Firebase.

**Exportaciones**:
- `db`: Instancia de Firestore
- `auth`: Instancia de Authentication
- `signInAnonymous()`: Función de autenticación
- `generateRoomId()`: Genera IDs de sala aleatorios

**⚠️ Importante**: Debes reemplazar las credenciales con las de tu proyecto.

---

### Componentes

#### `src/components/CreateJoinScreen.jsx`
**Propósito**: Pantalla de bienvenida para crear o unirse a salas.

**Props**:
- `onSetUserName`: Callback para guardar el nombre del usuario

**Funcionalidades**:
- Input para nombre de usuario
- Botón para crear sala nueva
- Formulario para unirse con ID
- Validación de inputs
- Navegación a la sala

**Estado local**:
- `userName`: Nombre ingresado
- `roomId`: ID de sala para unirse
- `showJoin`: Toggle del formulario de unirse

---

#### `src/components/PokerTable.jsx`
**Propósito**: Mesa principal donde ocurre la votación.

**Props**:
- `userName`: Nombre del usuario actual

**Funcionalidades**:
- Sincronización en tiempo real con Firestore
- Selección de cartas Fibonacci
- Revelar/ocultar votos
- Cálculo automático de promedio
- Copiar link de la sala
- Sistema de reacciones
- Resetear votación

**Estado local**:
- `selectedCard`: Carta seleccionada por el usuario
- `isRevealed`: Si las cartas están reveladas
- `users`: Objeto con todos los usuarios de la sala
- `copied`: Estado del botón de copiar
- `average`: Promedio calculado

**Hooks de Firebase**:
- `onSnapshot` para escuchar cambios en tiempo real
- `setDoc` para crear/actualizar documentos
- `updateDoc` para actualizar campos específicos

---

#### `src/components/Card.jsx`
**Propósito**: Componente de carta de votación.

**Props**:
- `value`: Valor de la carta (número o '?')
- `isSelected`: Si está seleccionada
- `isRevealed`: Si está revelada
- `onClick`: Callback al hacer clic
- `isFlipped`: Si está boca abajo

**Variantes**:
- Carta seleccionable (para votar)
- Carta boca abajo (votó pero no revelado)
- Carta revelada (muestra el valor)

**Componente adicional**:
- `UserCard`: Muestra la carta de un usuario en la mesa

---

#### `src/components/EmojiReaction.jsx`
**Propósito**: Sistema de reacciones con emojis flotantes.

**Props**:
- `onReaction`: Callback cuando se hace clic en un emoji

**Funcionalidades**:
- 4 emojis predefinidos: 🎉, 👍, 🔥, 🤔
- Animación flotante con Framer Motion
- Posición X aleatoria
- Auto-eliminación después de 2 segundos
- Sincronización con Firebase (opcional)

**Estado local**:
- `floatingEmojis`: Array de emojis actualmente animándose

---

#### `src/components/ThemeToggle.jsx`
**Propósito**: Toggle para cambiar entre modo claro y oscuro.

**Funcionalidades**:
- Detecta preferencia del sistema
- Guarda preferencia en localStorage
- Aplica clase 'dark' al HTML
- Iconos animados (Sol/Luna)
- Posición fija en la esquina superior derecha

**Estado local**:
- `isDark`: Si el modo oscuro está activo

---

### Estilos

#### `src/index.css`
**Propósito**: Estilos globales y utilidades de Tailwind.

**Capas**:

1. **Base**: Estilos del body
   - Gradiente de fondo
   - Colores de texto
   - Transiciones

2. **Components**: Clases reutilizables
   - `.card-base`: Tarjetas con sombra
   - `.btn-primary`: Botón principal
   - `.btn-secondary`: Botón secundario
   - `.input-base`: Input estilizado
   - `.poker-card`: Carta de poker
   - `.poker-card-selected`: Carta seleccionada
   - `.poker-card-back`: Carta boca abajo
   - `.poker-card-front`: Carta boca arriba

3. **Utilities**: Animaciones personalizadas
   - `@keyframes floatUp`: Animación de emojis
   - `.emoji-float`: Clase para emojis flotantes

---

### Deployment

#### `.github/workflows/deploy.yml`
**Propósito**: Workflow de GitHub Actions para deploy automático.

**Proceso**:
1. **Build Job**:
   - Checkout del código
   - Setup de Node.js 18
   - Instalación de dependencias
   - Build del proyecto
   - Upload del artifact

2. **Deploy Job**:
   - Deploy a GitHub Pages
   - Usa el artifact del build job

**Trigger**: Push a la rama `main`

---

## 🔄 Flujo de Datos

### 1. Autenticación
```
App.jsx (useEffect)
  → signInAnonymous()
  → Firebase Auth
  → Usuario anónimo creado
  → UID guardado en auth.currentUser
```

### 2. Crear Sala
```
CreateJoinScreen
  → generateRoomId()
  → navigate(`/room/${roomId}`)
  → PokerTable se monta
  → setDoc() crea documento en Firestore
```

### 3. Votación
```
Usuario selecciona carta
  → handleCardSelect()
  → updateDoc() actualiza voto en Firestore
  → onSnapshot() detecta cambio
  → Todos los usuarios ven actualización
```

### 4. Revelar Cartas
```
Usuario hace clic en "Revelar"
  → handleReveal()
  → setDoc() actualiza revealed: true
  → onSnapshot() detecta cambio
  → Cartas se voltean para todos
  → Promedio se calcula automáticamente
```

---

## 🎨 Sistema de Temas

### Modo Claro
- Fondo: Gradiente pastel (azul → blanco → rosa)
- Texto: Gris oscuro
- Tarjetas: Blanco con sombra

### Modo Oscuro
- Fondo: Gradiente oscuro (gris-900 → gris-800)
- Texto: Gris claro
- Tarjetas: Gris-800 con borde gris-700

### Implementación
```javascript
// ThemeToggle.jsx
document.documentElement.classList.add('dark')  // Activar
document.documentElement.classList.remove('dark')  // Desactivar

// Tailwind
className="bg-white dark:bg-gray-800"  // Condicional
```

---

## 📊 Estructura de Datos en Firestore

```javascript
rooms/
  {roomId}/  // Ej: "AB12"
    revealed: boolean
    
    users/
      {userId}/  // UID de Firebase Auth
        name: string
        vote: number | null
        joinedAt: timestamp
    
    reactions/
      {reactionId}/  // Auto-generado
        emoji: string
        userId: string
        userName: string
        timestamp: timestamp
```

---

## 🔐 Seguridad

### Reglas de Firestore
- Solo usuarios autenticados pueden leer/escribir
- Autenticación anónima habilitada
- Sin validación de datos (puedes agregar)

### Mejoras Recomendadas
1. Validar estructura de datos en reglas
2. Limitar tamaño de nombres de usuario
3. Rate limiting para prevenir spam
4. Limpiar salas antiguas (Cloud Functions)

---

## 🚀 Optimizaciones Futuras

### Performance
- [ ] Lazy loading de componentes
- [ ] Memoización con React.memo
- [ ] Debounce en actualizaciones
- [ ] Índices en Firestore

### Funcionalidades
- [ ] Historial de votaciones
- [ ] Exportar resultados
- [ ] Roles (facilitador/participante)
- [ ] Timer para votaciones
- [ ] Temas personalizados
- [ ] Sonidos de notificación

### UX
- [ ] Tutorial interactivo
- [ ] Atajos de teclado
- [ ] Modo espectador
- [ ] Estadísticas de la sala

---

## 📚 Recursos de Aprendizaje

- **React**: [react.dev](https://react.dev)
- **Vite**: [vitejs.dev](https://vitejs.dev)
- **Tailwind**: [tailwindcss.com](https://tailwindcss.com)
- **Firebase**: [firebase.google.com/docs](https://firebase.google.com/docs)
- **Framer Motion**: [framer.com/motion](https://www.framer.com/motion)

---

¿Preguntas sobre la estructura? Consulta el README.md o abre un issue.
