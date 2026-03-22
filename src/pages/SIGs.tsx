import React, { useRef, useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { sigItems, type SIGItem } from "@/data/sigData";

function SIGsSectionBackground({ targetIndex }: { targetIndex: number }) {
  return (
    <div className="absolute inset-0 w-full h-full z-0 overflow-hidden bg-background">
      <div className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none opacity-5 dark:opacity-10">
        <img src="/images/logo.png" alt="bg-logo" className="w-[60%] max-w-[500px] min-w-[200px] scale-[2]" />
      </div>
    </div>
  );
}

export default function SIGs() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigateRouter = useNavigate();
  const lastScrollTime = useRef(0);
  const scrollCooldown = 1200; // Increased to prevent double skipping on sensitive trackpads

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      const now = Date.now();
      if (now - lastScrollTime.current < scrollCooldown) return;

      if (Math.abs(e.deltaY) > 40) {
        if (e.deltaY > 0) {
          handleNext();
        } else {
          handlePrev();
        }
        lastScrollTime.current = now;
      }
    };

    let startY = 0;
    const handleTouchStart = (e: TouchEvent) => {
      startY = e.touches[0].clientY;
    };
    const handleTouchMove = (e: TouchEvent) => {
      const now = Date.now();
      if (now - lastScrollTime.current < scrollCooldown) return;

      const currentY = e.touches[0].clientY;
      const deltaY = startY - currentY;

      if (Math.abs(deltaY) > 40) {
        if (deltaY > 0) {
          handleNext();
        } else {
          handlePrev();
        }
        lastScrollTime.current = now;
        startY = currentY;
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: true });
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: true });

    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
    };
  }, [currentIndex]);

  const loopItems = sigItems;



  const handleNext = () => {
    // if we're on the last slide, go back to home instead of wrapping
    if (currentIndex === loopItems.length - 1) {
      navigateRouter("/");
      return;
    }
    setCurrentIndex((prev) => Math.min(loopItems.length - 1, prev + 1));
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => Math.max(0, prev - 1));
  };

  const renderQueueCard = (item: SIGItem, index: number) => {
    const diff = index - currentIndex;

    const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
      e.currentTarget.src = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='800' height='600' viewBox='0 0 800 600'><defs><linearGradient id='grad' x1='0%' y1='0%' x2='100%' y2='100%'><stop offset='0%' style='stop-color:%2300629B;stop-opacity:1'/><stop offset='100%' style='stop-color:%23004d7a;stop-opacity:1'/></linearGradient></defs><rect width='800' height='600' fill='url(%23grad)'/><circle cx='400' cy='300' r='150' fill='rgba(255,255,255,0.1)'/><text x='400' y='300' font-family='Arial, sans-serif' font-size='48' font-weight='bold' text-anchor='middle' fill='rgba(255,255,255,0.8)' dy='-10'>IEEE</text><text x='400' y='300' font-family='Arial, sans-serif' font-size='24' text-anchor='middle' fill='rgba(255,255,255,0.6)' dy='30'>SIG Image Not Available</text><rect x='50' y='50' width='700' height='500' fill='none' stroke='rgba(255,255,255,0.2)' stroke-width='2' rx='20'/></svg>";
      e.currentTarget.alt = "Image not available";
    };

    let scale = 1;
    let translateX = 0;
    let translateY = 0;
    let opacity = 1;
    let zIndex = 40;

    if (diff < 0) {
      // Zoom out of screen
      scale = 2.0;
      translateY = -10;
      opacity = 0;
      zIndex = 30;
    } else if (diff === 0) {
      // Active item
      scale = 1;
      translateX = 0;
      translateY = 0;
      opacity = 1;
      zIndex = 40;
    } else {
      // Queue items waiting out of bounds (zooming from center)
      scale = 0.2;
      translateX = 0; // Arises from the center instead of sides
      translateY = 0;
      opacity = 0; // Hides them completely until they are active
      zIndex = 20;
    }

    return (
      <div
        key={item.id}
        className="absolute w-[80vw] max-w-5xl transition-all duration-1000 ease-[cubic-bezier(0.25,1,0.5,1)] origin-center flex flex-col items-center"
        style={{
          transform: `translate(${translateX}%, ${translateY}%) scale(${scale})`,
          opacity,
          zIndex,
          pointerEvents: diff === 0 ? "auto" : "none",
        }}
      >
        <div className="relative group overflow-hidden rounded-2xl border bg-card text-card-foreground shadow-2xl h-[55vh] md:h-[65vh] min-h-[400px] max-h-[650px] w-full p-2 md:p-3">
          <div className="relative w-full h-full rounded-xl overflow-hidden">
            <img
              src={item.imageUrl}
              alt={item.title}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              style={{ objectFit: 'cover', aspectRatio: '16/9' }}
              onError={handleImageError}
            />

            {item.title && diff === 0 && (
              <div className="absolute top-4 left-1/2 -translate-x-1/2 z-20 px-5 py-2 rounded-full text-sm font-bold tracking-widest bg-primary text-primary-foreground shadow-md animate-fade-in-up">
                {item.title}
              </div>
            )}

            <div
              className={`absolute bottom-0 left-0 right-0 z-20 px-6 py-6 bg-card/90 backdrop-blur-md border-t shadow-[0_-4px_24px_rgba(0,0,0,0.05)] flex flex-col items-center transition-all duration-700 ${diff === 0 ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}
            >
              <h3 className="text-lg md:text-xl font-bold mb-2 text-center">{item.title}</h3>
              <p className="text-xs md:text-sm text-muted-foreground leading-relaxed text-center line-clamp-3">
                {item.details}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="relative w-full h-screen overflow-hidden bg-background flex flex-col items-center justify-center font-sans text-foreground">
      <SIGsSectionBackground targetIndex={currentIndex} />
      
      {/* Top Left Go Back Button */}
      <div className="absolute top-6 left-6 z-50">
        <Link 
          to="/"
          className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-card/80 backdrop-blur-md border border-border shadow-sm rounded-full text-sm font-medium transition-all hover:bg-card hover:scale-105"
        >
          &larr; Go to Home
        </Link>
      </div>

      <div className="relative z-10 w-full h-full max-w-7xl mx-auto px-4 flex flex-col py-6 md:py-10">
        <div className="flex-grow flex items-center justify-center relative w-full h-full">
          {/* Card Engine Loop */}
          {loopItems.map((item, index) => renderQueueCard(item, index))}
        </div>

        <div className="flex flex-col items-center justify-center gap-4 mt-auto mb-2 md:mb-6 z-50">
          <Link
            to={`/sigs/${loopItems[currentIndex]?.id}`}
            className="inline-block px-8 py-3 rounded-full bg-primary text-primary-foreground text-sm font-bold shadow-md transition-all duration-300 hover:opacity-90 hover:scale-105 active:scale-95"
          >
            Learn More
          </Link>

          <div className="flex gap-2">
            {sigItems.map((_, idx) => (
              <div
                key={idx}
                className={`h-2 rounded-full transition-all duration-500 ${idx === currentIndex ? "w-8 bg-black dark:bg-white" : "w-2 bg-gray-400 dark:bg-gray-500"}`}
              />
            ))}
          </div>
          <p className="text-xs text-muted-foreground animate-pulse tracking-widest uppercase font-semibold">
            Scroll Down • Scroll Up
          </p>
          <p className="text-xs text-muted-foreground font-medium">
            {currentIndex + 1} / {sigItems.length}
          </p>
        </div>
      </div>
    </div>
  );
}