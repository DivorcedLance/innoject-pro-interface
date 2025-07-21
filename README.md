# Innoject Pro UI – React Demo

Interfaz de usuario demo para máquina Innoject Pro, inspirada en pantalla táctil de tamaño fijo (1338x768 px).  
Incluye navegación, teclado numérico (NumPad) emergente tipo POS/industria, y componentes UI customizados.  
**Ideal para prototipos industriales, kioskos y hardware embebido.**

---

## 🚀 Características

- **Resolución fija:** Toda la interfaz está contenida en un área de 1338x768 px.
- **Teclado numérico personalizado:** Aparece desde la izquierda o derecha sobre la app, nunca fuera del área blanca.
- **Contexto global de NumPad:** Llama al teclado desde cualquier input usando un simple hook.
- **Navegación tipo app:** Usando [React Router](https://reactrouter.com/), sin recargas.
- **Componentes estilizados:** Basados en TailwindCSS para velocidad y consistencia visual.
- **Internacionalización completa:** Soporte para 12 idiomas con react-i18next.
- **No responsive:** Optimizado para hardware específico o simuladores.

---

## 🖥️ Instalación

1. **Clona el repositorio**
   ```sh
   git clone https://github.com/DivorcedLance/innoject-pro-interface.git
   cd innoject-pro-interface
   ```

2. **Instala dependencias**

   ```sh
   npm install
   # o
   yarn
   ```

3. **Arranca la app**

   ```sh
   npm run dev
   # o
   yarn dev
   ```

4. **Abre en tu navegador**

   * Navega a `http://localhost:5173` (Vite por defecto).
   * Verás la interfaz simulando la máquina.

---

## 🧩 Estructura del Proyecto

```
src/
  components/
    Counter.tsx
    Numpad.tsx
    ResponsiveContainer.tsx
    Toast.tsx
    icons/
      ArrowPoint.tsx
      BackSpace.tsx
      Check.tsx
      Reset.tsx
      SettingsIcons.tsx
  contexts/
    LanguageContext.ts
    LanguageProvider.tsx
    NumpadContext.ts
    NumpadProvider.tsx
    ToastContext.ts
    ToastProvider.tsx
    useLanguage.ts
    useNumpad.ts
    useToast.ts
  i18n/
    index.ts             # Configuración de react-i18next
    locales/
      en.json           # Inglés
      es.json           # Español
      fr.json           # Francés
      de.json           # Alemán
      it.json           # Italiano
      pt.json           # Portugués
      nl.json           # Holandés
      sv.json           # Sueco
      ru.json           # Ruso
      ja.json           # Japonés
      ko.json           # Coreano
      zh-CN.json        # Chino simplificado
  views/
    Home.tsx
    Languages.tsx
    Settings.tsx
    TestSyringe.tsx
    WifiSettings.tsx
    demo/
      CounterDemo.tsx
      NumPadDemo.tsx
      TestView.tsx
  assets/
    # imágenes, SVGs e iconos
  types/
    css.d.ts
  App.tsx
  main.tsx
```

---

## 📝 Uso del NumPad desde cualquier input

```tsx
import { useNumpad } from '../contexts/useNumpad';

const { openNumpad } = useNumpad();

const handleInput = () => {
  openNumpad({
    initialValue: valorActual,
    side: 'left', // o 'right'
    onEnter: newValue => setValorActual(newValue),
  });
};
```

El NumPad aparecerá pegado al borde izquierdo o derecho del área blanca, no del navegador.

---

## 🌍 Sistema de Internacionalización (i18n)

### Idiomas Soportados

El proyecto incluye soporte completo para **12 idiomas**:

| Código | Idioma | Bandera | Estado |
|--------|--------|---------|--------|
| **en** | English | 🇺🇸 | ✅ Completo |
| **es** | Español | 🇪🇸 | ✅ Completo |
| **fr** | Français | 🇫🇷 | ✅ Completo |
| **de** | Deutsch | 🇩🇪 | ✅ Completo |
| **it** | Italiano | 🇮🇹 | ✅ Completo |
| **pt** | Português | 🇵🇹 | ✅ Completo |
| **nl** | Nederlands | 🇳🇱 | ✅ Completo |
| **sv** | Svenska | 🇸🇪 | ✅ Completo |
| **ru** | Русский | 🇷🇺 | ✅ Completo |
| **ja** | 日本語 | 🇯🇵 | ✅ Completo |
| **ko** | 한국어 | 🇰🇷 | ✅ Completo |
| **zh-CN** | 中文(简体) | 🇨🇳 | ✅ Completo |

### Características del Sistema i18n

- **🔄 Detección automática:** Detecta el idioma del navegador al cargar
- **💾 Persistencia:** Guarda la selección en localStorage
- **🔙 Fallback:** Inglés como idioma por defecto si falta una traducción
- **🌐 Cambio dinámico:** Cambia idioma sin recargar la página
- **📱 Contexto global:** Disponible en toda la aplicación
- **🏭 Terminología especializada:** Traducciones técnicas para equipos industriales

### Uso básico del sistema i18n

```tsx
import { useTranslation } from 'react-i18next';

function MiComponente() {
  const { t } = useTranslation();
  
  return (
    <div>
      <h1>{t('common.home')}</h1>
      <p>{t('settings.title')}</p>
      <p>{t('counters.total', { count: 150 })}</p>
    </div>
  );
}
```

### Cambiar idioma programáticamente

```tsx
import { useLanguage } from '../contexts/useLanguage';

function SelectorIdioma() {
  const { selectedLanguage, setSelectedLanguage } = useLanguage();
  
  return (
    <button onClick={() => setSelectedLanguage('es')}>
      Cambiar a Español
    </button>
  );
}
```

### Estructura de archivos de traducción

Cada archivo de idioma sigue esta estructura:

```json
{
  "common": {
    "home": "Inicio",
    "settings": "Configuración",
    "back": "Atrás",
    "save": "Guardar"
  },
  "counters": {
    "daily": "Contador Diario",
    "total": "Total: {{count}} unidades",
    "partial": "Contador Parcial"
  },
  "settings": {
    "title": "Configuración del Sistema",
    "disinfection": "Ciclo de Desinfección",
    "injection": "Parámetros de Inyección"
  },
  "notifications": {
    "saved": "Configuración guardada correctamente",
    "error": "Error al guardar la configuración"
  }
}
```

### Agregar un nuevo idioma

1. **Crear archivo de traducciones:**
   ```bash
   # Crear nuevo archivo en src/i18n/locales/
   touch src/i18n/locales/ar.json  # Ejemplo: árabe
   ```

2. **Copiar estructura base:**
   ```bash
   # Usar archivo existente como plantilla
   cp src/i18n/locales/en.json src/i18n/locales/ar.json
   ```

3. **Actualizar configuración i18n:**
   ```typescript
   // src/i18n/index.ts
   import ar from './locales/ar.json';
   
   const resources = {
     // ... idiomas existentes
     ar: { translation: ar }
   };
   ```

4. **Actualizar contexto de idiomas:**
   ```typescript
   // src/contexts/LanguageContext.ts
   export const LANGUAGES: Language[] = [
     // ... idiomas existentes
     { code: "ar", name: "العربية" },
   ];
   ```

5. **Añadir a la vista de selección:**
   ```typescript
   // src/views/Languages.tsx
   const LANGUAGES: Language[] = [
     // ... idiomas existentes
     { code: "ar", name: "العربية", flag: "🇸🇦" },
   ];
   ```

### Interpolación y variables dinámicas

Para textos con variables:

```json
{
  "injection": {
    "completed": "Inyección completada: {{count}} de {{total}} animales",
    "rate": "Velocidad: {{rate}} inyecciones/minuto"
  }
}
```

```tsx
// Uso en componentes
{t('injection.completed', { count: 45, total: 100 })}
{t('injection.rate', { rate: 12.5 })}
```

### Pluralización

```json
{
  "animals": {
    "count_one": "{{count}} animal procesado",
    "count_other": "{{count}} animales procesados"
  }
}
```

```tsx
// Se selecciona automáticamente según el número
{t('animals.count', { count: chickens })}
```

---

## 🛠️ Personalización

* **Pantalla fija:** Cambia los valores de `w-[1338px] h-[768px]` si usas otra resolución.
* **Animación del NumPad:** Se controla con Framer Motion en `Numpad.tsx`.
* **Estilos:** Todo con TailwindCSS.
* **Navegación:** Puedes agregar más rutas fácilmente en `App.tsx`.

---

## 🧪 Requisitos

* Node.js 18+
* NPM 9+ o Yarn
* [Vite](https://vitejs.dev/) (ya incluido como dev dependency)
* TailwindCSS 4+
* Framer Motion
* React 19+
* React Router DOM 7+
* react-i18next (para internacionalización)

### Dependencias principales

```json
{
  "react": "^19.1.0",
  "react-dom": "^19.1.0",
  "react-router-dom": "^7.6.3",
  "react-i18next": "^15.6.0",
  "i18next": "^25.3.2",
  "i18next-browser-languagedetector": "^8.2.0",
  "framer-motion": "^12.23.0",
  "tailwindcss": "^4.1.11",
  "lucide-react": "^0.525.0"
}
```

---

## 🔧 Características Técnicas Avanzadas

### Sistema de Contextos

El proyecto utiliza múltiples contextos de React para gestionar el estado global:

#### 🔢 NumpadContext
- **Propósito:** Gestiona el teclado numérico emergente
- **Funcionalidades:** Posicionamiento, valores, callbacks
- **Hook:** `useNumpad()`

```tsx
const { openNumpad, closeNumpad, isOpen } = useNumpad();

openNumpad({
  initialValue: "100",
  side: 'left',
  onEnter: (value) => console.log('Nuevo valor:', value),
  onCancel: () => console.log('Cancelado')
});
```

#### 🌍 LanguageContext
- **Propósito:** Gestiona el idioma seleccionado
- **Funcionalidades:** Cambio de idioma, persistencia
- **Hook:** `useLanguage()`

```tsx
const { selectedLanguage, setSelectedLanguage, availableLanguages } = useLanguage();
```

#### 🍞 ToastContext
- **Propósito:** Sistema de notificaciones
- **Funcionalidades:** Mensajes temporales, diferentes tipos
- **Hook:** `useToast()`

```tsx
const { showToast } = useToast();

showToast('Configuración guardada', 'success');
showToast('Error de conexión', 'error');
```

### Componentes Especializados

#### ResponsiveContainer
- **Función:** Mantiene la resolución fija de 1338x768px
- **Característica:** Escala automáticamente según el tamaño de pantalla
- **Uso:** Envuelve toda la aplicación

#### Numpad Inteligente
- **Animaciones:** Framer Motion para entradas/salidas suaves
- **Posicionamiento:** Izquierda o derecha según disponibilidad de espacio
- **Validación:** Integrada con patrones numéricos
- **Accesibilidad:** Soporte para teclado físico

### Optimizaciones de Rendimiento

- **Code Splitting:** Rutas lazy-loaded automáticamente
- **Bundle Optimization:** Vite con tree-shaking habilitado
- **Asset Optimization:** Imágenes y SVGs optimizados
- **Context Isolation:** Contextos separados para evitar re-renders innecesarios

### Configuración de Desarrollo

```bash
# Instalar dependencias
npm install

# Desarrollo con hot reload
npm run dev

# Build para producción
npm run build

# Preview del build
npm run preview

# Linting
npm run lint
```

### Variables de Entorno

```env
# .env.local
VITE_DEFAULT_LANGUAGE=es
VITE_RESOLUTION_WIDTH=1338
VITE_RESOLUTION_HEIGHT=768
```

---

## 📚 Documentación Adicional

- **[Guía de i18n](./I18N_GUIDE.md)**: Documentación completa del sistema de internacionalización
- **[Soporte Multiidioma](./MULTILANG_SUPPORT.md)**: Detalles sobre idiomas soportados y traducciones

---

## 🚀 Deploy y Distribución

### Build para Producción

```bash
npm run build
```

### Deploy en Servidor Web

Los archivos generados en `dist/` pueden servirse desde cualquier servidor web estático:

- **Nginx**
- **Apache**
- **IIS**
- **Vercel**
- **Netlify**

### Configuración para Hardware Embebido

Para usar en dispositivos con navegador embebido:

1. **Compilar para producción**
2. **Configurar resolución fija en el navegador**
3. **Desactivar scrollbars del navegador**
4. **Configurar fullscreen automático**

```javascript
// Para navegadores embebidos
document.documentElement.style.overflow = 'hidden';
document.body.style.overflow = 'hidden';
```

---

## 🤝 Aportes

¿Ideas, mejoras, o quieres integrar con hardware real?
¡Haz un fork o abre un Issue!

---

## 💡 Mejores Prácticas

### Para Desarrollo
- **Siempre usar hooks:** Utiliza `useNumpad()`, `useLanguage()`, `useToast()` en lugar de acceso directo a contextos
- **Traducciones consistentes:** Usa claves descriptivas y mantén la estructura jerárquica
- **Testing multiidioma:** Prueba la aplicación en diferentes idiomas antes de hacer deploy
- **Resolución fija:** Respeta siempre la resolución de 1338x768px para mantener compatibilidad

### Para Producción
- **Pre-carga de idiomas:** Considera pre-cargar idiomas frecuentes
- **Fallbacks robustos:** Siempre ten fallback al inglés
- **Caché de traducciones:** Implementa caché para mejorar rendimiento
- **Monitoreo:** Vigila errores de traducciones faltantes

### Para Hardware Embebido
- **Memoria limitada:** Considera cargar solo idiomas necesarios
- **Offline first:** Asegúrate que funcione sin conexión
- **Touch optimizado:** Testea en pantallas táctiles reales
- **Startup rápido:** Optimiza tiempo de carga inicial

---

## 🔧 Troubleshooting

### Problemas Comunes

#### El NumPad no aparece
```bash
# Verifica que el contexto esté disponible
console.log(useNumpad()); // Debe retornar objeto con openNumpad
```

#### Traducciones no cargan
```bash
# Verifica archivos de traducción
ls src/i18n/locales/  # Deben existir todos los archivos .json
```

#### Resolución incorrecta
```bash
# Verifica ResponsiveContainer
# Debe envolver App.tsx con las dimensiones correctas
```

#### Idioma no cambia
```bash
# Limpiar localStorage
localStorage.removeItem('innoject-language');
```

### Debug Mode

```typescript
// Activar debug de i18next
localStorage.setItem('debug', 'i18next:*');
// Recargar página para ver logs detallados
```

### Performance Issues

```bash
# Analizar bundle
npm run build
npx vite-bundle-analyzer dist

# Optimizar imágenes
# Convertir PNG a WebP cuando sea posible
# Usar SVG para iconos simples
```

---

## 📈 Roadmap

### Versión 2.1 (Próxima)
- [ ] Más idiomas (árabe, hindi, polaco)
- [ ] Modo oscuro/claro
- [ ] Animaciones mejoradas
- [ ] PWA capabilities

### Versión 2.2
- [ ] Soporte para tablets
- [ ] Gestos táctiles avanzados
- [ ] Integración con APIs reales
- [ ] Dashboard de estadísticas

### Versión 3.0
- [ ] IA para optimización automática
- [ ] Reconocimiento por voz
- [ ] Realidad aumentada para mantenimiento
- [ ] Conectividad IoT

---

## 📄 Licencia

MIT

---
