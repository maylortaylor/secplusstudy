'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePreferences } from '@/lib/hooks/usePreferences';
import { useProgress } from '@/lib/hooks/useProgress';
import { Button } from '@/components/atoms/Button/Button';
import { Icon } from '@/components/atoms/Icon/Icon';

export default function ProfilePage() {
  const { preferences, setTheme, setUiSize } = usePreferences();
  const { allProgress, clearAll } = useProgress();
  const [showConfirmClear, setShowConfirmClear] = useState(false);

  const progressStats = Object.values(allProgress);
  const masteredCount = progressStats.filter((p) => p.mastered).length;
  const needsReviewCount = progressStats.filter((p) => p.needsReview).length;
  const totalStudied = progressStats.length;

  const handleClearProgress = () => {
    clearAll();
    setShowConfirmClear(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
      <div className="w-full max-w-5xl mx-auto px-6 py-16">
        <div className="mb-8">
          <Link href="/">
            <Button variant="ghost" size="sm">
              <Icon name="arrow-left" size={20} />
              <span className="ml-2">Back to Home</span>
            </Button>
          </Link>
        </div>

        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
            Settings & Profile
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Customize your study experience
          </p>
        </div>

        {/* Theme Settings */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Theme</h2>
          <div className="flex gap-3">
            <Button
              variant={preferences.theme === 'light' ? 'primary' : 'secondary'}
              onClick={() => setTheme('light')}
              size="md"
            >
              ☀️ Light
            </Button>
            <Button
              variant={preferences.theme === 'dark' ? 'primary' : 'secondary'}
              onClick={() => setTheme('dark')}
              size="md"
            >
              🌙 Dark
            </Button>
          </div>
        </div>

        {/* UI Size Settings */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Text Size</h2>
          <div className="flex gap-3">
            <Button
              variant={preferences.uiSize === 'cozy' ? 'primary' : 'secondary'}
              onClick={() => setUiSize('cozy')}
              size="sm"
            >
              Cozy
            </Button>
            <Button
              variant={preferences.uiSize === 'normal' ? 'primary' : 'secondary'}
              onClick={() => setUiSize('normal')}
              size="md"
            >
              Normal
            </Button>
            <Button
              variant={preferences.uiSize === 'large' ? 'primary' : 'secondary'}
              onClick={() => setUiSize('large')}
              size="lg"
            >
              Large
            </Button>
          </div>
        </div>

        {/* Study Statistics */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
            Study Statistics
          </h2>
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                {totalStudied}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">Cards Studied</div>
            </div>
            <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div className="text-3xl font-bold text-green-600 dark:text-green-400">
                {masteredCount}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">Mastered</div>
            </div>
            <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div className="text-3xl font-bold text-yellow-600 dark:text-yellow-400">
                {needsReviewCount}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400 mt-1">Needs Review</div>
            </div>
          </div>
        </div>

        {/* Data Management */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
            Data Management
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Clear all your study progress and start fresh. This action cannot be undone.
          </p>

          {!showConfirmClear ? (
            <Button
              variant="secondary"
              onClick={() => setShowConfirmClear(true)}
              size="md"
            >
              Clear All Progress
            </Button>
          ) : (
            <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
              <p className="text-red-800 dark:text-red-300 font-semibold mb-4">
                Are you sure? This will delete all your progress data.
              </p>
              <div className="flex gap-3">
                <Button
                  variant="secondary"
                  onClick={handleClearProgress}
                  size="sm"
                  className="bg-red-600 text-white hover:bg-red-700"
                >
                  Yes, Clear Everything
                </Button>
                <Button
                  variant="ghost"
                  onClick={() => setShowConfirmClear(false)}
                  size="sm"
                >
                  Cancel
                </Button>
              </div>
            </div>
          )}
        </div>

        <div className="mt-8 text-center text-sm text-gray-500 dark:text-gray-400">
          <p>CompTIA Security+ Study App v1.0</p>
          <p className="mt-1">All data is stored locally in your browser</p>
        </div>
      </div>
    </div>
  );
}
