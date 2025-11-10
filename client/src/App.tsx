import { useState, useEffect } from "react";
import { Switch, Route, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { DollarRateProvider } from "@/contexts/DollarRateContext";
import HomePage from "@/pages/home";
import AdminLoginPage from "@/pages/admin-login";
import AdminPage from "@/pages/admin";
import NotFound from "@/pages/not-found";
import { apiRequest } from "./lib/queryClient";

function Router() {
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const [, setLocation] = useLocation();

  // Verificar autenticación al cargar
  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('admin_token');
      
      if (!token) {
        setIsCheckingAuth(false);
        return;
      }

      try {
        // Verificar que el token sea válido
        await apiRequest('/api/auth/session');
        setIsAdminAuthenticated(true);
        
        // Si estamos en /admin/login, redirigir a /admin
        if (window.location.pathname === '/admin/login') {
          setLocation("/admin");
        }
      } catch (error) {
        // Token inválido o expirado, eliminar del localStorage
        localStorage.removeItem('admin_token');
        setIsAdminAuthenticated(false);
      } finally {
        setIsCheckingAuth(false);
      }
    };

    checkAuth();
  }, [setLocation]);

  const handleAdminLogin = () => {
    setIsAdminAuthenticated(true);
    setLocation("/admin");
  };

  const handleAdminLogout = () => {
    // Eliminar token del localStorage
    localStorage.removeItem('admin_token');
    setIsAdminAuthenticated(false);
    setLocation("/");
  };

  // Mostrar loading mientras se verifica la autenticación
  if (isCheckingAuth) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Verificando sesión...</p>
        </div>
      </div>
    );
  }

  return (
    <Switch>
      <Route path="/" component={HomePage} />
      
      <Route path="/admin/login">
        {isAdminAuthenticated ? (
          <AdminPage onLogout={handleAdminLogout} />
        ) : (
          <AdminLoginPage onLogin={handleAdminLogin} />
        )}
      </Route>

      <Route path="/admin">
        {isAdminAuthenticated ? (
          <AdminPage onLogout={handleAdminLogout} />
        ) : (
          <AdminLoginPage onLogin={handleAdminLogin} />
        )}
      </Route>

      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <DollarRateProvider>
        <TooltipProvider>
          <Router />
          <Toaster />
        </TooltipProvider>
      </DollarRateProvider>
    </QueryClientProvider>
  );
}

export default App;
