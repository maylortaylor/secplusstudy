'use client';

import { useEffect } from 'react';
import { PreferencesRepository } from '@/lib/repositories/PreferencesRepository';

export function PreferencesProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Get initial preferences and apply immediately on mount
    const applyPreferences = () => {
      const prefs = PreferencesRepository.getPreferences();

      // Apply theme to html element
      document.documentElement.setAttribute('data-theme', prefs.theme);

      // Apply UI size to body element
      document.body.classList.remove('ui-cozy', 'ui-normal', 'ui-large');
      document.body.classList.add(`ui-${prefs.uiSize}`);
    };

    // Apply preferences immediately
    applyPreferences();

    // Listen for preferences updates (custom event from same tab)
    const handlePreferencesUpdate = () => {
      applyPreferences();
    };

    window.addEventListener('preferences-updated', handlePreferencesUpdate);

    return () => {
      window.removeEventListener('preferences-updated', handlePreferencesUpdate);
    };
  }, []);

  return <>{children}</>;
}
