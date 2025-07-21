# AI Translation Integration Guide

Esta guía explica cómo usar la nueva funcionalidad de traducción automática con IA para generar traducciones en idiomas adicionales.

## 🤖 Características

- **Traducción automática** usando servicios de IA (OpenAI GPT, Google Translate)
- **Batch translation** para múltiples idiomas simultáneamente
- **Interfaz visual** intuitiva con preview de traducciones
- **Descarga automática** de archivos JSON de traducción
- **Progress tracking** en tiempo real
- **Error handling** robusto con reintentos

## 🚀 Cómo Usar

### 1. Acceder al Generador de Traducciones

1. Ve a la página de **Configuración de Idiomas**
2. Haz clic en el botón **"AI Translate"** (icono de robot) en la esquina superior derecha
3. Se abrirá el modal del Generador de Traducciones con IA

### 2. Configurar el Proveedor de IA

**Opción A: OpenAI GPT (Recomendado)**
- Selecciona "OpenAI GPT" como proveedor
- Ingresa tu clave API de OpenAI
- Obtén tu API key en: https://platform.openai.com/api-keys

**Opción B: Google Translate**
- Selecciona "Google Translate" como proveedor  
- Ingresa tu clave API de Google Cloud
- Obtén tu API key en: https://cloud.google.com/translate/docs/setup

### 3. Seleccionar Idiomas

Marca los idiomas que deseas generar desde la lista disponible:

- 🇸🇦 العربية (Arabic)
- 🇧🇬 Български (Bulgarian)
- 🇨🇿 Čeština (Czech)
- 🇩🇰 Dansk (Danish)
- 🇬🇷 Ελληνικά (Greek)
- 🇫🇮 Suomi (Finnish)
- 🇮🇳 हिन्दी (Hindi)
- 🇭🇺 Magyar (Hungarian)
- 🇳🇴 Norsk (Norwegian)
- 🇵🇱 Polski (Polish)
- 🇷🇴 Română (Romanian)
- 🇹🇭 ไทย (Thai)
- 🇹🇷 Türkçe (Turkish)
- 🇺🇦 Українська (Ukrainian)
- 🇻🇳 Tiếng Việt (Vietnamese)
- 🇹🇼 中文(繁體) (Chinese Traditional)

### 4. Generar Traducciones

1. Haz clic en **"Start Translation"**
2. El sistema traducirá automáticamente todas las claves desde el inglés
3. Puedes ver el progreso en tiempo real
4. Los idiomas completados aparecerán en el panel derecho

### 5. Revisar y Descargar

- **Preview**: Haz clic en el icono 👁️ para ver una muestra de la traducción
- **Download Individual**: Haz clic en 📥 para descargar un idioma específico
- **Download All**: Descarga todos los idiomas traducidos de una vez

## 📁 Estructura de Archivos

Los archivos generados tendrán la misma estructura que los existentes:

```json
{
  "common": {
    "home": "Traducción",
    "settings": "Traducción",
    // ...
  },
  "home": {
    "title": "Traducción",
    // ...
  },
  "settings": {
    "title": "Traducción",
    // ...
  }
  // ...
}
```

## 🔧 Integración en el Proyecto

### 1. Agregar el Archivo de Traducción

1. Descarga el archivo JSON generado (ej: `ar.json` para árabe)
2. Colócalo en `src/i18n/locales/`
3. Actualiza `src/i18n/index.ts`:

```typescript
// Agregar import
import ar from './locales/ar.json';

// Agregar al resources
const resources = {
  // ... idiomas existentes
  ar: {
    translation: ar
  }
};
```

### 2. Actualizar el Contexto de Idiomas

Actualiza `src/contexts/LanguageContext.ts`:

```typescript
export const LANGUAGES = [
  // ... idiomas existentes
  { code: 'ar', name: 'العربية' },
];
```

### 3. Actualizar la Vista de Idiomas

Actualiza `src/views/Languages.tsx`:

```typescript
const LANGUAGES: Language[] = [
  // ... idiomas existentes
  { code: "ar", name: "العربية", flag: "🇸🇦" },
];
```

## ⚙️ Configuración Técnica

### API Keys Requeridas

**OpenAI:**
- Crea una cuenta en https://platform.openai.com/
- Ve a API Keys y genera una nueva clave
- Modelo recomendado: `gpt-3.5-turbo` (más económico) o `gpt-4` (mejor calidad)

**Google Translate:**
- Crea un proyecto en Google Cloud Console
- Habilita la Translation API
- Crea credenciales de API Key
- Configura facturación (requerido para usar la API)

### Límites y Costos

**OpenAI GPT:**
- Costo: ~$0.002 por 1K tokens
- Límite: 3 RPM (tier gratuito)
- Delay automático entre solicitudes

**Google Translate:**
- Costo: $20 por 1M caracteres
- Límite: 100 solicitudes por segundo
- Procesamiento en lotes automático

## 🔍 Troubleshooting

### Error: "Translation failed"
- Verifica que la API key sea correcta
- Asegúrate de tener créditos/facturación configurada
- Revisa los límites de tasa de tu proveedor

### Error: "Language code not supported"
- Algunos idiomas pueden no estar disponibles en ciertos proveedores
- Verifica el mapeo en `LANGUAGE_CODES`

### Traducciones de baja calidad
- OpenAI GPT suele dar mejores resultados para contexto técnico
- Considera revisar manualmente las traducciones importantes
- Las claves técnicas específicas pueden necesitar ajustes

## 🛠️ Desarrollo y Extensión

### Agregar Nuevos Proveedores

1. Implementa la interfaz `TranslationProvider` en `translationService.ts`
2. Agrega el mapeo de códigos de idioma en `LANGUAGE_CODES`
3. Actualiza el selector en `AITranslationModal.tsx`

### Agregar Nuevos Idiomas

1. Agrega el idioma a `AVAILABLE_LANGUAGES` en `AITranslationModal.tsx`
2. Verifica el soporte en `LANGUAGE_CODES`
3. Prueba la traducción antes de agregar a producción

## 📝 Notas Importantes

- **Revisión Manual**: Las traducciones automáticas deben ser revisadas por hablantes nativos
- **Contexto Técnico**: Términos específicos de la aplicación pueden necesitar ajustes
- **Seguridad**: Las API keys se procesan localmente, no se almacenan
- **Backup**: Mantén copias de seguridad de las traducciones manuales

## 🎯 Próximas Mejoras

- [ ] Integración con más proveedores (DeepL, Azure Translator)
- [ ] Cache de traducciones para evitar re-traducciones
- [ ] Editor in-app para ajustar traducciones
- [ ] Validación automática de claves faltantes
- [ ] Export/import de traducciones en lote
