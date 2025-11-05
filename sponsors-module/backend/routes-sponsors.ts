import type { Express } from "express";
import { z } from "zod";
import type { IStorage } from "./storage-sponsors";
import { insertSponsorSchema } from "./schema-sponsors";

/**
 * Registra las rutas de la API para sponsors
 * 
 * @param app - Instancia de Express
 * @param storage - Instancia de storage que implementa IStorage
 * 
 * Endpoints disponibles:
 * - GET /api/sponsors - Obtiene todos los sponsors (opcional: ?includeDisabled=true para incluir deshabilitados)
 * - GET /api/sponsors/:id - Obtiene un sponsor por ID
 * - POST /api/sponsors - Crea un nuevo sponsor
 * - PUT /api/sponsors/:id - Actualiza un sponsor existente
 * - DELETE /api/sponsors/:id - Elimina un sponsor
 */
export function registerSponsorRoutes(app: Express, storage: IStorage) {
  // GET /api/sponsors - Obtener todos los sponsors
  app.get("/api/sponsors", async (req, res) => {
    try {
      const includeDisabled = req.query.includeDisabled === 'true';
      const sponsors = await storage.getSponsors(includeDisabled);
      res.json(sponsors);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch sponsors" });
    }
  });

  // GET /api/sponsors/:id - Obtener un sponsor por ID
  app.get("/api/sponsors/:id", async (req, res) => {
    try {
      const sponsor = await storage.getSponsorById(req.params.id);
      if (!sponsor) {
        return res.status(404).json({ error: "Sponsor not found" });
      }
      res.json(sponsor);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch sponsor" });
    }
  });

  // POST /api/sponsors - Crear un nuevo sponsor
  app.post("/api/sponsors", async (req, res) => {
    try {
      const validatedData = insertSponsorSchema.parse(req.body);
      const sponsor = await storage.createSponsor(validatedData);
      res.status(201).json(sponsor);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: error.errors });
      }
      res.status(500).json({ error: "Failed to create sponsor" });
    }
  });

  // PUT /api/sponsors/:id - Actualizar un sponsor existente
  app.put("/api/sponsors/:id", async (req, res) => {
    try {
      const validatedData = insertSponsorSchema.partial().parse(req.body);
      const sponsor = await storage.updateSponsor(req.params.id, validatedData);
      if (!sponsor) {
        return res.status(404).json({ error: "Sponsor not found" });
      }
      res.json(sponsor);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ error: error.errors });
      }
      res.status(500).json({ error: "Failed to update sponsor" });
    }
  });

  // DELETE /api/sponsors/:id - Eliminar un sponsor
  app.delete("/api/sponsors/:id", async (req, res) => {
    try {
      await storage.deleteSponsor(req.params.id);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: "Failed to delete sponsor" });
    }
  });
}

