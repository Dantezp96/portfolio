import { useCarousel } from "./useCarousel";
import { CarouselCard } from "./CarouselCard";
import { calculateRadius } from "./carousel.utils";
import type { CarouselProject } from "./types";
import { useLocale } from "../../../lib/useLocale";
import styles from "./Carousel3D.module.css";

interface Carousel3DProps {
  projects: CarouselProject[];
}

export default function Carousel3D({ projects }: Carousel3DProps) {
  const { activeIndex, rotation, isPaused, isAutoRotating, handlers, controls } =
    useCarousel(projects.length, {
      autoRotate: true,
      rotationSpeed: 14,
      pauseOnHover: true,
    });

  const radius = calculateRadius(projects.length);
  const { t } = useLocale();

  return (
    <div className={styles.carouselWrapper}>
      <h2 className={styles.carouselTitle}>{t.projects.title}</h2>
      <p className={styles.carouselSubtitle}>
        {t.projects.subtitle}
      </p>

      {/* 3D Scene */}
      <div className={styles.scene}>
        <div
          className={`${styles.track} ${!isAutoRotating ? styles.trackAnimated : ""}`}
          style={{
            transform: `translateZ(-${radius}px) rotateY(${rotation}deg)`,
          }}
          {...handlers}
        >
          {projects.map((project, i) => (
            <CarouselCard
              key={project.id}
              project={project}
              index={i}
              totalCards={projects.length}
              isActive={i === activeIndex}
              onClick={() => controls.goTo(i)}
            />
          ))}
        </div>
      </div>

      {/* Controls */}
      <div className={styles.controls}>
        <button
          className={styles.controlBtn}
          onClick={controls.prev}
          aria-label={t.projects.prev}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>

        <div className={styles.dots}>
          {projects.map((_, i) => (
            <button
              key={i}
              className={`${styles.dot} ${i === activeIndex ? styles.dotActive : ""}`}
              onClick={() => controls.goTo(i)}
              aria-label={`Go to project ${i + 1}`}
            />
          ))}
        </div>

        <button
          className={styles.controlBtn}
          onClick={controls.next}
          aria-label={t.projects.next}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M9 18l6-6-6-6" />
          </svg>
        </button>
      </div>
    </div>
  );
}
