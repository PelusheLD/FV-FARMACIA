-- Remove obsolete carousel columns for FV BODEGONES and ZONA LONNGE
ALTER TABLE "site_settings" 
  DROP COLUMN IF EXISTS "enable_carousel_1",
  DROP COLUMN IF EXISTS "enable_carousel_2",
  DROP COLUMN IF EXISTS "carousel_title_1",
  DROP COLUMN IF EXISTS "carousel_subtitle_1",
  DROP COLUMN IF EXISTS "carousel_description_1",
  DROP COLUMN IF EXISTS "carousel_image_1",
  DROP COLUMN IF EXISTS "carousel_background_1",
  DROP COLUMN IF EXISTS "carousel_button_1",
  DROP COLUMN IF EXISTS "carousel_url_1",
  DROP COLUMN IF EXISTS "carousel_title_2",
  DROP COLUMN IF EXISTS "carousel_subtitle_2",
  DROP COLUMN IF EXISTS "carousel_description_2",
  DROP COLUMN IF EXISTS "carousel_image_2",
  DROP COLUMN IF EXISTS "carousel_background_2",
  DROP COLUMN IF EXISTS "carousel_button_2",
  DROP COLUMN IF EXISTS "carousel_url_2";

-- Remove image URL field for FV FARMACIA carousel
ALTER TABLE "site_settings"
  DROP COLUMN IF EXISTS "carousel_image_3";

