'use client';

import { useState, useCallback, useEffect } from 'react';
import { UserProgress, AllProgress } from '@/types/progress';
import { ProgressRepository } from '@/lib/repositories/ProgressRepository';

export function useProgress() {
  const [allProgress, setAllProgress] = useState<AllProgress>({});

  const refreshProgress = useCallback(() => {
    setAllProgress(ProgressRepository.getAllProgress());
  }, []);

  useEffect(() => {
    refreshProgress();
  }, [refreshProgress]);

  const getProgress = useCallback(
    (cardId: string): UserProgress | null => {
      return allProgress[cardId] || null;
    },
    [allProgress]
  );

  const markCorrect = useCallback(
    (cardId: string) => {
      ProgressRepository.markAsCorrect(cardId);
      refreshProgress();
    },
    [refreshProgress]
  );

  const markMissed = useCallback(
    (cardId: string) => {
      ProgressRepository.markAsMissed(cardId);
      refreshProgress();
    },
    [refreshProgress]
  );

  const markReview = useCallback(
    (cardId: string) => {
      ProgressRepository.markAsReview(cardId);
      refreshProgress();
    },
    [refreshProgress]
  );

  const clearAll = useCallback(() => {
    ProgressRepository.clearAllProgress();
    refreshProgress();
  }, [refreshProgress]);

  return {
    allProgress,
    getProgress,
    markCorrect,
    markMissed,
    markReview,
    clearAll,
    refreshProgress,
  };
}
