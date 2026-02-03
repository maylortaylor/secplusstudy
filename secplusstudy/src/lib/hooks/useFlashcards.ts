'use client';

import { useState, useEffect } from 'react';
import { Flashcard } from '@/types/flashcard';
import { JsonFlashcardService } from '@/lib/services/FlashcardService';

const flashcardService = new JsonFlashcardService();

export function useFlashcards(domainId?: number) {
  const [flashcards, setFlashcards] = useState<Flashcard[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadFlashcards = async () => {
      setLoading(true);
      setError(null);

      try {
        const cards = domainId
          ? await flashcardService.getByDomain(domainId)
          : await flashcardService.getAll();

        setFlashcards(cards);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load flashcards');
      } finally {
        setLoading(false);
      }
    };

    loadFlashcards();
  }, [domainId]);

  return { flashcards, loading, error };
}
