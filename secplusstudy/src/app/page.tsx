'use client';

import Link from 'next/link';
import { Button } from '@/components/atoms/Button/Button';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
      <div className="w-full max-w-5xl mx-auto px-6 py-16">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-4">
            CompTIA Security+
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            SY0-701 Study Application
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Flashcards Card */}
          <Link href="/study">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-shadow cursor-pointer border-2 border-transparent hover:border-blue-500">
              <div className="text-6xl mb-4">🎯</div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                Flash Cards
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Study with flashcards featuring progressive disclosure. Master key terms, acronyms, and concepts across all 5 domains.
              </p>
              <Button variant="primary" size="md" className="w-full">
                Start Studying
              </Button>
            </div>
          </Link>

          {/* Reference Card */}
          <Link href="/reference">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-shadow cursor-pointer border-2 border-transparent hover:border-indigo-500">
              <div className="text-6xl mb-4">📚</div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                Reference Library
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Browse all flashcard content organized by domain and section. Search and reference key security concepts.
              </p>
              <Button variant="secondary" size="md" className="w-full">
                Browse Reference
              </Button>
            </div>
          </Link>
        </div>

        {/* Domain Overview */}
        <div className="mt-16 bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Exam Domains
          </h3>
          <div className="space-y-4">
            <DomainItem
              number={1}
              name="General Security Concepts"
              percentage={12}
              available={false}
            />
            <DomainItem
              number={2}
              name="Threats, Vulnerabilities, and Mitigations"
              percentage={22}
              available={true}
            />
            <DomainItem
              number={3}
              name="Security Architecture"
              percentage={18}
              available={false}
            />
            <DomainItem
              number={4}
              name="Security Operations"
              percentage={28}
              available={true}
            />
            <DomainItem
              number={5}
              name="Security Program Management and Oversight"
              percentage={20}
              available={true}
            />
          </div>
        </div>

        <div className="mt-8 text-center">
          <Link href="/profile">
            <Button variant="ghost" size="sm">
              Settings & Profile
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

function DomainItem({
  number,
  name,
  percentage,
  available,
}: {
  number: number;
  name: string;
  percentage: number;
  available: boolean;
}) {
  return (
    <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 flex items-center justify-center bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 rounded-lg font-bold text-lg">
          {number}
        </div>
        <div>
          <div className="font-semibold text-gray-900 dark:text-white">{name}</div>
          <div className="text-sm text-gray-600 dark:text-gray-400">
            {percentage}% of exam
          </div>
        </div>
      </div>
      {available ? (
        <span className="px-3 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-300 text-sm font-medium rounded-full">
          Available
        </span>
      ) : (
        <span className="px-3 py-1 bg-gray-200 dark:bg-gray-600 text-gray-600 dark:text-gray-400 text-sm font-medium rounded-full">
          Coming Soon
        </span>
      )}
    </div>
  );
}
