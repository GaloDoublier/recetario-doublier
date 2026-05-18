"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export function EasterEggLogo() {
  const [clicks, setClicks] = useState(0);
  const router = useRouter();
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleClick = () => {
    const newCount = clicks + 1;
    setClicks(newCount);

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    if (newCount === 5) {
      router.push("/admin"); 
      setClicks(0);
    } else {
      timeoutRef.current = setTimeout(() => {
        setClicks(0);
      }, 1000);
    }
  };

  return (
    <div 
      onClick={handleClick}
      className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center cursor-pointer select-none"
      title="Logo"
    >
      <Image 
        src="/galicono.png" 
        alt="Logo" 
        width={70} 
        height={70} 
        className="text-primary-foreground rounded-full" 
      />
    </div>
  );
}