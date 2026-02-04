'use client';

import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Flashcard, DisclosureLevel } from '@/types/flashcard';
import { FlashcardFace } from '@/components/molecules/FlashcardFace/FlashcardFace';
import { Button } from '@/components/atoms/Button/Button';
import { Icon } from '@/components/atoms/Icon/Icon';
import { useKeyboard } from '@/lib/hooks/useKeyboard';
import { useProgress } from '@/lib/hooks/useProgress';

export interface FlashcardViewerProps {
  flashcards: Flashcard[];
  onComplete?: () => void;
  onExit?: () => void;
}

export const FlashcardViewer: React.FC<FlashcardViewerProps> = ({
  flashcards,
  onComplete,
  onExit,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [disclosureLevel, setDisclosureLevel] = useState<DisclosureLevel>(1);
  const { markReview } = useProgress();

  const currentCard = flashcards[currentIndex];
  const isFirst = currentIndex === 0;
  const isLast = currentIndex === flashcards.length - 1;

  const handleFlip = useCallback(() => {
    setIsFlipped(!isFlipped);
    if (isFlipped) {
      setDisclosureLevel(1);
    }
  }, [isFlipped]);

  const handleNext = useCallback(() => {
    if (isLast) {
      onComplete?.();
      return;
    }
    setCurrentIndex(currentIndex + 1);
    setIsFlipped(false);
    setDisclosureLevel(1);
  }, [currentIndex, isLast, onComplete]);

  const handlePrevious = useCallback(() => {
    if (!isFirst) {
      setCurrentIndex(currentIndex - 1);
      setIsFlipped(false);
      setDisclosureLevel(1);
    }
  }, [currentIndex, isFirst]);

  const handleShowMore = useCallback(() => {
    if (disclosureLevel < 3) {
      setDisclosureLevel((prev) => (prev + 1) as DisclosureLevel);
    }
  }, [disclosureLevel]);

  const handleFlag = useCallback(() => {
    if (currentCard) {
      markReview(currentCard.id);
    }
  }, [currentCard, markReview]);

  useKeyboard({
    onSpace: handleFlip,
    onArrowLeft: handlePrevious,
    onArrowRight: handleNext,
    onArrowUp: handleShowMore,
    onEscape: onExit,
    onR: handleFlag,
  });

  if (!currentCard) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <div className="text-xl text-gray-600 dark:text-gray-400">No flashcards available</div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-4">
        <div className="flex items-center justify-between max-w-6xl mx-auto">
          <Button variant="ghost" onClick={onExit} size="sm">
            <Icon name="arrow-left" size={20} />
            <span className="ml-2">Exit</span>
          </Button>

          <div className="text-sm text-gray-600 dark:text-gray-400">
            {currentIndex + 1} / {flashcards.length}
          </div>

          <Button variant="ghost" onClick={handleFlag} size="sm">
            <Icon name="flag" size={20} />
            <span className="ml-2">Flag for Review</span>
          </Button>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="h-1 bg-gray-200 dark:bg-gray-700">
        <div
          className="h-full bg-blue-600 transition-all duration-300"
          style={{ width: `${((currentIndex + 1) / flashcards.length) * 100}%` }}
        />
      </div>

      {/* Flashcard */}
      <div className="flex-1 flex items-center justify-center p-4">
        <div
          className="relative w-full max-w-3xl h-[700px] cursor-pointer"
          onClick={handleFlip}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={`${currentCard.id}-${isFlipped ? 'back' : 'front'}`}
              initial={{ rotateY: 90, opacity: 0 }}
              animate={{ rotateY: 0, opacity: 1 }}
              exit={{ rotateY: -90, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0 bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700"
              style={{ backfaceVisibility: 'hidden' }}
            >
              <FlashcardFace
                flashcard={currentCard}
                side={isFlipped ? 'back' : 'front'}
                disclosureLevel={disclosureLevel}
                onShowMore={handleShowMore}
              />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Navigation */}
      <div className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 p-4">
        <div className="flex items-center justify-between max-w-6xl mx-auto">
          <Button
            variant="secondary"
            onClick={handlePrevious}
            disabled={isFirst}
            size="md"
          >
            <Icon name="arrow-left" size={20} />
            <span className="ml-2">Previous</span>
          </Button>

          <div className="flex gap-2">
            <Button
              variant={isFlipped ? 'secondary' : 'primary'}
              onClick={handleFlip}
              size="md"
            >
              {isFlipped ? 'Flip to Front' : 'Reveal Answer'}
            </Button>
          </div>

          <Button
            variant="secondary"
            onClick={handleNext}
            size="md"
          >
            <span className="mr-2">{isLast ? 'Complete' : 'Next'}</span>
            <Icon name="arrow-right" size={20} />
          </Button>
        </div>
      </div>

      {/* Keyboard Shortcuts Help */}
      <div className="bg-gray-100 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 p-2">
        <div className="max-w-6xl mx-auto text-xs text-gray-600 dark:text-gray-400 text-center">
          <kbd className="px-2 py-1 bg-white dark:bg-gray-700 rounded border border-gray-300 dark:border-gray-600">
            Space
          </kbd>{' '}
          Flip •{' '}
          <kbd className="px-2 py-1 bg-white dark:bg-gray-700 rounded border border-gray-300 dark:border-gray-600">
            ←
          </kbd>{' '}
          Previous •{' '}
          <kbd className="px-2 py-1 bg-white dark:bg-gray-700 rounded border border-gray-300 dark:border-gray-600">
            →
          </kbd>{' '}
          Next •{' '}
          <kbd className="px-2 py-1 bg-white dark:bg-gray-700 rounded border border-gray-300 dark:border-gray-600">
            ↑
          </kbd>{' '}
          Show More •{' '}
          <kbd className="px-2 py-1 bg-white dark:bg-gray-700 rounded border border-gray-300 dark:border-gray-600">
            R
          </kbd>{' '}
          Flag •{' '}
          <kbd className="px-2 py-1 bg-white dark:bg-gray-700 rounded border border-gray-300 dark:border-gray-600">
            Esc
          </kbd>{' '}
          Exit
        </div>
      </div>
    </div>
  );
};
