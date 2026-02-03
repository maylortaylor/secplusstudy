import { UserProgress, AllProgress, UserProgressSchema, AllProgressSchema } from '@/types/progress';
import { LocalStorageUtil } from '@/lib/utils/localStorage';

const PROGRESS_KEY = 'secplus_progress';

export class ProgressRepository {
  static saveProgress(cardId: string, progress: UserProgress): void {
    const allProgress = this.getAllProgress();
    allProgress[cardId] = progress;
    LocalStorageUtil.setItem(PROGRESS_KEY, allProgress);
  }

  static getProgress(cardId: string): UserProgress | null {
    const allProgress = this.getAllProgress();
    return allProgress[cardId] || null;
  }

  static getAllProgress(): AllProgress {
    const data = LocalStorageUtil.getItem<AllProgress>(PROGRESS_KEY);
    if (!data) return {};

    try {
      return AllProgressSchema.parse(data);
    } catch {
      return {};
    }
  }

  static clearAllProgress(): void {
    LocalStorageUtil.removeItem(PROGRESS_KEY);
  }

  static updateMasteryStatus(cardId: string): void {
    const progress = this.getProgress(cardId);
    if (!progress) return;

    if (progress.timesCorrect >= 3 && !progress.mastered) {
      progress.mastered = true;
      progress.needsReview = false;
    }

    this.saveProgress(cardId, progress);
  }

  static markAsCorrect(cardId: string): void {
    const progress = this.getProgress(cardId) || {
      cardId,
      timesCorrect: 0,
      timesMissed: 0,
      lastSeen: null,
      mastered: false,
      needsReview: false,
    };

    progress.timesCorrect += 1;
    progress.lastSeen = new Date().toISOString();
    progress.needsReview = false;

    this.saveProgress(cardId, progress);
    this.updateMasteryStatus(cardId);
  }

  static markAsMissed(cardId: string): void {
    const progress = this.getProgress(cardId) || {
      cardId,
      timesCorrect: 0,
      timesMissed: 0,
      lastSeen: null,
      mastered: false,
      needsReview: false,
    };

    progress.timesMissed += 1;
    progress.lastSeen = new Date().toISOString();
    progress.needsReview = true;
    progress.mastered = false;

    this.saveProgress(cardId, progress);
  }

  static markAsReview(cardId: string): void {
    const progress = this.getProgress(cardId) || {
      cardId,
      timesCorrect: 0,
      timesMissed: 0,
      lastSeen: null,
      mastered: false,
      needsReview: false,
    };

    progress.needsReview = true;
    progress.lastSeen = new Date().toISOString();

    this.saveProgress(cardId, progress);
  }
}
