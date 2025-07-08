import { NumpadProvider } from './contexts/NumpadProvider';
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './views/Home';
import Settings from './views/Settings';
import WifiSettings from './views/WifiSettings';
import TestSyringe from './views/TestSyringe';

function App() {
  return (
    <div className="min-h-screen min-w-full flex items-center justify-center bg-black">
      <div className="w-[1338px] h-[768px] bg-white mx-auto my-0 flex flex-col overflow-hidden relative" style={{ boxSizing: 'content-box' }}>
        <NumpadProvider>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/wifi" element={<WifiSettings />} />
            <Route path="/testsyringe" element={<TestSyringe />} />
            {/* Redirección para rutas desconocidas */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </NumpadProvider>
      </div>
    </div>
  );
}

export default App;
