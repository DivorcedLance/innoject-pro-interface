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
- **No responsive:** Optimizado para hardware específico o simuladores.

---

## 🖥️ Instalación

1. **Clona el repositorio**
   ```sh
   git clone https://github.com/tu-usuario/innoject-ui-demo.git
   cd innoject-ui-demo
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
    icons/
  contexts/
    NumpadContext.ts
    NumpadProvider.tsx
    useNumpad.ts
  views/
    Home.tsx
    WifiSettings.tsx
    TestSyringe.tsx
    Settings.tsx
  assets/
    # imágenes y SVGs
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
* TailwindCSS
* Framer Motion

---

## 🤝 Aportes

¿Ideas, mejoras, o quieres integrar con hardware real?
¡Haz un fork o abre un Issue!

---

## 📄 Licencia

MIT

---
