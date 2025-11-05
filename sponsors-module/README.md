# Módulo de Sponsors (Patrocinadores)

Este módulo contiene todos los archivos necesarios para implementar una sección completa de patrocinadores en tu aplicación, incluyendo la vista pública y el panel de administración.

## 📁 Estructura de Archivos

```
sponsors-module/
├── frontend/
│   ├── SponsorsSection.tsx          # Componente de vista pública
│   └── AdminSponsors.tsx            # Componente de panel administrativo
├── backend/
│   ├── schema-sponsors.ts           # Schema de Drizzle y Zod
│   ├── routes-sponsors.ts           # Rutas de la API
│   └── storage-sponsors.ts          # Interfaz y ejemplos de implementación
├── database/
│   └── migration-0008_add_sponsors_table.sql  # Migración SQL
├── integration/
│   ├── home-integration-example.tsx # Ejemplo de integración en home
│   └── admin-integration-example.tsx # Ejemplo de integración en admin
└── README.md                        # Este archivo
```

## 🚀 Instalación y Configuración

### 1. Base de Datos

Ejecuta la migración SQL en tu base de datos PostgreSQL:

```sql
-- Ejecuta el archivo: database/migration-0008_add_sponsors_table.sql
```

O si usas Drizzle:

```bash
# Copia el schema y ejecuta
npm run db:push
```

### 2. Backend

#### 2.1. Agregar el Schema

Copia el contenido de `backend/schema-sponsors.ts` y agrégalo a tu archivo `shared/schema.ts`:

```typescript
// En shared/schema.ts
export { sponsors, insertSponsorSchema, type InsertSponsor, type Sponsor } from "./schema-sponsors";
```

O simplemente agrega el código directamente:

```typescript
// En shared/schema.ts
import { pgTable, text, boolean, integer, timestamp, varchar } from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const sponsors = pgTable("sponsors", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  logoUrl: text("logo_url"),
  websiteUrl: text("website_url"),
  enabled: boolean("enabled").notNull().default(true),
  order: integer("order").notNull().default(0),
  createdAt: timestamp("created_at").notNull().default(sql`now()`),
});

export const insertSponsorSchema = createInsertSchema(sponsors).omit({
  id: true,
  createdAt: true,
});

export type InsertSponsor = z.infer<typeof insertSponsorSchema>;
export type Sponsor = typeof sponsors.$inferSelect;
```

#### 2.2. Implementar los Métodos de Storage

Abre `backend/storage-sponsors.ts` y copia los métodos de implementación para PostgreSQL en tu archivo `server/storage-pg.ts`:

```typescript
// En server/storage-pg.ts
import { sponsors } from "@shared/schema";
import { eq, asc } from "drizzle-orm";

// Agregar estos métodos a tu clase PostgresStorage:

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
```

#### 2.3. Agregar las Rutas de la API

En tu archivo `server/routes.ts`, importa y registra las rutas:

```typescript
// En server/routes.ts
import { registerSponsorRoutes } from "./routes-sponsors";
import { insertSponsorSchema } from "@shared/schema"; // Si lo agregaste a shared/schema.ts

// Dentro de tu función registerRoutes:
registerSponsorRoutes(app, storage);
```

O copia directamente las rutas de `backend/routes-sponsors.ts` a tu `server/routes.ts`:

```typescript
// En server/routes.ts - Agregar después de las otras rutas
import { insertSponsorSchema } from "@shared/schema";
import { z } from "zod";

// GET /api/sponsors
app.get("/api/sponsors", async (req, res) => {
  try {
    const includeDisabled = req.query.includeDisabled === 'true';
    const sponsors = await storage.getSponsors(includeDisabled);
    res.json(sponsors);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch sponsors" });
  }
});

// GET /api/sponsors/:id
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

// POST /api/sponsors
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

// PUT /api/sponsors/:id
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

// DELETE /api/sponsors/:id
app.delete("/api/sponsors/:id", async (req, res) => {
  try {
    await storage.deleteSponsor(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: "Failed to delete sponsor" });
  }
});
```

#### 2.4. Actualizar la Interfaz IStorage

En tu archivo `server/storage.ts`, agrega estos métodos a la interfaz `IStorage`:

```typescript
// En server/storage.ts
export interface IStorage {
  // ... otros métodos existentes ...
  
  // Sponsors
  getSponsors(includeDisabled?: boolean): Promise<Sponsor[]>;
  getSponsorById(id: string): Promise<Sponsor | undefined>;
  createSponsor(sponsor: InsertSponsor): Promise<Sponsor>;
  updateSponsor(id: string, sponsor: Partial<InsertSponsor>): Promise<Sponsor | undefined>;
  deleteSponsor(id: string): Promise<void>;
}
```

### 3. Frontend

#### 3.1. Copiar Componentes

Copia los archivos de componentes a tu proyecto:

```bash
# Copia el componente de vista pública
cp sponsors-module/frontend/SponsorsSection.tsx client/src/components/

# Copia el componente de admin
cp sponsors-module/frontend/AdminSponsors.tsx client/src/components/admin/
```

#### 3.2. Integrar en la Página Principal

