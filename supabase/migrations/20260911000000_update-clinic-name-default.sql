-- Atualiza o nome padrão da clínica de "Gabriela" para "Maria Carolina"

ALTER TABLE public.clinic_settings
  ALTER COLUMN clinic_name SET DEFAULT 'Maria Carolina Clínica de Estética'::text;

UPDATE public.clinic_settings
  SET clinic_name = 'Maria Carolina Clínica de Estética'
  WHERE clinic_name = 'Gabriela Clínica de Estética';
