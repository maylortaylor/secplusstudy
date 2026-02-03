'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Flashcard } from '@/types/flashcard';
import { Domain } from '@/types/domain';
import { JsonFlashcardService } from '@/lib/services/FlashcardService';
import { DomainService } from '@/lib/services/DomainService';
import { Button } from '@/components/atoms/Button/Button';
import { Icon } from '@/components/atoms/Icon/Icon';

const flashcardService = new JsonFlashcardService();

export default function ReferencePage() {
  const [domains, setDomains] = useState<Domain[]>([]);
  const [flashcards, setFlashcards] = useState<Flashcard[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDomain, setSelectedDomain] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      const [domainsData, flashcardsData] = await Promise.all([
        DomainService.getAllDomains(),
        flashcardService.getAll(),
      ]);
      setDomains(domainsData);
      setFlashcards(flashcardsData);
      setLoading(false);
    };
    loadData();
  }, []);

  const filteredFlashcards = flashcards.filter((card) => {
    const matchesSearch =
      searchQuery === '' ||
      card.front.toLowerCase().includes(searchQuery.toLowerCase()) ||
      card.section.toLowerCase().includes(searchQuery.toLowerCase()) ||
      card.back.level1.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesDomain = selectedDomain === null || card.domain === selectedDomain;

    return matchesSearch && matchesDomain;
  });

  // Group by domain and section
  const groupedFlashcards = filteredFlashcards.reduce(
    (acc, card) => {
      if (!acc[card.domain]) {
        acc[card.domain] = {};
      }
      if (!acc[card.domain][card.section]) {
        acc[card.domain][card.section] = [];
      }
      acc[card.domain][card.section].push(card);
      return acc;
    },
    {} as Record<number, Record<string, Flashcard[]>>
  );

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="text-gray-600 dark:text-gray-400">Loading reference library...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-start justify-center">
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
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Reference Library
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Browse all flashcard content organized by domain and section
          </p>
        </div>

        <div className="mb-8 space-y-4">
          <input
            type="text"
            placeholder="Search terms, acronyms, or concepts..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <div className="flex gap-2 flex-wrap">
            <Button
              variant={selectedDomain === null ? 'primary' : 'secondary'}
              size="sm"
              onClick={() => setSelectedDomain(null)}
            >
              All Domains
            </Button>
            {domains
              .filter((d) => d.id === 4 || d.id === 5)
              .map((domain) => (
                <Button
                  key={domain.id}
                  variant={selectedDomain === domain.id ? 'primary' : 'secondary'}
                  size="sm"
                  onClick={() => setSelectedDomain(domain.id)}
                >
                  Domain {domain.id}
                </Button>
              ))}
          </div>
        </div>

        <div className="space-y-8">
          {Object.entries(groupedFlashcards).map(([domainId, sections]) => {
            const domain = domains.find((d) => d.id === parseInt(domainId));
            return (
              <div key={domainId} className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  Domain {domainId}: {domain?.name}
                </h2>

                {Object.entries(sections).map(([section, cards]) => (
                  <div key={section} className="mb-6">
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-3 border-b border-gray-200 dark:border-gray-700 pb-2">
                      {section}
                    </h3>
                    <div className="space-y-3">
                      {cards.map((card) => (
                        <div
                          key={card.id}
                          className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                        >
                          <div className="font-semibold text-gray-900 dark:text-white mb-1">
                            {card.front}
                          </div>
                          <div className="text-sm text-blue-600 dark:text-blue-400 mb-2">
                            {card.back.level1}
                          </div>
                          <div className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                            {card.back.level2}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            );
          })}
        </div>

        {filteredFlashcards.length === 0 && (
          <div className="text-center py-12">
            <div className="text-xl text-gray-600 dark:text-gray-400">
              No flashcards found matching your search
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
