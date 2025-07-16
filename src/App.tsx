import { NumpadProvider } from "./contexts/NumpadProvider";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./views/Home";
import Settings from "./views/Settings";
//import WifiSettings from "./views/WifiSettings";
import TestSyringe from "./views/TestSyringe";
import { useToast } from "./contexts/useToast";
import { Toast } from "./components/Toast";
import { LanguageProvider } from "./contexts/LanguageProvider";

function App() {
  const { toasts, removeToast } = useToast();
  return (
    <div className="min-h-screen min-w-full w-full h-full flex items-center justify-center bg-black">
      <div
        className="w-[1338px] h-[768px] bg-white mx-auto my-0 flex flex-col overflow-auto relative"
        style={{ boxSizing: "content-box" }}
      >
        <LanguageProvider>
          <NumpadProvider>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/settings" element={<Settings />} />
              {/*             <Route path="/wifi" element={<WifiSettings />} />
               */}{" "}
              <Route path="/testsyringe" element={<TestSyringe />} />
              {/* Redirección para rutas desconocidas */}
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </NumpadProvider>
        </LanguageProvider>

        {/* Renderizar todos los toasts */}
        {toasts.map((toast) => (
          <Toast
            key={toast.id}
            {...toast}
            onClose={() => removeToast(toast.id)}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
