'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Domain } from '@/types/domain';
import { DomainService } from '@/lib/services/DomainService';
import { Button } from '@/components/atoms/Button/Button';
import { Icon } from '@/components/atoms/Icon/Icon';

export default function StudyPage() {
  const router = useRouter();
  const [domains, setDomains] = useState<Domain[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDomains = async () => {
      const data = await DomainService.getAllDomains();
      setDomains(data);
      setLoading(false);
    };
    loadDomains();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-gray-600 dark:text-gray-400">Loading domains...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="mb-8">
          <Link href="/">
            <Button variant="ghost" size="sm">
              <Icon name="arrow-left" size={20} />
              <span className="ml-2">Back to Home</span>
            </Button>
          </Link>
        </div>

        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Choose a Domain to Study
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Select a domain to begin studying flashcards, or study all available domains
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {domains.map((domain) => {
            const isAvailable = domain.id === 4 || domain.id === 5;

            return (
              <div
                key={domain.id}
                className={`bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border-2 ${
                  isAvailable
                    ? 'border-transparent hover:border-blue-500 cursor-pointer'
                    : 'border-gray-200 dark:border-gray-700 opacity-60'
                }`}
                onClick={() => {
                  if (isAvailable) {
                    router.push(`/study/${domain.id}`);
                  }
                }}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 flex items-center justify-center bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 rounded-lg font-bold text-xl">
                    {domain.id}
                  </div>
                  <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-300 text-xs font-semibold rounded-full">
                    {domain.examPercentage}%
                  </span>
                </div>

                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                  {domain.name}
                </h3>

                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
                  {domain.description}
                </p>

                <div className="flex items-center justify-between">
                  {isAvailable ? (
                    <span className="text-sm font-medium text-green-600 dark:text-green-400">
                      Ready to study
                    </span>
                  ) : (
                    <span className="text-sm font-medium text-gray-500 dark:text-gray-500">
                      Coming soon
                    </span>
                  )}
                  {isAvailable && <Icon name="arrow-right" size={20} />}
                </div>
              </div>
            );
          })}
        </div>

        <div className="max-w-2xl mx-auto">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl shadow-lg p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">Study All Available Domains</h3>
            <p className="mb-6 opacity-90">
              Review flashcards from all available domains in one session. Cards are prioritized
              by domain importance (D4 → D5).
            </p>
            <Button
              variant="secondary"
              size="lg"
              onClick={() => router.push('/study/all')}
              className="w-full sm:w-auto"
            >
              Start Studying All Domains
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
