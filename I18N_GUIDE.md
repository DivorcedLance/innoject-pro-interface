# Internationalization (i18n) Implementation

Este proyecto ahora incluye un sistema completo de internacionalización usando `react-i18next`.

## Estructura

```
src/
├── i18n/
│   ├── index.ts          # Configuración principal de i18n
│   └── locales/
│       ├── en.json       # Traducciones en inglés
│       ├── es.json       # Traducciones en español
│       ├── fr.json       # Traducciones en francés
│       ├── de.json       # Traducciones en alemán
│       ├── it.json       # Traducciones en italiano
│       └── pt.json       # Traducciones en portugués
├── contexts/
│   ├── LanguageContext.ts
│   ├── LanguageProvider.tsx
│   └── useLanguage.ts
└── views/
    ├── Home.tsx          # Actualizado para usar i18n
    ├── Settings.tsx      # Actualizado para usar i18n
    ├── Languages.tsx     # Actualizado para usar i18n
    └── TestSyringe.tsx   # Actualizado para usar i18n
```

## Cómo usar

### 1. En componentes de React

```tsx
import { useTranslation } from 'react-i18next';

function MyComponent() {
  const { t } = useTranslation();
  
  return (
    <div>
      <h1>{t('common.home')}</h1>
      <p>{t('home.title')}</p>
      <p>{t('home.injectionReached', { count: 10 })}</p>
    </div>
  );
}
```

### 2. Cambiar idioma

```tsx
import { useLanguage } from '../contexts/useLanguage';

function LanguageSelector() {
  const { selectedLanguage, setSelectedLanguage } = useLanguage();
  
  return (
    <button onClick={() => setSelectedLanguage('es')}>
      Cambiar a Español
    </button>
  );
}
```

## Agregar nuevas traducciones

1. Agregar la clave en `src/i18n/locales/en.json`:
```json
{
  "mySection": {
    "myKey": "My English text"
  }
}
```

2. Agregar la traducción en `src/i18n/locales/es.json`:
```json
{
  "mySection": {
    "myKey": "Mi texto en español"
  }
}
```

3. Usar en el componente:
```tsx
const { t } = useTranslation();
return <span>{t('mySection.myKey')}</span>;
```

## Agregar un nuevo idioma

Para agregar un nuevo idioma al sistema:

1. **Crear archivo de traducciones**: Crear un nuevo archivo en `src/i18n/locales/` (ej: `ja.json` para japonés)
2. **Copiar estructura**: Usar como plantilla cualquier archivo existente y traducir todos los textos
3. **Actualizar configuración i18n**: En `src/i18n/index.ts`, importar y agregar al objeto `resources`
4. **Actualizar contexto**: En `src/contexts/LanguageContext.ts`, agregar el idioma al array `LANGUAGES`
5. **Actualizar vista de idiomas**: En `src/views/Languages.tsx`, agregar el idioma con su bandera correspondiente

Ejemplo para agregar japonés:

```typescript
// src/contexts/LanguageContext.ts
export const LANGUAGES: Language[] = [
  // ... idiomas existentes
  { code: "ja", name: "日本語" },
];

// src/i18n/index.ts
import ja from './locales/ja.json';

const resources = {
  // ... recursos existentes
  ja: { translation: ja }
};

// src/views/Languages.tsx
const LANGUAGES: Language[] = [
  // ... idiomas existentes
  { code: "ja", name: "日本語", flag: "🇯🇵" },
];
```

## Interpolación

Para textos con variables:

```json
{
  "welcome": "Bienvenido {{name}}, tienes {{count}} mensajes"
}
```

```tsx
{t('welcome', { name: 'Juan', count: 5 })}
```

## Características implementadas

- ✅ Configuración automática de idioma basada en localStorage
- ✅ Detección automática del idioma del navegador
- ✅ Persistencia del idioma seleccionado
- ✅ Todos los textos de la interfaz traducidos
- ✅ Integración con el contexto de idioma existente
- ✅ Soporte para interpolación de variables
- ✅ Fallback al inglés si falta una traducción

## Idiomas soportados

- **English (en)**: Inglés 🇺🇸
- **Español (es)**: Español 🇪🇸
- **Français (fr)**: Francés 🇫🇷
- **Deutsch (de)**: Alemán 🇩🇪
- **Italiano (it)**: Italiano 🇮🇹
- **Português (pt)**: Portugués 🇵🇹

## Archivos modificados

- `src/main.tsx` - Importa la configuración de i18n
- `src/contexts/LanguageProvider.tsx` - Integrado con i18next
- `src/views/Home.tsx` - Convertido a usar traducciones
- `src/views/Settings.tsx` - Convertido a usar traducciones
- `src/views/Languages.tsx` - Convertido a usar traducciones
- `src/views/TestSyringe.tsx` - Convertido a usar traducciones

El sistema está totalmente funcional y listo para producción.
