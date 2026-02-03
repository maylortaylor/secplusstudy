import {
  UserPreferences,
  UserPreferencesSchema,
  Theme,
  UiSize,
} from '@/types/preferences';
import { LocalStorageUtil } from '@/lib/utils/localStorage';

const PREFERENCES_KEY = 'secplus_preferences';

export class PreferencesRepository {
  static getPreferences(): UserPreferences {
    const data = LocalStorageUtil.getItem<UserPreferences>(PREFERENCES_KEY);
    if (!data) {
      return UserPreferencesSchema.parse({});
    }

    try {
      return UserPreferencesSchema.parse(data);
    } catch {
      return UserPreferencesSchema.parse({});
    }
  }

  static savePreferences(preferences: UserPreferences): void {
    LocalStorageUtil.setItem(PREFERENCES_KEY, preferences);
    // Dispatch custom event for same-tab updates
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new Event('preferences-updated'));
    }
  }

  static updateTheme(theme: Theme): void {
    const preferences = this.getPreferences();
    preferences.theme = theme;
    this.savePreferences(preferences);
  }

  static updateUiSize(uiSize: UiSize): void {
    const preferences = this.getPreferences();
    preferences.uiSize = uiSize;
    this.savePreferences(preferences);
  }

  static updateLastStudiedDomain(domainId: number | null): void {
    const preferences = this.getPreferences();
    preferences.lastStudiedDomain = domainId;
    this.savePreferences(preferences);
  }
}
