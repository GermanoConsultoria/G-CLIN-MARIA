import { createFileRoute, Outlet, useNavigate, Link, useLocation } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  LogOut, Calendar, Home, Search, Clock, Briefcase,
  TrendingUp, TrendingDown, Scale, BookOpen,
  Users, Menu, X, Tag, FolderHeart, AlertCircle,
  UserSquare2,
} from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import { supabase } from "@/integrations/supabase/client";
import gtechLogo from "@/assets/g-tech-logo.png";
import logoGabriela from "@/assets/logo_gabriela.jpeg";

export const Route = createFileRoute("/_app")({ component: AppLayout });

const mainNavItems = [
  { to: "/overview",  label: "Painel",          icon: Home },
  { to: "/dashboard", label: "Agendamentos",    icon: Calendar },
  { to: "/slots",     label: "Horários livres", icon: Search },
  { to: "/hours",     label: "Funcionamento",   icon: Clock },
  { to: "/services",  label: "Serviços",        icon: Briefcase },
  { to: "/pacientes", label: "Pacientes",       icon: UserSquare2 },
] as const;

const financeItems = [
  { to: "/receivables",      label: "A receber",        icon: TrendingUp },
  { to: "/payables",         label: "A pagar",          icon: TrendingDown },
  { to: "/pending-payments", label: "Pend. Pagamentos", icon: AlertCircle },
  { to: "/balance",          label: "Balancete",        icon: Scale },
  { to: "/chart-accounts",   label: "Plano de contas",  icon: BookOpen },
] as const;

const configItems = [
  { to: "/config/usuarios", label: "Usuários",   icon: Users },
  { to: "/plans",           label: "Convênios",  icon: Tag },
  { to: "/categories",      label: "Categorias", icon: FolderHeart },
] as const;

function NavItem({ 
  item, pathname, isCollapsed, setMobileOpen 
}: { 
  item: { to: string; label: string; icon: React.ElementType }; 
  pathname: string; 
  isCollapsed: boolean; 
  setMobileOpen: (v: boolean) => void;
}) {
  const active = pathname.startsWith(item.to);
  
  return (
    <Link
      to={item.to}
      title={isCollapsed ? item.label : undefined}
      onClick={() => setMobileOpen(false)}
      className={`flex items-center rounded-lg px-4 py-3 text-sm font-medium transition-colors ${
        isCollapsed ? "justify-center" : "justify-start gap-3"
      } ${active ? "bg-[#C8A56A]/10 text-[#C8A56A]" : "text-gray-700 hover:bg-black/5"}`}
    >
      <item.icon className={`h-6 w-6 shrink-0 ${active ? "text-[#C8A56A]" : "text-[#A87C3F]"}`} />
      {!isCollapsed && <span className="whitespace-nowrap">{item.label}</span>}
    </Link>
  );
}

