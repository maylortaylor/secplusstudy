'use client';

import { useRouter } from 'next/navigation';
import { useFlashcards } from '@/lib/hooks/useFlashcards';
import { useProgress } from '@/lib/hooks/useProgress';
import { FlashcardViewer } from '@/components/organisms/FlashcardViewer/FlashcardViewer';
import { Button } from '@/components/atoms/Button/Button';
import { Icon } from '@/components/atoms/Icon/Icon';

export default function FlaggedCardsPage() {
  const router = useRouter();
  const { flashcards, loading, error } = useFlashcards();
  const { allProgress } = useProgress();

  const handleExit = () => {
    router.push('/');
  };

  const handleComplete = () => {
    router.push('/');
  };

  // Filter flashcards to only show flagged ones
  const flaggedFlashcards = flashcards.filter((card) => {
    const progress = allProgress[card.id];
    return progress?.needsReview || false;
  });

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <div className="text-xl text-gray-600 dark:text-gray-400 mb-2">
            Loading flagged cards...
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <div className="text-xl text-red-600 dark:text-red-400 mb-4">Error loading flashcards</div>
          <div className="text-sm text-gray-600 dark:text-gray-400 mb-6">{error}</div>
          <button
            onClick={() => router.push('/')}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  if (flaggedFlashcards.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="w-full max-w-5xl mx-auto px-6 py-16">
          <div className="mb-8">
            <Button variant="ghost" onClick={handleExit} size="sm">
              <Icon name="arrow-left" size={20} />
              <span className="ml-2">Back to Home</span>
            </Button>
          </div>

          <div className="text-center">
            <div className="text-5xl mb-4">🚀</div>
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              No Flagged Cards
            </h1>
            <p className="text-gray-600 dark:text-gray-300 mb-8">
              You haven't flagged any cards for review yet. When you study, press <kbd className="px-2 py-1 bg-white dark:bg-gray-700 rounded border border-gray-300 dark:border-gray-600 font-mono">R</kbd> to flag cards you want to review later.
            </p>
            <Button variant="primary" onClick={handleExit} size="md">
              Start Studying
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <FlashcardViewer
      flashcards={flaggedFlashcards}
      onExit={handleExit}
      onComplete={handleComplete}
    />
  );
}
