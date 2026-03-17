import { useState } from "react";
import mascotImg from "@/assets/mascot.jpg";

const MascotFloat = () => {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="fixed bottom-6 right-6 z-50 hidden md:block"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Speech bubble */}
      <div
        className={`absolute -top-14 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-xl bg-card px-3 py-2 text-sm font-medium text-foreground shadow-md transition-all duration-300 ${
          hovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2 pointer-events-none"
        }`}
      >
        Fresh intel daily! 🔥
        {/* Arrow */}
        <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 h-3 w-3 rotate-45 bg-card" />
      </div>

      {/* Mascot */}
      <img
        src={mascotImg}
        alt="tectovox mascot"
        className="h-[100px] w-[100px] animate-mascot-bounce cursor-pointer rounded-full object-cover"
      />
    </div>
  );
};

export default MascotFloat;
