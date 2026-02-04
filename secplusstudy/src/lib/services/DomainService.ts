import { Domain, DomainSchema } from '@/types/domain';

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

export class DomainService {
  private static cache: Domain[] | null = null;

  static async getAllDomains(): Promise<Domain[]> {
    if (this.cache) {
      return this.cache;
    }

    try {
      const response = await fetch(`${basePath}/data/domains.json`);
      if (!response.ok) {
        console.error('Failed to load domains');
        return [];
      }

      const data = await response.json();
      const domains = data.map((domain: unknown) => DomainSchema.parse(domain));

      this.cache = domains;
      return domains;
    } catch (error) {
      console.error('Error loading domains:', error);
      return [];
    }
  }

  static async getDomainById(id: number): Promise<Domain | null> {
    const domains = await this.getAllDomains();
    return domains.find((domain) => domain.id === id) || null;
  }
}
