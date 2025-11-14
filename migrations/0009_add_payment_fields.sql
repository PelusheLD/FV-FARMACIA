-- Agregar campos de datos bancarios para pagos en site_settings
ALTER TABLE site_settings
ADD COLUMN IF NOT EXISTS payment_bank TEXT,
ADD COLUMN IF NOT EXISTS payment_ci TEXT,
ADD COLUMN IF NOT EXISTS payment_phone TEXT,
ADD COLUMN IF NOT EXISTS payment_instructions TEXT;

-- Insertar valores por defecto si no existen
UPDATE site_settings
SET 
  payment_bank = COALESCE(payment_bank, 'Banplus'),
  payment_ci = COALESCE(payment_ci, 'J-503280280'),
  payment_phone = COALESCE(payment_phone, '04245775917'),
  payment_instructions = COALESCE(payment_instructions, 'IMPORTANTE: Indicar número de teléfono, banco, cédula titular del pago móvil para confirmar.')
WHERE payment_bank IS NULL OR payment_ci IS NULL OR payment_phone IS NULL;

-- Agregar campos de pago a orders
ALTER TABLE "orders" ADD COLUMN IF NOT EXISTS "total_in_bolivares" numeric(10, 2);
ALTER TABLE "orders" ADD COLUMN IF NOT EXISTS "payment_bank" text;
ALTER TABLE "orders" ADD COLUMN IF NOT EXISTS "payment_ci" text;
ALTER TABLE "orders" ADD COLUMN IF NOT EXISTS "payment_phone" text;
ALTER TABLE "orders" ADD COLUMN IF NOT EXISTS "payment_status" text NOT NULL DEFAULT 'pending';

