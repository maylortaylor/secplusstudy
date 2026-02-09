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

        {/* Exam Resources */}
        <div className="mt-16 bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            📄 Exam Resources
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            <ResourceCard
              title="CompTIA Security+ SY0-701"
              subtitle="Official Exam Objectives"
              fileName="CompTIA Security+ SY0-701 Exam Objectives (7.0)_Jan2026.pdf"
              icon="📋"
            />
            <ResourceCard
              title="Security Study Guide"
              subtitle="9th Edition with 500+ Practice Tests"
              fileName="CompTIA-Security-Study-Guide-with-over-500-Practice-Test-Questions-Exam-SY0-701-9th-Edition_Feb2026.pdf"
              icon="📚"
            />
            <ResourceCard
              title="Professor Messer Hacks"
              subtitle="Essential Exam Tips & Mnemonics"
              fileName="professor-messer-comptia-exam-hacks-v107a_Jac2026.pdf"
              icon="💡"
            />
            <ResourceCard
              title="Professor Messer Practice Exams"
              subtitle="Full-Length Practice Tests (v17)"
              fileName="professor-messer-sy0-701-comptia-security-plus-practice-exams-v17_Feb2026.pdf"
              icon="🧪"
            />
          </div>
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
            />
            <DomainItem
              number={2}
              name="Threats, Vulnerabilities, and Mitigations"
              percentage={22}
            />
            <DomainItem
              number={3}
              name="Security Architecture"
              percentage={18}
            />
            <DomainItem
              number={4}
              name="Security Operations"
              percentage={28}
            />
            <DomainItem
              number={5}
              name="Security Program Management and Oversight"
              percentage={20}
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
}: {
  number: number;
  name: string;
  percentage: number;
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
    </div>
  );
}

function ResourceCard({
  title,
  subtitle,
  fileName,
  icon,
}: {
  title: string;
  subtitle: string;
  fileName: string;
  icon: string;
}) {
  return (
    <a
      href={`/files/${encodeURIComponent(fileName)}`}
      target="_blank"
      rel="noopener noreferrer"
      className="block p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors border-l-4 border-blue-500 hover:border-blue-600"
    >
      <div className="flex items-start gap-4">
        <div className="text-3xl">{icon}</div>
        <div className="flex-1 min-w-0">
          <h4 className="font-semibold text-gray-900 dark:text-white text-sm md:text-base">
            {title}
          </h4>
          <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400 mt-1">
            {subtitle}
          </p>
          <div className="mt-2 inline-flex items-center gap-1 text-blue-600 dark:text-blue-400 text-xs font-medium">
            📥 Download PDF
          </div>
        </div>
      </div>
    </a>
  );
}
