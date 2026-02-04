'use client';

import { useState } from 'react';
import { Icon } from '@/components/atoms/Icon/Icon';

interface AccordionProps {
  title: string;
  subtitle?: string;
  defaultOpen?: boolean;
  children: React.ReactNode;
}

export function Accordion({ title, subtitle, defaultOpen = false, children }: AccordionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden mb-4">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-4 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors flex items-center justify-between"
      >
        <div className="text-left">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">
            {title}
          </h2>
          {subtitle && (
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              {subtitle}
            </p>
          )}
        </div>
        <div className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}>
          <Icon name="chevron-down" size={24} />
        </div>
      </button>

      {isOpen && (
        <div className="px-6 py-4 bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
          {children}
        </div>
      )}
    </div>
  );
}
