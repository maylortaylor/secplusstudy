'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useFlashcards } from '@/lib/hooks/useFlashcards';
import { FlashcardViewer } from '@/components/organisms/FlashcardViewer/FlashcardViewer';

export default function StudyDomainPage() {
  const params = useParams();
  const router = useRouter();
  const domainId = parseInt(params.domainId as string, 10);

  const { flashcards, loading, error } = useFlashcards(domainId);

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
            Loading flashcards...
          </div>
          <div className="text-sm text-gray-500 dark:text-gray-500">Domain {domainId}</div>
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
