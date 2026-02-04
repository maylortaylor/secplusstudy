'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Flashcard } from '@/types/flashcard';
import { Domain } from '@/types/domain';
import { JsonFlashcardService } from '@/lib/services/FlashcardService';
import { DomainService } from '@/lib/services/DomainService';
import { Button } from '@/components/atoms/Button/Button';
import { Icon } from '@/components/atoms/Icon/Icon';
import { Accordion } from '@/components/molecules/Accordion/Accordion';

const flashcardService = new JsonFlashcardService();

export default function ReferencePage() {
  const [domains, setDomains] = useState<Domain[]>([]);
  const [flashcards, setFlashcards] = useState<Flashcard[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDomain, setSelectedDomain] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [expandedCards, setExpandedCards] = useState<Set<string>>(new Set());
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set());

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

  const toggleCard = (cardId: string) => {
    setExpandedCards((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(cardId)) {
        newSet.delete(cardId);
      } else {
        newSet.add(cardId);
      }
      return newSet;
    });
  };

  const toggleSection = (sectionKey: string) => {
    setExpandedSections((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(sectionKey)) {
        newSet.delete(sectionKey);
      } else {
        newSet.add(sectionKey);
      }
      return newSet;
    });
  };

  const filteredFlashcards = flashcards.filter((card) => {
    const searchLower = searchQuery.toLowerCase();
    const matchesSearch =
      searchQuery === '' ||
      card.front.toLowerCase().includes(searchLower) ||
      card.section.toLowerCase().includes(searchLower) ||
      card.back.level1.toLowerCase().includes(searchLower) ||
      card.back.level2.toLowerCase().includes(searchLower) ||
      card.back.level3.toLowerCase().includes(searchLower);

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
              .filter((d) => d.id === 2 || d.id === 4 || d.id === 5)
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

        <div className="space-y-6">
          {Object.entries(groupedFlashcards).map(([domainId, sections]) => {
            const domain = domains.find((d) => d.id === parseInt(domainId));
            return (
              <Accordion
                key={domainId}
                title={`Domain ${domainId}: ${domain?.name}`}
                subtitle={`${domain?.examPercentage}% of exam • ${Object.values(sections).flat().length} terms`}
                defaultOpen={parseInt(domainId) === 4}
              >
                <div className="space-y-8">
                  {Object.entries(sections).map(([section, cards]) => {
                    const sectionKey = `${domainId}-${section}`;
                    const isSectionExpanded = expandedSections.has(sectionKey);

                    return (
                      <div key={section} className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                        <button
                          onClick={() => toggleSection(sectionKey)}
                          className="w-full px-5 py-4 bg-gray-50 dark:bg-gray-800/50 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors flex items-center justify-between"
                        >
                          <div className="flex items-center gap-3">
                            <Icon
                              name="chevron-down"
                              size={20}
                              className={`transition-transform text-gray-600 dark:text-gray-400 ${isSectionExpanded ? '' : '-rotate-90'}`}
                            />
                            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                              {section}
                            </h3>
                          </div>
                          <span className="text-sm text-gray-500 dark:text-gray-400">
                            {cards.length} {cards.length === 1 ? 'term' : 'terms'}
                          </span>
                        </button>

                        {isSectionExpanded && (
                          <div className="p-5 space-y-4 bg-white dark:bg-gray-900/50">
                            {cards.map((card) => {
                              const isExpanded = expandedCards.has(card.id);
                              return (
                                <div
                                  key={card.id}
                                  className="p-5 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:shadow-md dark:hover:border-blue-500 transition-all"
                                >
                                  <div className="font-bold text-lg text-gray-900 dark:text-white mb-2">
                                    {card.front}
                                  </div>
                                  <div className="text-base text-blue-600 dark:text-blue-400 mb-3 font-medium">
                                    {card.back.level1}
                                  </div>
                                  <div className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed mb-3">
                                    {card.back.level2}
                                  </div>

                                  {isExpanded && (
                                    <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 rounded">
                                      <div className="text-sm font-semibold text-blue-900 dark:text-blue-300 mb-2">
                                        💡 Exam Tips:
                                      </div>
                                      <div className="text-sm text-gray-800 dark:text-gray-200 leading-relaxed">
                                        {card.back.level3}
                                      </div>
                                    </div>
                                  )}

                                  <button
                                    onClick={() => toggleCard(card.id)}
                                    className="mt-3 text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium flex items-center gap-2 transition-colors"
                                  >
                                    {isExpanded ? (
                                      <>
                                        <Icon name="chevron-down" size={16} className="rotate-180 transition-transform" />
                                        Hide Exam Tips
                                      </>
                                    ) : (
                                      <>
                                        <Icon name="chevron-down" size={16} className="transition-transform" />
                                        Show Exam Tips
                                      </>
                                    )}
                                  </button>
                                </div>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </Accordion>
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
