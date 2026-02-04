'use client';

import { useRouter } from 'next/navigation';
import { Flashcard } from '@/types/flashcard';
import { FlashcardViewer } from '@/components/organisms/FlashcardViewer/FlashcardViewer';

export default function StudyDomainClientPage({ flashcards, domainId }: { flashcards: Flashcard[], domainId: number }) {
  const router = useRouter();

  const handleExit = () => {
    router.push('/study');
  };

  const handleComplete = () => {
    router.push('/study');
  };

  if (flashcards.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <div className="text-xl text-gray-600 dark:text-gray-400 mb-4">
            No flashcards available for Domain {domainId}
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
      flashcards={flashcards}
      onExit={handleExit}
      onComplete={handleComplete}
    />
  );
}
