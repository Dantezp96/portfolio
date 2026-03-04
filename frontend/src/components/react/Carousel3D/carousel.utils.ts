const CARD_WIDTH = 320;

export function calculateRadius(cardCount: number, cardWidth = CARD_WIDTH): number {
  if (cardCount <= 1) return 0;
  // Ensure some spacing between cards
  return Math.round((cardWidth + 40) / (2 * Math.tan(Math.PI / cardCount)));
}

export function getAnglePerCard(cardCount: number): number {
  return 360 / cardCount;
}

export function getActiveIndex(rotation: number, cardCount: number): number {
  const angle = getAnglePerCard(cardCount);
  const normalized = (((-rotation % 360) + 360) % 360);
  return Math.round(normalized / angle) % cardCount;
}

export function getTargetRotation(index: number, cardCount: number): number {
  return -(getAnglePerCard(cardCount) * index);
}
