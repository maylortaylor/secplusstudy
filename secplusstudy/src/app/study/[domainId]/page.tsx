import { promises as fs } from 'fs';
import path from 'path';
import { Flashcard, FlashcardSchema } from '@/types/flashcard';
import StudyDomainClientPage from './client';

async function getFlashcardsForDomain(domainId: number): Promise<Flashcard[]> {
  const filePath = path.join(process.cwd(), 'public', 'data', `flashcards_domain${domainId}.json`);
  try {
    const fileContent = await fs.readFile(filePath, 'utf-8');
    const data = JSON.parse(fileContent);
    return data.map((card: unknown) => FlashcardSchema.parse(card));
  } catch (error) {
    console.error(`Error loading flashcards for domain ${domainId}:`, error);
    return [];
  }
}

export async function generateStaticParams() {
  const filePath = path.join(process.cwd(), 'public', 'data', 'domains.json');
  const fileContent = await fs.readFile(filePath, 'utf-8');
  const domains = JSON.parse(fileContent);

  return domains.map((domain: { id: number }) => ({
    domainId: domain.id.toString(),
  }));
}

export default async function StudyDomainPage({ params }: { params: { domainId: string } }) {
  const domainId = parseInt(params.domainId, 10);
  const flashcards = await getFlashcardsForDomain(domainId);

  return <StudyDomainClientPage flashcards={flashcards} domainId={domainId} />;
}
