import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { supabase } from "@/integrations/supabase/client";
import gtechLogo from "@/assets/g-tech-logo.png";
import logoMaria from "@/assets/logo_maria.png";

export const Route = createFileRoute("/auth")({ component: AuthPage });

function AuthPage() {
  const nav = useNavigate();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) nav({ to: "/dashboard" });
    });
  }, [nav]);

  const signIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (error) return toast.error(error.message);
    nav({ to: "/dashboard" });
  };

  const signUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    if (password.length < 8) {
      setLoading(false);
      return toast.error("A senha deve ter pelo menos 8 caracteres.");
    }
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: { emailRedirectTo: `${window.location.origin}/dashboard` },
    });
    setLoading(false);
    if (error) {
      const msg = error.message.toLowerCase();
      if (msg.includes("weak") || msg.includes("pwned"))
        return toast.error("Senha muito fraca. Use letras, números e símbolos.");
      if (msg.includes("already") || msg.includes("registered"))
        return toast.error("Este email já está cadastrado. Faça login.");
      return toast.error(error.message);
    }
    if (data.session) {
      toast.success("Conta criada com sucesso!");
      nav({ to: "/dashboard" });
    } else {
      toast.success("Conta criada! Verifique seu email para confirmar.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#FAF6F1] p-6">
      <div className="w-full max-w-md space-y-6">

        {/* Logo */}
        <Link to="/" className="flex flex-col items-center gap-3">
          <img
            src={logoMaria}
            alt="Maria Carolina Clínica de Estética"
            className="h-32 w-auto max-w-[280px] object-contain"
            style={{ filter: "drop-shadow(0 4px 24px rgba(208,165,160,0.35))" }}
          />
          <div className="flex items-center gap-2">
            <span className="font-display text-xl font-bold text-[#4B3A2A]">G-Clin</span>
          </div>
          <p className="text-sm text-[#6E5A45]">Maria Carolina Clínica de Estética</p>
        </Link>

        {/* Card de login */}
        <div className="rounded-2xl border border-[#E7CBC7] bg-white p-6 shadow-sm">
          <Tabs defaultValue="signin">
            <TabsList className="grid w-full grid-cols-2 bg-[#F3E0DD]">
              <TabsTrigger value="signin" className="data-[state=active]:bg-[#D0A5A0] data-[state=active]:text-white">
                Entrar
              </TabsTrigger>
              <TabsTrigger value="signup" className="data-[state=active]:bg-[#D0A5A0] data-[state=active]:text-white">
                Criar conta
              </TabsTrigger>
            </TabsList>

            <TabsContent value="signin">
              <form onSubmit={signIn} className="space-y-4 pt-4">
                <Field label="Email" type="email" value={email} onChange={setEmail} />
                <Field label="Senha" type="password" value={password} onChange={setPassword} />
                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full text-white font-semibold"
                  style={{ background: "linear-gradient(135deg, #DCB8B4 0%, #D0A5A0 50%, #8C4F4A 100%)" }}
                >
                  {loading ? "Entrando..." : "Entrar"}
                </Button>
              </form>
            </TabsContent>

            <TabsContent value="signup">
              <form onSubmit={signUp} className="space-y-4 pt-4">
                <Field label="Email" type="email" value={email} onChange={setEmail} />
                <Field label="Senha" type="password" value={password} onChange={setPassword} />
                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full text-white font-semibold"
                  style={{ background: "linear-gradient(135deg, #DCB8B4 0%, #D0A5A0 50%, #8C4F4A 100%)" }}
                >
                  {loading ? "Criando..." : "Criar conta"}
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </div>

        {/* Rodapé */}
        <div className="flex flex-col items-center gap-2 rounded-xl border border-[#E7CBC7] bg-white/60 p-4 text-center">
          <span className="text-xs uppercase tracking-widest text-[#6E5A45]">Desenvolvido por</span>
          <img src={gtechLogo} alt="G-Tech" className="h-14 w-14 rounded-lg shadow-sm" />
          <span className="font-display text-base font-bold tracking-wide text-[#4B3A2A]">G-Tech</span>
        </div>

      </div>
    </div>
  );
}

function Field({
  label, type, value, onChange,
}: {
  label: string;
  type: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="space-y-1.5">
      <Label className="text-[#4B3A2A]">{label}</Label>
      <Input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required
        minLength={type === "password" ? 8 : undefined}
        className="border-[#E7CBC7] focus-visible:ring-[#D0A5A0] bg-[#FAF6F1]"
      />
    </div>
  );
}