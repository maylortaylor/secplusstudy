'use client';

import { useRouter } from 'next/navigation';
import { useFlashcards } from '@/lib/hooks/useFlashcards';
import { FlashcardViewer } from '@/components/organisms/FlashcardViewer/FlashcardViewer';

export default function StudyAllPage() {
  const router = useRouter();
  const { flashcards, loading, error } = useFlashcards();

  const handleExit = () => {
    router.push('/study');
  };

  const handleComplete = () => {
    router.push('/study');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <div className="text-xl text-gray-600 dark:text-gray-400 mb-2">
            Loading all flashcards...
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
            onClick={() => router.push('/study')}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Back to Study Selection
          </button>
        </div>
      </div>
    );
  }

  // Sort flashcards by domain priority: D4 → D5
  const sortedFlashcards = [...flashcards].sort((a, b) => {
    const priorityOrder = [4, 5, 2, 3, 1];
    const aPriority = priorityOrder.indexOf(a.domain);
    const bPriority = priorityOrder.indexOf(b.domain);
    return aPriority - bPriority;
  });

  if (sortedFlashcards.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <div className="text-xl text-gray-600 dark:text-gray-400 mb-4">
            No flashcards available
          </div>
          <button
            onClick={() => router.push('/study')}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Back to Study Selection
          </button>
        </div>
      </div>
    );
  }

  return (
    <FlashcardViewer
      flashcards={sortedFlashcards}
      onExit={handleExit}
      onComplete={handleComplete}
    />
  );
}
