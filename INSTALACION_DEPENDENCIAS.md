# 📦 Instalación de Dependencias

Debido a las políticas de ejecución de PowerShell en tu sistema, necesitas instalar las dependencias manualmente.

## 🔧 Solución Rápida

### Opción 1: Usar CMD (Recomendado)

1. Abre **CMD** (Símbolo del sistema) como administrador
2. Navega al directorio del proyecto:
   ```cmd
   cd "c:\EGM\Genius Code\planning-poker"
   ```
3. Ejecuta:
   ```cmd
   npm install
   ```

### Opción 2: Cambiar Política de PowerShell (Temporal)

1. Abre **PowerShell** como administrador
2. Ejecuta:
   ```powershell
   Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope Process
   ```
3. Navega al directorio:
   ```powershell
   cd "c:\EGM\Genius Code\planning-poker"
   ```
4. Ejecuta:
   ```powershell
   npm install
   ```

### Opción 3: Usar Git Bash o Terminal de VS Code

1. Abre la terminal integrada de VS Code (Ctrl + `)
2. Cambia a Git Bash o CMD desde el selector de terminal
3. Ejecuta:
   ```bash
   npm install
   ```

## 📋 Dependencias que se Instalarán

### Producción
- `react@^18.2.0` - Framework de UI
- `react-dom@^18.2.0` - React para el DOM
- `react-router-dom@^6.20.0` - Navegación
- `firebase@^10.7.1` - Backend y base de datos
- `framer-motion@^10.16.16` - Animaciones
- `lucide-react@^0.294.0` - Iconos

### Desarrollo
- `@vitejs/plugin-react@^4.2.1` - Plugin de Vite para React
- `vite@^5.0.8` - Build tool
- `tailwindcss@^3.3.6` - Framework CSS
- `postcss@^8.4.32` - Procesador CSS
- `autoprefixer@^10.4.16` - Prefijos CSS automáticos
- `gh-pages@^6.1.0` - Deploy a GitHub Pages

## ✅ Verificar Instalación

Después de instalar, verifica que todo esté correcto:

```bash
npm list --depth=0
```

Deberías ver todas las dependencias listadas sin errores.

## 🚀 Siguiente Paso

Una vez instaladas las dependencias:

1. Configura Firebase (ver `GUIA_CONFIGURACION_FIREBASE.md`)
2. Ejecuta el proyecto:
   ```bash
   npm run dev
   ```

## ❓ Problemas Comunes

### Error: "Cannot find module"
**Solución**: Elimina `node_modules` y `package-lock.json`, luego ejecuta `npm install` de nuevo.

### Error: "EACCES: permission denied"
**Solución**: Ejecuta la terminal como administrador.

### Error: "npm ERR! code ENOENT"
**Solución**: Verifica que estás en el directorio correcto del proyecto.

## 📝 Instalación Manual (Última Opción)

Si ninguna opción funciona, puedes instalar las dependencias una por una:

```bash
npm install react react-dom
npm install react-router-dom
npm install firebase
npm install framer-motion
npm install lucide-react
npm install -D vite @vitejs/plugin-react
npm install -D tailwindcss postcss autoprefixer
npm install -D gh-pages
```

---

Una vez completada la instalación, continúa con `INICIO_RAPIDO.md` para configurar Firebase y ejecutar el proyecto.
