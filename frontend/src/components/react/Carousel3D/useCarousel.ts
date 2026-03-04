import { useState, useEffect, useRef, useCallback } from "react";
import { getAnglePerCard, getActiveIndex, getTargetRotation } from "./carousel.utils";
import type { UseCarouselOptions, UseCarouselReturn } from "./types";

export function useCarousel(
  cardCount: number,
  options: UseCarouselOptions = { autoRotate: true, rotationSpeed: 14, pauseOnHover: true }
): UseCarouselReturn {
  const [rotation, setRotation] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isSnapping, setIsSnapping] = useState(false);
  const [isAutoRotating, setIsAutoRotating] = useState(options.autoRotate);

  const rafRef = useRef<number>(0);
  const lastTimeRef = useRef<number>(0);
  const rotationRef = useRef(0);
  const touchStartRef = useRef<number>(0);
  const touchRotationRef = useRef<number>(0);

  const anglePerCard = getAnglePerCard(cardCount);
  const activeIndex = getActiveIndex(rotationRef.current, cardCount);

  // Auto-rotation loop
  useEffect(() => {
    if (!isAutoRotating || isPaused || isSnapping || cardCount <= 1) {
      lastTimeRef.current = 0;
      return;
    }

    const animate = (time: number) => {
      if (lastTimeRef.current === 0) {
        lastTimeRef.current = time;
      }

      const delta = (time - lastTimeRef.current) / 1000; // seconds
      lastTimeRef.current = time;

      rotationRef.current -= options.rotationSpeed * delta;
      setRotation(rotationRef.current);

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [isAutoRotating, isPaused, isSnapping, options.rotationSpeed, cardCount]);

  const goTo = useCallback(
    (index: number) => {
      setIsSnapping(true);
      setIsAutoRotating(false);

      // Find the shortest path to the target
      const target = getTargetRotation(index, cardCount);
      const current = rotationRef.current;
      const normalizedCurrent = ((current % 360) + 360) % 360;
      const normalizedTarget = ((target % 360) + 360) % 360;

      let diff = normalizedTarget - normalizedCurrent;
      if (diff > 180) diff -= 360;
      if (diff < -180) diff += 360;

      rotationRef.current = current + diff;
      setRotation(rotationRef.current);

      // Resume auto-rotation after snap
      setTimeout(() => {
        setIsSnapping(false);
        setIsAutoRotating(true);
        lastTimeRef.current = 0;
      }, 2500);
    },
    [cardCount]
  );

  const next = useCallback(() => {
    const nextIndex = (activeIndex + 1) % cardCount;
    goTo(nextIndex);
  }, [activeIndex, cardCount, goTo]);

  const prev = useCallback(() => {
    const prevIndex = (activeIndex - 1 + cardCount) % cardCount;
    goTo(prevIndex);
  }, [activeIndex, cardCount, goTo]);

  const togglePause = useCallback(() => {
    setIsPaused((p) => !p);
    lastTimeRef.current = 0;
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [next, prev]);

  // Touch handlers
  const onTouchStart = useCallback((e: React.TouchEvent) => {
    touchStartRef.current = e.touches[0].clientX;
    touchRotationRef.current = rotationRef.current;
    setIsPaused(true);
    setIsAutoRotating(false);
    lastTimeRef.current = 0;
  }, []);

  const onTouchMove = useCallback(
    (e: React.TouchEvent) => {
      const delta = e.touches[0].clientX - touchStartRef.current;
      const sensitivity = 0.3;
      rotationRef.current = touchRotationRef.current + delta * sensitivity;
      setRotation(rotationRef.current);
    },
    []
  );

  const onTouchEnd = useCallback(() => {
    // Snap to nearest card
    const nearest = getActiveIndex(rotationRef.current, cardCount);
    goTo(nearest);
  }, [cardCount, goTo]);

  const onMouseEnter = useCallback(() => {
    if (options.pauseOnHover) {
      setIsPaused(true);
      lastTimeRef.current = 0;
    }
  }, [options.pauseOnHover]);

  const onMouseLeave = useCallback(() => {
    if (options.pauseOnHover) {
      setIsPaused(false);
      lastTimeRef.current = 0;
    }
  }, [options.pauseOnHover]);

  return {
    activeIndex,
    rotation,
    isPaused,
    isAutoRotating,
    handlers: {
      onMouseEnter,
      onMouseLeave,
      onTouchStart,
      onTouchMove,
      onTouchEnd,
    },
    controls: {
      goTo,
      next,
      prev,
      togglePause,
    },
  };
}
