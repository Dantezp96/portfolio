export interface CarouselProject {
  id: number;
  slug: string;
  title: string;
  short_description: string;
  category: string;
  tech_stack: string[];
  thumbnail_url: string;
  demo_url: string | null;
  repo_url: string | null;
  metrics: string | null;
}

export interface UseCarouselOptions {
  autoRotate: boolean;
  rotationSpeed: number; // degrees per second
  pauseOnHover: boolean;
}

export interface UseCarouselReturn {
  activeIndex: number;
  rotation: number;
  isPaused: boolean;
  isAutoRotating: boolean;
  handlers: {
    onMouseEnter: () => void;
    onMouseLeave: () => void;
    onTouchStart: (e: React.TouchEvent) => void;
    onTouchMove: (e: React.TouchEvent) => void;
    onTouchEnd: () => void;
  };
  controls: {
    goTo: (index: number) => void;
    next: () => void;
    prev: () => void;
    togglePause: () => void;
  };
}
