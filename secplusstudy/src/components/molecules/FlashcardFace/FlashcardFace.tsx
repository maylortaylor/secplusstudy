'use client';

import React, { useState } from 'react';
import { Flashcard, DisclosureLevel } from '@/types/flashcard';
import { Button } from '@/components/atoms/Button/Button';

export interface FlashcardFaceProps {
  flashcard: Flashcard;
  side: 'front' | 'back';
  disclosureLevel?: DisclosureLevel;
  onShowMore?: () => void;
}

export const FlashcardFace: React.FC<FlashcardFaceProps> = ({
  flashcard,
  side,
  disclosureLevel = 1,
  onShowMore,
}) => {
  if (side === 'front') {
    return (
      <div className="flex flex-col items-center justify-center h-full p-8">
        <div className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-4">
          {flashcard.section}
        </div>
        <div className="text-4xl md:text-5xl font-bold text-center">{flashcard.front}</div>
        <div className="mt-6 text-sm text-gray-500 dark:text-gray-400">
          Tap or press Space to reveal
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full p-8 overflow-y-auto">
      <div className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">
        {flashcard.section}
      </div>
      <div className="text-2xl md:text-3xl font-bold mb-6">{flashcard.front}</div>

      <div className="space-y-4 flex-1">
        <div className="text-lg font-semibold text-blue-600 dark:text-blue-400">
          {flashcard.back.level1}
        </div>

        {disclosureLevel >= 2 && (
          <div className="text-base text-gray-700 dark:text-gray-300 leading-relaxed animate-slide-up">
            {flashcard.back.level2}
          </div>
        )}

        {disclosureLevel >= 3 && (
          <div className="mt-4 p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg animate-slide-up">
            <div className="text-sm font-semibold text-yellow-800 dark:text-yellow-400 mb-2">
              📝 Exam Tips
            </div>
            <div className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
              {flashcard.back.level3}
            </div>
          </div>
        )}
      </div>

      <div className="mt-6 flex justify-center gap-3">
        {disclosureLevel < 3 && (
          <Button onClick={onShowMore} variant="secondary" size="sm">
            Show More
          </Button>
        )}
        {disclosureLevel === 3 && (
          <div className="text-sm text-gray-500 dark:text-gray-400">
            All details revealed
          </div>
        )}
      </div>
    </div>
  );
};
