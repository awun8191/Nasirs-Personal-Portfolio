import React, { useRef, useState } from 'react';

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
}

const TiltCard: React.FC<TiltCardProps> = ({ children, className = "" }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    // Calculate mouse position relative to center of card
    const mouseX = e.clientX - rect.left - width / 2;
    const mouseY = e.clientY - rect.top - height / 2;

    // Calculate rotation (adjust divisor to change sensitivity)
    const rotateY = (mouseX / width) * 20; // Max rotation deg
    const rotateX = (mouseY / height) * -20; // Invert X axis for natural feel

    setRotation({ x: rotateX, y: rotateY });
  };

  const handleMouseEnter = () => setIsHovering(true);
  
  const handleMouseLeave = () => {
    setIsHovering(false);
    setRotation({ x: 0, y: 0 }); // Reset position
  };

  return (
    <div
      ref={ref}
      className={`perspective-1000 ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div
        className="transition-transform duration-100 ease-out preserve-3d"
        style={{
          transform: isHovering 
            ? `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg) scale(1.02)` 
            : 'rotateX(0deg) rotateY(0deg) scale(1)',
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default TiltCard;