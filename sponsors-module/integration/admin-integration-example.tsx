/**
 * EJEMPLO DE INTEGRACIÓN EN EL PANEL ADMINISTRATIVO (admin.tsx)
 * 
 * Pasos para integrar:
 * 1. Importa el componente AdminSponsors
 * 2. Agrega 'sponsors' al tipo AdminSection
 * 3. Agrega el ítem de menú en menuItems
 * 4. Agrega el renderizado condicional en el main
 */

// ============================================
// 1. Importar el componente
// ============================================
import AdminSponsors from "@/components/admin/AdminSponsors";
import { Heart } from "lucide-react"; // Icono para el menú

// ============================================
// 2. Actualizar el tipo AdminSection
// ============================================
/*
type AdminSection = 'categories' | 'orders' | 'users' | 'settings' | 'import' | 'sponsors';
                                                                                    ^^^^^^^^ Agregar aquí
*/

// ============================================
// 3. Agregar el ítem de menú
// ============================================
/*
const menuItems = [
  {
    id: 'categories' as AdminSection,
    title: 'Categorías y Productos',
    icon: FolderOpen,
  },
  {
    id: 'import' as AdminSection,
    title: 'Importar Excel',
    icon: Upload,
  },
  {
    id: 'orders' as AdminSection,
    title: 'Pedidos',
    icon: ShoppingBag,
  },
  {
    id: 'sponsors' as AdminSection,  // <-- Agregar aquí
    title: 'Patrocinadores',
    icon: Heart,
  },
  {
    id: 'users' as AdminSection,
    title: 'Usuarios Administrativos',
    icon: Users,
  },
  {
    id: 'settings' as AdminSection,
    title: 'Configuración del Sitio',
    icon: Settings,
  },
];
*/

// ============================================
// 4. Agregar el renderizado condicional
// ============================================
/*
<main className="flex-1 overflow-auto p-6">
  {activeSection === 'categories' && <AdminCategories />}
  {activeSection === 'import' && <AdminImport />}
  {activeSection === 'orders' && <AdminOrders />}
  {activeSection === 'sponsors' && <AdminSponsors />} {/* <-- Agregar aquí */}
  {activeSection === 'users' && <AdminUsers />}
  {activeSection === 'settings' && <AdminSettings />}
</main>
*/

// ============================================
// EJEMPLO COMPLETO DE admin.tsx
// ============================================
/*
import { useState } from "react";
import { LogOut, Users, FolderOpen, Settings, ShoppingBag, Upload, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  SidebarProvider,
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import AdminCategories from "@/components/admin/AdminCategories";
import AdminUsers from "@/components/admin/AdminUsers";
import AdminSettings from "@/components/admin/AdminSettings";
import AdminOrders from "@/components/admin/AdminOrders";
import AdminImport from "@/components/admin/AdminImport";
import AdminSponsors from "@/components/admin/AdminSponsors"; // <-- Importar aquí

type AdminSection = 'categories' | 'orders' | 'users' | 'settings' | 'import' | 'sponsors'; // <-- Agregar 'sponsors'

export default function AdminPage({ onLogout }: { onLogout: () => void }) {
  const [activeSection, setActiveSection] = useState<AdminSection>('categories');

  const menuItems = [
    {
      id: 'categories' as AdminSection,
      title: 'Categorías y Productos',
      icon: FolderOpen,
    },
    {
      id: 'import' as AdminSection,
      title: 'Importar Excel',
      icon: Upload,
    },
    {
      id: 'orders' as AdminSection,
      title: 'Pedidos',
      icon: ShoppingBag,
    },
    {
      id: 'sponsors' as AdminSection, // <-- Agregar aquí
      title: 'Patrocinadores',
      icon: Heart,
    },
    {
      id: 'users' as AdminSection,
      title: 'Usuarios Administrativos',
      icon: Users,
    },
    {
      id: 'settings' as AdminSection,
      title: 'Configuración del Sitio',
      icon: Settings,
    },
  ];

  return (
    <SidebarProvider>
      <div className="flex h-screen w-full">
        <Sidebar>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Panel Admin</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {menuItems.map((item) => (
                    <SidebarMenuItem key={item.id}>
                      <SidebarMenuButton
                        onClick={() => setActiveSection(item.id)}
                        isActive={activeSection === item.id}
                      >
                        <item.icon className="h-4 w-4" />
                        <span>{item.title}</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>

            <div className="mt-auto p-4">
              <Button variant="outline" className="w-full" onClick={onLogout}>
                <LogOut className="h-4 w-4 mr-2" />
                Cerrar Sesión
              </Button>
            </div>
          </SidebarContent>
        </Sidebar>

        <div className="flex flex-col flex-1">
          <header className="flex items-center justify-between p-4 border-b">
            <SidebarTrigger />
            <h1 className="font-semibold text-xl">Panel Administrativo</h1>
          </header>

          <main className="flex-1 overflow-auto p-6">
            {activeSection === 'categories' && <AdminCategories />}
            {activeSection === 'import' && <AdminImport />}
            {activeSection === 'orders' && <AdminOrders />}
            {activeSection === 'sponsors' && <AdminSponsors />} {/* <-- Agregar aquí */}
            {activeSection === 'users' && <AdminUsers />}
            {activeSection === 'settings' && <AdminSettings />}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
*/

