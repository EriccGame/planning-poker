# 🚀 Guía de Deploy a GitHub Pages

Esta guía te ayudará a desplegar tu aplicación Planning Poker en GitHub Pages usando el repositorio **EriccGame/planning-poker**.

## 📋 Pre-requisitos

- ✅ Cuenta de GitHub
- ✅ Git instalado en tu computadora
- ✅ Dependencias del proyecto instaladas (`npm install`)
- ✅ Firebase configurado (ver `GUIA_CONFIGURACION_FIREBASE.md`)

## 🔧 Paso 1: Inicializar Git y Subir a GitHub

### 1.1 Inicializar Git (si no lo has hecho)

Abre CMD o PowerShell en el directorio del proyecto:

```bash
cd "c:\EGM\Genius Code\planning-poker"
git init
```

### 1.2 Agregar archivos al repositorio

```bash
git add .
git commit -m "Initial commit: Planning Poker app"
```

### 1.3 Conectar con GitHub

```bash
git remote add origin https://github.com/EriccGame/planning-poker.git
git branch -M main
```

### 1.4 Subir el código

```bash
git push -u origin main
```

Si es la primera vez, te pedirá autenticación de GitHub.

## ⚙️ Paso 2: Configurar GitHub Pages

### 2.1 Ir a la configuración del repositorio

1. Ve a: https://github.com/EriccGame/planning-poker
2. Haz clic en **Settings** (Configuración)
3. En el menú lateral, haz clic en **Pages**

### 2.2 Configurar la fuente de deploy

1. En **Source** (Fuente), selecciona: **GitHub Actions**
2. No necesitas hacer nada más, el workflow ya está configurado

### 2.3 Verificar el workflow

1. Ve a la pestaña **Actions** en tu repositorio
2. Deberías ver un workflow llamado "Deploy to GitHub Pages"
3. Si hiciste push, debería estar ejecutándose automáticamente

## 🎯 Paso 3: Verificar el Deploy

### 3.1 Esperar a que termine el deploy

- El proceso toma aproximadamente 2-3 minutos
- Verás un check verde ✅ cuando termine exitosamente
- Si hay un error ❌, revisa los logs del workflow

### 3.2 Acceder a tu aplicación

Una vez completado, tu aplicación estará disponible en:

```
https://ericcgame.github.io/planning-poker/
```

## 🔄 Paso 4: Actualizaciones Futuras

Cada vez que hagas cambios y quieras actualizar la aplicación:

```bash
# 1. Hacer cambios en el código
# 2. Guardar los cambios
git add .
git commit -m "Descripción de los cambios"
git push

# El deploy se ejecutará automáticamente
```

## 📝 Configuración Actual del Proyecto

Tu proyecto ya está configurado para:

- ✅ **Base URL**: `/planning-poker/`
- ✅ **Repositorio**: `EriccGame/planning-poker`
- ✅ **URL de producción**: `https://ericcgame.github.io/planning-poker/`
- ✅ **GitHub Actions**: Configurado con versiones actualizadas

## 🧪 Probar Antes de Deploy

Antes de hacer push, puedes probar el build localmente:

```bash
# Compilar el proyecto
npm run build

# Vista previa del build
npm run preview
```

Esto te mostrará cómo se verá en producción.

## 🔍 Verificar Configuración

### Archivos Clave Configurados

1. **vite.config.js**
   ```javascript
   base: '/planning-poker/'  // ✅ Correcto
   ```

2. **src/App.jsx**
   ```javascript
   <BrowserRouter basename="/planning-poker">  // ✅ Correcto
   ```

3. **src/components/PokerTable.jsx**
   ```javascript
   const link = `https://ericcgame.github.io/planning-poker/room/${roomId}`;  // ✅ Correcto
   ```

## 🐛 Solución de Problemas

### Error: "Page not found" (404)

**Causa**: La configuración de base path no coincide.

**Solución**: Verifica que `vite.config.js` tenga `base: '/planning-poker/'`

### Error: "Blank page" (Página en blanco)

**Causa**: Rutas incorrectas o error de JavaScript.

**Solución**: 
1. Abre la consola del navegador (F12)
2. Revisa los errores
3. Verifica que Firebase esté configurado correctamente

### Error: GitHub Actions falla

**Causa**: Dependencias faltantes o error en el build.

**Solución**:
1. Ve a la pestaña **Actions** en GitHub
2. Haz clic en el workflow fallido
3. Revisa los logs para ver el error específico
4. Comúnmente es por Firebase no configurado

### Error: "Firebase not configured"

**Causa**: No has configurado las credenciales de Firebase.

**Solución**: 
1. Edita `src/firebase.js`
2. Reemplaza las credenciales con las de tu proyecto
3. Haz commit y push de nuevo

## 📊 Monitoreo del Deploy

### Ver el estado del deploy

1. Ve a: https://github.com/EriccGame/planning-poker/actions
2. Verás todos los deploys ejecutados
3. Haz clic en cualquiera para ver detalles

### Logs del deploy

Si algo falla, los logs te dirán exactamente qué pasó:
- **Build**: Errores de compilación
- **Deploy**: Errores al subir a GitHub Pages

## 🎉 ¡Listo!

Una vez completado el deploy, puedes:

1. **Compartir la URL**: `https://ericcgame.github.io/planning-poker/`
2. **Crear salas** y compartir el link con tu equipo
3. **Hacer cambios** y push para actualizar automáticamente

## 📱 Compartir con el Equipo

### Link de la aplicación
```
https://ericcgame.github.io/planning-poker/
```

### Link de una sala específica
```
https://ericcgame.github.io/planning-poker/room/AB12
```
(Reemplaza AB12 con el ID de tu sala)

## 🔐 Seguridad

- ✅ Las credenciales de Firebase en el código son seguras si configuras bien las reglas de Firestore
- ✅ GitHub Pages usa HTTPS automáticamente
- ✅ La autenticación anónima no expone datos sensibles

## 📚 Recursos Adicionales

- [GitHub Pages Docs](https://docs.github.com/en/pages)
- [GitHub Actions Docs](https://docs.github.com/en/actions)
- [Vite Deploy Guide](https://vitejs.dev/guide/static-deploy.html)

---

¿Necesitas ayuda? Abre un issue en el repositorio.
