import type { Sponsor, InsertSponsor } from "./schema-sponsors";

/**
 * Interfaz para el storage de sponsors
 * Debes implementar esta interfaz en tu clase de storage principal
 */
export interface IStorage {
  /**
   * Obtiene todos los sponsors
   * @param includeDisabled - Si es true, incluye sponsors deshabilitados (útil para admin)
   * @returns Array de sponsors ordenados por el campo 'order'
   */
  getSponsors(includeDisabled?: boolean): Promise<Sponsor[]>;

  /**
   * Obtiene un sponsor por su ID
   * @param id - ID del sponsor
   * @returns El sponsor o undefined si no existe
   */
  getSponsorById(id: string): Promise<Sponsor | undefined>;

  /**
   * Crea un nuevo sponsor
   * @param sponsor - Datos del sponsor a crear
   * @returns El sponsor creado
   */
  createSponsor(sponsor: InsertSponsor): Promise<Sponsor>;

  /**
   * Actualiza un sponsor existente
   * @param id - ID del sponsor a actualizar
   * @param sponsor - Datos parciales a actualizar
   * @returns El sponsor actualizado o undefined si no existe
   */
  updateSponsor(id: string, sponsor: Partial<InsertSponsor>): Promise<Sponsor | undefined>;

  /**
   * Elimina un sponsor
   * @param id - ID del sponsor a eliminar
   */
  deleteSponsor(id: string): Promise<void>;
}

// ============================================
// EJEMPLO DE IMPLEMENTACIÓN PARA POSTGRESQL
// ============================================
// Copia este código en tu archivo storage-pg.ts o storage.ts
// y asegúrate de importar las dependencias necesarias

/*
import { db } from "./db"; // Tu instancia de Drizzle
import { sponsors } from "./schema-sponsors";
import { eq, asc } from "drizzle-orm";

// Métodos para agregar a tu clase PostgresStorage:

async getSponsors(includeDisabled: boolean = false): Promise<Sponsor[]> {
  if (includeDisabled) {
    const result = await db.select().from(sponsors).orderBy(asc(sponsors.order));
    return result;
  } else {
    const result = await db.select().from(sponsors)
      .where(eq(sponsors.enabled, true))
      .orderBy(asc(sponsors.order));
    return result;
  }
}

async getSponsorById(id: string): Promise<Sponsor | undefined> {
  const result = await db.select().from(sponsors).where(eq(sponsors.id, id));
  return result[0];
}

async createSponsor(sponsor: InsertSponsor): Promise<Sponsor> {
  const result = await db.insert(sponsors).values(sponsor).returning();
  return result[0];
}

async updateSponsor(id: string, sponsor: Partial<InsertSponsor>): Promise<Sponsor | undefined> {
  const result = await db.update(sponsors)
    .set(sponsor)
    .where(eq(sponsors.id, id))
    .returning();
  return result[0];
}

async deleteSponsor(id: string): Promise<void> {
  await db.delete(sponsors).where(eq(sponsors.id, id));
}
*/

// ============================================
// EJEMPLO DE IMPLEMENTACIÓN PARA MEMORIA (Testing)
// ============================================
/*
export class MemStorageSponsors implements IStorage {
  private sponsors: Map<string, Sponsor> = new Map();

  async getSponsors(includeDisabled: boolean = false): Promise<Sponsor[]> {
    const allSponsors = Array.from(this.sponsors.values());
    const filtered = includeDisabled 
      ? allSponsors 
      : allSponsors.filter(s => s.enabled);
    return filtered.sort((a, b) => a.order - b.order);
  }

  async getSponsorById(id: string): Promise<Sponsor | undefined> {
    return this.sponsors.get(id);
  }

  async createSponsor(sponsor: InsertSponsor): Promise<Sponsor> {
    const newSponsor: Sponsor = {
      id: crypto.randomUUID(),
      ...sponsor,
      logoUrl: sponsor.logoUrl ?? null,
      websiteUrl: sponsor.websiteUrl ?? null,
      enabled: sponsor.enabled ?? true,
      order: sponsor.order ?? 0,
      createdAt: new Date(),
    };
    this.sponsors.set(newSponsor.id, newSponsor);
    return newSponsor;
  }

  async updateSponsor(id: string, sponsor: Partial<InsertSponsor>): Promise<Sponsor | undefined> {
    const existing = this.sponsors.get(id);
    if (!existing) return undefined;
    
    const updated = { ...existing, ...sponsor };
    this.sponsors.set(id, updated);
    return updated;
  }

  async deleteSponsor(id: string): Promise<void> {
    this.sponsors.delete(id);
  }
}
*/

