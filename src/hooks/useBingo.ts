
import { useState } from 'react';
import { BINGO_IMAGES } from '../data/image';
import type { BingoImage } from '../types/bingo.types';

function shuffle<T>(items: T[]): T[] {
  const result = [...items];

  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));

    [result[i], result[j]] = [result[j], result[i]];
  }

  return result;
}

export function useBingo() {
  const [draws, setDraws] = useState<BingoImage[]>([]);
  const [remaining, setRemaining] = useState<BingoImage[]>(
    () => shuffle(BINGO_IMAGES)
  );

  const currentImage = draws[draws.length - 1] ?? null;

  const draw = () => {
    if (remaining.length === 0) return;

    const [nextImage, ...rest] = remaining;

    setDraws(previous => [...previous, nextImage]);
    setRemaining(rest);
  };

  const reset = () => {
    setDraws([]);
    setRemaining(shuffle(BINGO_IMAGES));
  };

  return {
    currentImage,
    draws,
    remainingCount: remaining.length,
    totalCount: BINGO_IMAGES.length,
    draw,
    reset,
  };
}
