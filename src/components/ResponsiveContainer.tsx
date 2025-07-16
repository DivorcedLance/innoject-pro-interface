import { useEffect, useState } from "react";

export const ResponsiveContainer = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [containerDimensions, setContainerDimensions] = useState({
    width: 1338,
    height: 768,
  });

  // Dimensiones originales
  const originalWidth = 1338;
  const originalHeight = 768;
  const aspectRatio = originalWidth / originalHeight; // 1.7421875

  // Calcular dimensiones que mantengan el aspect ratio
  useEffect(() => {
    const calculateDimensions = () => {
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;

      // Margen para evitar que toque los bordes
      const margin = 20;
      const availableWidth = viewportWidth - margin * 2;
      const availableHeight = viewportHeight - margin * 2;

      // Calcular dimensiones manteniendo aspect ratio
      let finalWidth, finalHeight;

      if (availableWidth / availableHeight > aspectRatio) {
        // La pantalla es más ancha que nuestro aspect ratio
        finalHeight = Math.min(availableHeight, originalHeight);
        finalWidth = finalHeight * aspectRatio;
      } else {
        // La pantalla es más alta que nuestro aspect ratio
        finalWidth = Math.min(availableWidth, originalWidth);
        finalHeight = finalWidth / aspectRatio;
      }

      setContainerDimensions({ width: finalWidth, height: finalHeight });
    };

    calculateDimensions();
    window.addEventListener("resize", calculateDimensions);

    return () => window.removeEventListener("resize", calculateDimensions);
  }, []);

  return (
    <div className="w-full min-h-screen bg-black flex items-center justify-center p-2">
      <div
        className="bg-white shadow-lg relative overflow-hidden"
        style={{
          width: `${containerDimensions.width}px`,
          height: `${containerDimensions.height}px`,
          maxWidth: "100vw",
          maxHeight: "100vh",
          transition: "all 0.3s ease",
        }}
      >
        <div
          className="w-full h-full flex flex-col"
          style={{
            transform: `scale(${containerDimensions.width / originalWidth})`,
            transformOrigin: "top left",
            width: `${originalWidth}px`,
            height: `${originalHeight}px`,
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
};
