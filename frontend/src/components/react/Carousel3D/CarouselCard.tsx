import { calculateRadius, getAnglePerCard } from "./carousel.utils";
import type { CarouselProject } from "./types";
import { useLocale } from "../../../lib/useLocale";
import styles from "./Carousel3D.module.css";

interface CardProps {
  project: CarouselProject;
  index: number;
  totalCards: number;
  isActive: boolean;
  onClick: () => void;
}

export function CarouselCard({ project, index, totalCards, isActive, onClick }: CardProps) {
  const angle = getAnglePerCard(totalCards) * index;
  const radius = calculateRadius(totalCards);
  const { t } = useLocale();

  return (
    <article
      className={`${styles.card} ${isActive ? styles.cardActive : ""}`}
      style={{
        transform: `rotateY(${angle}deg) translateZ(${radius}px)`,
      }}
      onClick={onClick}
      tabIndex={0}
      role="button"
      aria-label={`View project: ${project.title}`}
    >
      <div className={styles.cardGlow} />

      <div className={styles.cardImage}>
        <img src={project.thumbnail_url} alt={project.title} loading="lazy" />
      </div>

      <div className={styles.cardContent}>
        <span className={styles.cardCategory}>{project.category}</span>
        <h3 className={styles.cardTitle}>{project.title}</h3>
        <p className={styles.cardDescription}>{project.short_description}</p>
        <div className={styles.cardTechStack}>
          {project.tech_stack.slice(0, 4).map((tech) => (
            <span key={tech} className={styles.techBadge}>
              {tech}
            </span>
          ))}
        </div>
        {isActive && (
          <div className={styles.cardLinks}>
            <a
              href={`/projects/${project.slug}`}
              className={styles.cardLink}
              onClick={(e) => e.stopPropagation()}
            >
              {t.projects.viewDetails}
            </a>
            {project.demo_url && (
              <a
                href={project.demo_url}
                target="_blank"
                rel="noopener noreferrer"
                className={`${styles.cardLink} ${styles.cardLinkOutline}`}
                onClick={(e) => e.stopPropagation()}
              >
                {t.projects.liveDemo}
              </a>
            )}
          </div>
        )}
      </div>

      <div className={styles.cardShine} />
    </article>
  );
}