function AppLayout() {
  const { user, loading } = useAuth();
  const nav = useNavigate();
  const { pathname } = useLocation();
  
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

  useEffect(() => {
    if (!loading && !user) nav({ to: "/auth" });
  }, [loading, user, nav]);

  if (loading || !user) {
    return <div className="grid min-h-screen place-items-center text-muted-foreground">Carregando...</div>;
  }

  return (
    <div className="flex min-h-screen bg-gray-50 font-sans overflow-hidden">
      
      {/* Overlay Mobile */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm lg:hidden transition-opacity"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex flex-col bg-[#FAF6F1] shadow-xl transition-all duration-300 ease-in-out lg:static
          ${mobileOpen ? "translate-x-0 w-72" : "-translate-x-full lg:translate-x-0"}
          ${isCollapsed ? "lg:w-20" : "lg:w-72"}
        `}
      >
        {/* Cabeçalho da Sidebar */}
        <div className="flex h-20 items-center justify-between px-4 border-b border-[#C8A56A]/10">
          <div className={`flex items-center gap-3 overflow-hidden transition-opacity duration-300 ${isCollapsed ? "opacity-0 w-0 hidden lg:flex" : "opacity-100 w-auto"}`}>
            <img
              src={logoGabriela}
              alt="Dra. Gabriela"
              className="h-10 w-10 shrink-0 rounded-full border border-[#C8A56A] object-cover"
            />
            <div className="flex flex-col">
              <span className="font-display text-sm font-bold text-[#A87C3F] whitespace-nowrap">Dra. Gabriela</span>
            </div>
          </div>
          
          {/* Botão Hamburger Desktop */}
          <button
            className="hidden lg:flex p-2 rounded-md text-[#A87C3F] hover:bg-black/5 transition-colors mx-auto"
            onClick={() => setIsCollapsed(!isCollapsed)}
          >
            <Menu className="h-6 w-6" />
          </button>

          {/* Botão Fechar Mobile */}
          <button
            className="lg:hidden text-gray-400 hover:text-gray-600 p-2"
            onClick={() => setMobileOpen(false)}
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Navegação */}
        <nav className="custom-scrollbar flex-1 overflow-y-auto overflow-x-hidden px-3 py-6 flex flex-col gap-2">
          
          {/* Menu Principal */}
          {mainNavItems.map((item) => (
            <NavItem 
              key={item.to} 
              item={item} 
              pathname={pathname} 
              isCollapsed={isCollapsed} 
              setMobileOpen={setMobileOpen} 
            />
          ))}

          <div className="my-2 border-t border-[#C8A56A]/20" />

          {/* Módulo Financeiro */}
          {!isCollapsed && <span className="px-4 text-xs font-bold text-[#A87C3F]/60 uppercase tracking-wider mt-2 mb-1">Finanças</span>}
          {financeItems.map((item) => (
            <NavItem 
              key={item.to} 
              item={item} 
              pathname={pathname} 
              isCollapsed={isCollapsed} 
              setMobileOpen={setMobileOpen} 
            />
          ))}

          <div className="my-2 border-t border-[#C8A56A]/20" />

          {/* Módulo Sistema */}
          {!isCollapsed && <span className="px-4 text-xs font-bold text-[#A87C3F]/60 uppercase tracking-wider mt-2 mb-1">Sistema</span>}
          {configItems.map((item) => (
            <NavItem 
              key={item.to} 
              item={item} 
              pathname={pathname} 
              isCollapsed={isCollapsed} 
              setMobileOpen={setMobileOpen} 
            />
          ))}

        </nav>

        {/* Rodapé da Sidebar */}
        <div className="border-t border-[#C8A56A]/20 p-3">
          <button
            onClick={() => supabase.auth.signOut().then(() => nav({ to: "/" }))}
            title={isCollapsed ? "Sair" : undefined}
            className={`flex w-full items-center rounded-lg px-4 py-3 text-sm font-medium text-red-600 transition-colors hover:bg-red-50 hover:text-red-700 ${
              isCollapsed ? "justify-center" : "justify-start gap-3"
            }`}
          >
            <LogOut className="h-6 w-6 shrink-0 text-red-500" />
            {!isCollapsed && <span>Sair</span>}
          </button>
        </div>
      </aside>

      {/* Área Principal */}
      <div className="flex flex-1 flex-col overflow-hidden h-screen">
        
        {/* Header Mobile */}
        <header className="flex h-16 items-center justify-between border-b bg-white px-4 lg:hidden shadow-sm">
          <div className="flex items-center gap-3 font-display font-bold text-[#A87C3F]">
            <img src={logoGabriela} alt="Dra. Gabriela" className="h-9 w-9 rounded-full border border-[#C8A56A] object-cover" />
            Dra. Gabriela
          </div>
          <button
            onClick={() => setMobileOpen(true)}
            className="rounded-md p-2 text-[#A87C3F] hover:bg-gray-100 transition-colors"
          >
            <Menu className="h-6 w-6" />
          </button>
        </header>

        {/* Conteúdo Renderizado (Rotas) */}
        <main className="flex-1 overflow-auto bg-[#FBFBFA] p-6 lg:p-10 relative">
          <Outlet />
        </main>
      </div>
    </div>
  );
}