-- ============================================================
-- Correção de schema drift: o frontend (dashboard.tsx, hours.tsx,
-- agendar.tsx) já referenciava as tabelas "appointment_services"
-- (múltiplos serviços por agendamento) e "blocked_slots" (bloqueio
-- manual de horários), mas nenhuma migration chegou a criá-las —
-- por isso o dashboard não listava nenhum agendamento (a query
-- com o embed appointment_services(*) retornava erro PGRST200).
-- ============================================================

-- 1. appointment_services: serviços extras vinculados a um agendamento
CREATE TABLE public.appointment_services (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    appointment_id uuid NOT NULL,
    service_id uuid,
    service_name text,
    price numeric(12,2) DEFAULT 0 NOT NULL,
    cost numeric(12,2) DEFAULT 0 NOT NULL,
    duration_minutes integer DEFAULT 30 NOT NULL,
    is_hof boolean DEFAULT false NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL
);

ALTER TABLE ONLY public.appointment_services
    ADD CONSTRAINT appointment_services_pkey PRIMARY KEY (id);

ALTER TABLE ONLY public.appointment_services
    ADD CONSTRAINT appointment_services_appointment_id_fkey FOREIGN KEY (appointment_id) REFERENCES public.appointments(id) ON DELETE CASCADE;

ALTER TABLE ONLY public.appointment_services
    ADD CONSTRAINT appointment_services_service_id_fkey FOREIGN KEY (service_id) REFERENCES public.services(id) ON DELETE SET NULL;

CREATE INDEX appointment_services_appointment_id_idx ON public.appointment_services USING btree (appointment_id);

ALTER TABLE public.appointment_services ENABLE ROW LEVEL SECURITY;

-- Dono é definido pelo appointment pai (não há user_id nesta tabela)
CREATE POLICY "users manage own appointment_services" ON public.appointment_services
  TO authenticated
  USING (EXISTS (
    SELECT 1 FROM public.appointments a
    WHERE a.id = appointment_services.appointment_id AND a.user_id = auth.uid()
  ))
  WITH CHECK (EXISTS (
    SELECT 1 FROM public.appointments a
    WHERE a.id = appointment_services.appointment_id AND a.user_id = auth.uid()
  ));

-- 2. blocked_slots: bloqueios manuais de horário (ex.: folga, feriado)
CREATE TABLE public.blocked_slots (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    user_id uuid NOT NULL,
    date date NOT NULL,
    start_time time without time zone NOT NULL,
    end_time time without time zone NOT NULL,
    reason text,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL
);

ALTER TABLE ONLY public.blocked_slots
    ADD CONSTRAINT blocked_slots_pkey PRIMARY KEY (id);

ALTER TABLE ONLY public.blocked_slots
    ADD CONSTRAINT blocked_slots_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;

CREATE INDEX blocked_slots_user_id_date_idx ON public.blocked_slots USING btree (user_id, date);

CREATE TRIGGER blocked_slots_updated_at BEFORE UPDATE ON public.blocked_slots FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

ALTER TABLE public.blocked_slots ENABLE ROW LEVEL SECURITY;

CREATE POLICY "users manage own blocked_slots" ON public.blocked_slots
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Leitura anônima necessária para a página pública /agendar calcular
-- os horários disponíveis (mesmo padrão de anon_read_business_hours).
CREATE POLICY "anon_read_blocked_slots" ON public.blocked_slots
  FOR SELECT TO anon
  USING (true);
