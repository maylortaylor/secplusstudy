'use client';

import React, { useState } from 'react';
import { Flashcard, DisclosureLevel } from '@/types/flashcard';
import { Button } from '@/components/atoms/Button/Button';

// Domain name mapping
const DOMAIN_NAMES: Record<number, string> = {
  1: 'General Security Concepts',
  2: 'Threats, Vulnerabilities, and Mitigations',
  3: 'Security Architecture',
  4: 'Security Operations',
  5: 'Security Program Management and Oversight',
};

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
      <div className="flex flex-col items-center justify-center h-full p-12">
        <div className="max-w-xl w-full text-center">
          <div className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">
            {flashcard.front}
          </div>
          <div className="mt-8 text-sm text-gray-600 dark:text-gray-400 italic">
            Press Space to reveal answer
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full px-12 py-10 overflow-y-auto">
      {/* Term at the top */}
      <div className="text-center mb-8">
        <div className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-5">
          {flashcard.front}
        </div>
        <div className="inline-block px-4 py-2 bg-blue-100 dark:bg-blue-900/30 rounded-full border border-blue-200 dark:border-blue-800">
          <div className="text-xs font-semibold text-blue-700 dark:text-blue-300">
            Domain {flashcard.domain}: {DOMAIN_NAMES[flashcard.domain]} • {flashcard.section}
          </div>
        </div>
      </div>

      {/* Divider */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-600 to-transparent mb-8"></div>

      {/* Content with progressive disclosure */}
      <div className="space-y-6 flex-1 max-w-2xl mx-auto w-full">
        {/* Level 1: Basic Definition */}
        <div className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl border border-blue-200 dark:border-blue-800">
          <div className="text-sm font-bold text-blue-700 dark:text-blue-300 mb-3 uppercase tracking-wide">
            Definition
          </div>
          <div className="text-lg font-semibold text-gray-900 dark:text-white leading-relaxed">
            {flashcard.back.level1}
          </div>
        </div>

        {/* Level 2: Detailed Description */}
        {disclosureLevel >= 2 && (
          <div className="p-6 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl border border-purple-200 dark:border-purple-800 animate-slide-up">
            <div className="text-sm font-bold text-purple-700 dark:text-purple-300 mb-3 uppercase tracking-wide">
              Details
            </div>
            <div className="text-base text-gray-800 dark:text-gray-100 leading-relaxed">
              {flashcard.back.level2}
            </div>
          </div>
        )}

        {/* Level 3: Exam Tips */}
        {disclosureLevel >= 3 && (
          <div className="p-6 bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 rounded-xl border-2 border-yellow-300 dark:border-yellow-700 animate-slide-up">
            <div className="text-sm font-bold text-yellow-800 dark:text-yellow-300 mb-3 uppercase tracking-wide flex items-center gap-2">
              <span>📝</span>
              <span>Exam Tips</span>
            </div>
            <div className="text-base text-gray-800 dark:text-gray-100 leading-relaxed">
              {flashcard.back.level3}
            </div>
          </div>
        )}
      </div>

      {/* Show More Button */}
      <div className="mt-8 flex justify-center gap-3">
        {disclosureLevel < 3 && (
          <Button
            onClick={(e) => {
              e.stopPropagation();
              onShowMore?.();
            }}
            variant="secondary"
            size="sm"
          >
            Show More ({3 - disclosureLevel} more section{3 - disclosureLevel > 1 ? 's' : ''})
          </Button>
        )}
        {disclosureLevel === 3 && (
          <div className="text-sm text-green-600 dark:text-green-400 font-medium">
            ✓ All details revealed
          </div>
        )}
      </div>
    </div>
  );
};