Revisa `integration/home-integration-example.tsx` para ver cómo integrar `SponsorsSection` en tu página principal.

**Pasos rápidos:**

1. Importa el componente:
```typescript
import SponsorsSection from "@/components/SponsorsSection";
```

2. Agrégalo en el JSX donde quieras mostrarlo:
```typescript
<SponsorsSection />
```

#### 3.3. Integrar en el Panel Admin

Revisa `integration/admin-integration-example.tsx` para ver cómo integrar `AdminSponsors` en tu panel administrativo.

**Pasos rápidos:**

1. Importa el componente y el icono:
```typescript
import AdminSponsors from "@/components/admin/AdminSponsors";
import { Heart } from "lucide-react";
```

2. Agrega 'sponsors' al tipo `AdminSection`:
```typescript
type AdminSection = 'categories' | 'orders' | 'users' | 'settings' | 'import' | 'sponsors';
```

3. Agrega el ítem de menú:
```typescript
{
  id: 'sponsors' as AdminSection,
  title: 'Patrocinadores',
  icon: Heart,
}
```

4. Agrega el renderizado condicional:
```typescript
{activeSection === 'sponsors' && <AdminSponsors />}
```

## 📋 Dependencias Requeridas

### Backend
- `express` - Framework web
- `drizzle-orm` - ORM para base de datos
- `drizzle-zod` - Integración de Zod con Drizzle
- `zod` - Validación de esquemas
- `postgresql` - Base de datos (o la que uses)

### Frontend
- `react` - Framework UI
- `@tanstack/react-query` - Manejo de estado y fetch de datos
- `lucide-react` - Iconos
- `tailwindcss` - Estilos (opcional, pero recomendado)
- Componentes UI (Button, Card, Dialog, Input, Label, etc.)

## 🔧 Características

- ✅ Vista pública con grid responsivo de sponsors
- ✅ Panel administrativo completo (CRUD)
- ✅ Soporte para logos (URL o subida de archivos)
- ✅ Enlaces a sitios web de sponsors
- ✅ Ordenamiento personalizable
- ✅ Habilitar/deshabilitar sponsors
- ✅ Actualización automática de la lista sin recargar
- ✅ Validación de datos con Zod
- ✅ Soporte para PostgreSQL

## 📝 API Endpoints

### GET /api/sponsors
Obtiene todos los sponsors habilitados (o todos si `?includeDisabled=true`)

**Query params:**
- `includeDisabled` (opcional): `true` para incluir sponsors deshabilitados

**Response:**
```json
[
  {
    "id": "uuid",
    "name": "Nombre del Sponsor",
    "logoUrl": "https://...",
    "websiteUrl": "https://...",
    "enabled": true,
    "order": 0,
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
]
```

### GET /api/sponsors/:id
Obtiene un sponsor por ID

### POST /api/sponsors
Crea un nuevo sponsor

**Body:**
```json
{
  "name": "Nombre del Sponsor",
  "logoUrl": "https://...", // opcional
  "websiteUrl": "https://...", // opcional
  "enabled": true, // opcional, default: true
  "order": 0 // opcional, default: 0
}
```

### PUT /api/sponsors/:id
Actualiza un sponsor existente

**Body:** (todos los campos son opcionales)
```json
{
  "name": "Nuevo Nombre",
  "logoUrl": "https://...",
  "websiteUrl": "https://...",
  "enabled": false,
  "order": 1
}
```

### DELETE /api/sponsors/:id
Elimina un sponsor

## 🎨 Personalización

### Estilos de la Vista Pública

El componente `SponsorsSection` usa Tailwind CSS. Puedes personalizar los estilos modificando las clases:

- Fondo: `bg-gradient-to-br from-green-50 via-white to-green-50`
- Grid: `grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5`
- Tarjetas: `bg-white rounded-xl p-6 shadow-md`

### Estilos del Admin

El componente `AdminSponsors` usa los componentes UI de shadcn/ui. Puedes personalizarlos modificando los componentes base.

## 🐛 Solución de Problemas

### La lista no se actualiza automáticamente después de crear/editar/eliminar

Asegúrate de que las queries se estén invalidando correctamente. El código ya incluye la invalidación usando `queryClient.invalidateQueries` con un `predicate` que busca todas las queries que comienzan con `/api/sponsors`.

### Error: "Table 'sponsors' does not exist"

Ejecuta la migración SQL en tu base de datos. Verifica que el nombre de la tabla sea correcto y que tengas permisos para crear tablas.

### Los sponsors no aparecen en la vista pública

Verifica que:
1. Los sponsors estén marcados como `enabled: true`
2. La query esté usando la ruta correcta: `/api/sponsors`
3. El backend esté retornando los datos correctamente

## 📄 Licencia

Este módulo es parte del proyecto y puede ser reutilizado libremente.

## 🤝 Contribuciones

Si encuentras algún problema o tienes sugerencias, por favor crea un issue o pull request.

---

**Nota:** Este módulo fue extraído del proyecto FV-Bodegon y está listo para ser reutilizado en otros proyectos. Asegúrate de adaptar las rutas de importación y los paths según la estructura de tu proyecto.

