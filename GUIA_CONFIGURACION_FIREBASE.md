# 🔥 Guía Completa de Configuración de Firebase

Esta guía te llevará paso a paso para configurar Firebase para tu aplicación de Planning Poker.

## 📋 Tabla de Contenidos

1. [Crear Proyecto en Firebase](#1-crear-proyecto-en-firebase)
2. [Configurar Firestore Database](#2-configurar-firestore-database)
3. [Habilitar Autenticación Anónima](#3-habilitar-autenticación-anónima)
4. [Obtener Credenciales](#4-obtener-credenciales)
5. [Configurar la Aplicación](#5-configurar-la-aplicación)
6. [Configurar Reglas de Seguridad](#6-configurar-reglas-de-seguridad)
7. [Verificar Configuración](#7-verificar-configuración)

---

## 1. Crear Proyecto en Firebase

1. Ve a [Firebase Console](https://console.firebase.google.com/)
2. Haz clic en **"Agregar proyecto"** o **"Add project"**
3. Ingresa un nombre para tu proyecto (ej: `planning-poker-app`)
4. (Opcional) Desactiva Google Analytics si no lo necesitas
5. Haz clic en **"Crear proyecto"**
6. Espera a que se complete la creación (toma unos segundos)
7. Haz clic en **"Continuar"**

---

## 2. Configurar Firestore Database

### Crear la Base de Datos

1. En el menú lateral, haz clic en **"Firestore Database"**
2. Haz clic en **"Crear base de datos"** o **"Create database"**
3. Selecciona el modo de inicio:
   - **Modo de producción**: Más seguro pero requiere configuración
   - **Modo de prueba**: Recomendado para empezar (puedes cambiar después)
4. Selecciona una ubicación (elige la más cercana a tus usuarios):
   - `us-central` (Estados Unidos)
   - `europe-west` (Europa)
   - `asia-southeast` (Asia)
5. Haz clic en **"Habilitar"** o **"Enable"**

### Estructura de Datos

La aplicación creará automáticamente esta estructura:

```
rooms/
  └── {roomId}/
      ├── revealed: boolean
      ├── users/
      │   └── {userId}/
      │       ├── name: string
      │       ├── vote: number | null
      │       └── joinedAt: timestamp
      └── reactions/
          └── {reactionId}/
              ├── emoji: string
              ├── userId: string
              ├── userName: string
              └── timestamp: timestamp
```

---

## 3. Habilitar Autenticación Anónima

1. En el menú lateral, haz clic en **"Authentication"**
2. Haz clic en **"Comenzar"** o **"Get started"**
3. Ve a la pestaña **"Sign-in method"**
4. Busca **"Anónimo"** o **"Anonymous"** en la lista
5. Haz clic en el toggle para habilitarlo
6. Haz clic en **"Guardar"** o **"Save"**

### ¿Por qué Autenticación Anónima?

- No requiere que los usuarios creen cuentas
- Permite identificar usuarios únicos en la sesión
- Necesario para las reglas de seguridad de Firestore
- Los usuarios pueden usar la app inmediatamente

---

## 4. Obtener Credenciales

1. En el menú lateral, haz clic en el ícono de **configuración** ⚙️
2. Selecciona **"Configuración del proyecto"** o **"Project settings"**
3. Desplázate hacia abajo hasta la sección **"Tus apps"**
4. Haz clic en el ícono **Web** `</>`
5. Ingresa un nombre para tu app (ej: `Planning Poker Web`)
6. **NO** marques "También configurar Firebase Hosting"
7. Haz clic en **"Registrar app"**
8. Copia el objeto `firebaseConfig` que aparece

Debería verse así:

```javascript
const firebaseConfig = {
  apiKey: "AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  authDomain: "tu-proyecto.firebaseapp.com",
  projectId: "tu-proyecto",
  storageBucket: "tu-proyecto.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abcdef123456"
};
```

---

## 5. Configurar la Aplicación

### Actualizar firebase.js

1. Abre el archivo `src/firebase.js` en tu proyecto
2. Reemplaza el objeto `firebaseConfig` con tus credenciales:

```javascript
// ANTES (valores de ejemplo)
const firebaseConfig = {
  apiKey: "TU_API_KEY",
  authDomain: "TU_PROJECT_ID.firebaseapp.com",
  projectId: "TU_PROJECT_ID",
  storageBucket: "TU_PROJECT_ID.appspot.com",
  messagingSenderId: "TU_MESSAGING_SENDER_ID",
  appId: "TU_APP_ID"
};

// DESPUÉS (con tus valores reales)
const firebaseConfig = {
  apiKey: "AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  authDomain: "planning-poker-app.firebaseapp.com",
  projectId: "planning-poker-app",
  storageBucket: "planning-poker-app.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abcdef123456"
};
```

3. Guarda el archivo

### ⚠️ Importante: Seguridad

- **NO** compartas estas credenciales públicamente
- **NO** las subas a repositorios públicos sin protección
- Considera usar variables de entorno para producción
- Las credenciales del cliente son seguras si configuras bien las reglas de Firestore

---

## 6. Configurar Reglas de Seguridad

### Reglas para Desarrollo (Modo de Prueba)

Si elegiste "Modo de prueba", tus reglas actuales permiten acceso completo por 30 días.

### Reglas para Producción (Recomendado)

1. Ve a **Firestore Database** → **Reglas**
2. Reemplaza las reglas existentes con:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Reglas para las salas de Planning Poker
    match /rooms/{roomId} {
      // Permitir lectura y escritura solo a usuarios autenticados
      allow read, write: if request.auth != null;
      
      // Reglas para usuarios dentro de una sala
      match /users/{userId} {
        allow read: if request.auth != null;
        allow write: if request.auth != null;
      }
      
      // Reglas para reacciones
      match /reactions/{reactionId} {
        allow read: if request.auth != null;
        allow create: if request.auth != null;
      }
    }
  }
}
```

3. Haz clic en **"Publicar"** o **"Publish"**

### Explicación de las Reglas

- `request.auth != null`: Solo usuarios autenticados (incluso anónimos) pueden acceder
- `allow read`: Permite leer datos
- `allow write`: Permite crear, actualizar y eliminar
- `allow create`: Solo permite crear nuevos documentos

### Reglas Más Restrictivas (Opcional)

Para mayor seguridad, puedes usar:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /rooms/{roomId} {
      allow read: if request.auth != null;
      allow create: if request.auth != null;
      
      match /users/{userId} {
        allow read: if request.auth != null;
        // Solo el propio usuario puede actualizar sus datos
        allow write: if request.auth != null && request.auth.uid == userId;
      }
      
      match /reactions/{reactionId} {
        allow read: if request.auth != null;
        allow create: if request.auth != null;
      }
    }
  }
}
```

---

## 7. Verificar Configuración

### Prueba Local

1. Ejecuta la aplicación:
   ```bash
   npm run dev
   ```

2. Abre `http://localhost:5173` en tu navegador

3. Abre la consola del navegador (F12)

4. Deberías ver:
   ```
   Usuario autenticado anónimamente: [algún-id-único]
   ```

5. Crea una sala y vota

6. Ve a Firebase Console → Firestore Database

7. Deberías ver la estructura de datos creada automáticamente

### Verificar en Firebase Console

1. Ve a **Firestore Database**
2. Deberías ver una colección `rooms`
3. Dentro, verás documentos con IDs de 4 caracteres (ej: `AB12`)
4. Cada sala tendrá subcolecciones `users` y `reactions`

### Verificar Autenticación

1. Ve a **Authentication** → **Users**
2. Deberías ver usuarios anónimos listados
3. Cada usuario tendrá un UID único

---

## 🔧 Solución de Problemas

### Error: "Firebase: Error (auth/invalid-api-key)"

**Solución**: Verifica que copiaste correctamente el `apiKey` de Firebase Console.

### Error: "Missing or insufficient permissions"

**Solución**: 
1. Verifica que la autenticación anónima esté habilitada
2. Revisa las reglas de Firestore
3. Asegúrate de que `request.auth != null` esté en las reglas

### Error: "Firebase: Firebase App named '[DEFAULT]' already exists"

**Solución**: Recarga la página. Esto ocurre cuando se inicializa Firebase múltiples veces.

### No se crean documentos en Firestore

**Solución**:
1. Verifica la consola del navegador para errores
2. Asegúrate de que las reglas permitan escritura
3. Verifica que la autenticación anónima funcione

### Los datos no se sincronizan en tiempo real

**Solución**:
1. Verifica tu conexión a internet
2. Revisa la consola para errores de Firebase
3. Asegúrate de que Firestore esté habilitado

---

## 📊 Monitoreo y Límites

### Plan Gratuito (Spark)

Firebase ofrece un plan gratuito generoso:

- **Firestore**: 
  - 1 GB de almacenamiento
  - 50,000 lecturas/día
  - 20,000 escrituras/día
  - 20,000 eliminaciones/día

- **Authentication**:
  - Usuarios ilimitados
  - 10,000 verificaciones/mes

### Monitorear Uso

1. Ve a **Firestore Database** → **Uso**
2. Revisa las métricas de lecturas/escrituras
3. Configura alertas si te acercas a los límites

---

## 🚀 Próximos Pasos

1. ✅ Configuración completada
2. 🧪 Prueba la aplicación localmente
3. 📱 Prueba en diferentes dispositivos
4. 🌐 Deploy a GitHub Pages
5. 👥 Comparte con tu equipo

---

## 📚 Recursos Adicionales

- [Documentación de Firebase](https://firebase.google.com/docs)
- [Guía de Firestore](https://firebase.google.com/docs/firestore)
- [Reglas de Seguridad](https://firebase.google.com/docs/firestore/security/get-started)
- [Autenticación Anónima](https://firebase.google.com/docs/auth/web/anonymous-auth)

---

¿Necesitas ayuda? Abre un issue en el repositorio del proyecto.
