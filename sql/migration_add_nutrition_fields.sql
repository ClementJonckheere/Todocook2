
-- Migration : ajout des colonnes nutritionnelles à la table ingredients

ALTER TABLE ingredients ADD COLUMN calories FLOAT;
ALTER TABLE ingredients ADD COLUMN proteins FLOAT;
ALTER TABLE ingredients ADD COLUMN carbs FLOAT;
ALTER TABLE ingredients ADD COLUMN fats FLOAT;
