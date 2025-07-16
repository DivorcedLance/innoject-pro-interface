import { useEffect, useState } from "react";

export const ResponsiveContainer = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const calculateScale = () => {
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;

      const scaleX = (viewportWidth - 40) / 1338; // 40px margen
      const scaleY = (viewportHeight - 40) / 768;

      const newScale = Math.min(scaleX, scaleY, 1);
      setScale(newScale);
    };

    calculateScale();
    window.addEventListener("resize", calculateScale);
    return () => window.removeEventListener("resize", calculateScale);
  }, []);

  return (
    <div
      className="w-[1338px] h-[768px] bg-white mx-auto my-0 flex flex-col overflow-auto relative"
      style={{
        boxSizing: "content-box",
        transform: `scale(${scale})`,
        transformOrigin: "center center",
        transition: "transform 0.3s ease",
      }}
    >
      {children}
    </div>
  );
};
