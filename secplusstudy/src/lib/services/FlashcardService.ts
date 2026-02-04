import { Flashcard, FlashcardSchema } from '@/types/flashcard';

export interface IFlashcardService {
  getAll(): Promise<Flashcard[]>;
  getByDomain(domainId: number): Promise<Flashcard[]>;
  getById(id: string): Promise<Flashcard | null>;
  getBySection(domainId: number, section: string): Promise<Flashcard[]>;
}

export class JsonFlashcardService implements IFlashcardService {
  private cache: Map<number, Flashcard[]> = new Map();

  async getAll(): Promise<Flashcard[]> {
    const domains = [2, 4, 5];
    const allCards: Flashcard[] = [];

    for (const domain of domains) {
      const cards = await this.getByDomain(domain);
      allCards.push(...cards);
    }

    return allCards;
  }

  async getByDomain(domainId: number): Promise<Flashcard[]> {
    if (this.cache.has(domainId)) {
      return this.cache.get(domainId)!;
    }

    try {
      const response = await fetch(`/data/flashcards_domain${domainId}.json`);
      if (!response.ok) {
        console.error(`Failed to load flashcards for domain ${domainId}`);
        return [];
      }

      const data = await response.json();
      const cards = data.map((card: unknown) => FlashcardSchema.parse(card));

      this.cache.set(domainId, cards);
      return cards;
    } catch (error) {
      console.error(`Error loading flashcards for domain ${domainId}:`, error);
      return [];
    }
  }

  async getById(id: string): Promise<Flashcard | null> {
    const allCards = await this.getAll();
    return allCards.find((card) => card.id === id) || null;
  }

  async getBySection(domainId: number, section: string): Promise<Flashcard[]> {
    const cards = await this.getByDomain(domainId);
    return cards.filter((card) => card.section === section);
  }
}
