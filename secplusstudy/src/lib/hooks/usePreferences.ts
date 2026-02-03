'use client';

import { useState, useEffect, useCallback } from 'react';
import { UserPreferences, Theme, UiSize } from '@/types/preferences';
import { PreferencesRepository } from '@/lib/repositories/PreferencesRepository';

export function usePreferences() {
  const [preferences, setPreferences] = useState<UserPreferences>({
    theme: 'dark',
    uiSize: 'normal',
    lastStudiedDomain: null,
  });

  const refreshPreferences = useCallback(() => {
    setPreferences(PreferencesRepository.getPreferences());
  }, []);

  useEffect(() => {
    refreshPreferences();
  }, [refreshPreferences]);

  const setTheme = useCallback(
    (theme: Theme) => {
      PreferencesRepository.updateTheme(theme);
      refreshPreferences();
    },
    [refreshPreferences]
  );

  const setUiSize = useCallback(
    (uiSize: UiSize) => {
      PreferencesRepository.updateUiSize(uiSize);
      refreshPreferences();
    },
    [refreshPreferences]
  );

  const setLastStudiedDomain = useCallback(
    (domainId: number | null) => {
      PreferencesRepository.updateLastStudiedDomain(domainId);
      refreshPreferences();
    },
    [refreshPreferences]
  );

  return {
    preferences,
    setTheme,
    setUiSize,
    setLastStudiedDomain,
  };
}
