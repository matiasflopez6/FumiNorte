import React, { useState, useEffect } from 'react';
import { FumigadorAccount, SubscriptionPlanType } from './types';
import { storageService } from './services/storageService';
import { FumigadorDashboard } from './components/fumigador/FumigadorDashboard';
import { AuthModal } from './components/fumigador/AuthModal';
import { FumigadorPortalLanding } from './components/fumigador/FumigadorPortalLanding';
import { SaltaNavbar } from './components/salta/SaltaNavbar';
import { SaltaPlansSection } from './components/salta/SaltaPlansSection';
import { SaltaNormativeSection } from './components/salta/SaltaNormativeSection';
import { SaltaFeaturesSection } from './components/salta/SaltaFeaturesSection';
import { SaltaFaqSection } from './components/salta/SaltaFaqSection';
import { SaltaFooter } from './components/salta/SaltaFooter';
import { LayoutDashboard, Shield, AlertCircle } from 'lucide-react';

export default function App() {
  // Initialize storage & demo accounts for Salta
  useEffect(() => {
    storageService.init();
  }, []);

  // Current logged in fumigador account
  const [currentFumigador, setCurrentFumigador] = useState<FumigadorAccount | null>(() => {
    storageService.init();
    const existing = storageService.getCurrentUser();
    if (!existing) {
      const demoAccounts = storageService.getAllAccounts();
      // Default to Facundo Saravia (Fumigaciones Norte Salta) so the user directly experiences the portal
      if (demoAccounts.length > 0) {
        storageService.setCurrentUser(demoAccounts[0]);
        return demoAccounts[0];
      }
    }
    return existing;
  });

  // View mode: 'dashboard' for fumigador CRM, 'public' for Salta landing page
  const [viewMode, setViewMode] = useState<'dashboard' | 'public'>('dashboard');

  // Auth modal state
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authInitialMode, setAuthInitialMode] = useState<'login' | 'register'>('login');
  const [authPreSelectedPlan, setAuthPreSelectedPlan] = useState<SubscriptionPlanType>('semestral');

  const handleLoginSuccess = (account: FumigadorAccount) => {
    setCurrentFumigador(account);
    setViewMode('dashboard');
  };

  const handleLogout = () => {
    storageService.logout();
    setCurrentFumigador(null);
    setViewMode('public');
    setAuthInitialMode('login');
    setIsAuthOpen(true);
  };

  const handleSwitchAccount = () => {
    setAuthInitialMode('login');
    setIsAuthOpen(true);
  };

  const handleOpenRegisterWithPlan = (planId: SubscriptionPlanType) => {
    setAuthPreSelectedPlan(planId);
    setAuthInitialMode('register');
    setIsAuthOpen(true);
  };

  const scrollToPlans = () => {
    const el = document.getElementById('planes-suscripcion');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] text-[#0F172A] font-['Plus_Jakarta_Sans',sans-serif]">
      {/* Top sticky banner when viewing the Public Portal while logged in */}
      {currentFumigador && viewMode === 'public' && (
        <div className="bg-emerald-950 text-white px-4 py-2.5 text-xs flex flex-wrap items-center justify-between gap-3 shadow-md z-50 sticky top-0 border-b border-emerald-800/60">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
            <span>
              Sesión activa: <strong className="text-emerald-300">{currentFumigador.companyName}</strong> ({currentFumigador.fullName}) • Matrícula: {currentFumigador.matricula}
            </span>
          </div>
          <button
            onClick={() => setViewMode('dashboard')}
            className="flex items-center gap-1.5 px-3 py-1 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-lg transition-colors cursor-pointer"
          >
            <LayoutDashboard className="w-3.5 h-3.5" />
            <span>Volver a mi Panel de Fumigador</span>
          </button>
        </div>
      )}

      {/* Conditional rendering between Dashboard and Public Portal */}
      {currentFumigador && viewMode === 'dashboard' ? (
        <FumigadorDashboard
          currentAccount={currentFumigador}
          onLogout={handleLogout}
          onSwitchAccount={handleSwitchAccount}
          onViewPublicSite={() => setViewMode('public')}
          onAccountUpdated={(updated) => setCurrentFumigador(updated)}
        />
      ) : (
        <div className="flex-1 flex flex-col">
          {/* Official Salta Navbar */}
          <SaltaNavbar
            currentFumigador={currentFumigador}
            onOpenAuth={(mode) => {
              setAuthInitialMode(mode);
              setIsAuthOpen(true);
            }}
            onGoToDashboard={() => setViewMode('dashboard')}
          />

          {/* Salta Fumigadores Hero & Quick Demo Access */}
          <main className="flex-1">
            <FumigadorPortalLanding
              onOpenAuth={(mode, plan) => {
                setAuthInitialMode(mode || 'login');
                if (plan) setAuthPreSelectedPlan(plan);
                setIsAuthOpen(true);
              }}
              onQuickLogin={(email) => {
                try {
                  const acc = storageService.login(email);
                  handleLoginSuccess(acc);
                } catch (e) {
                  setIsAuthOpen(true);
                }
              }}
              onScrollToPlans={scrollToPlans}
            />

            {/* 3 Subscription Plans Section (Mensual, Semestral, Anual) */}
            <SaltaPlansSection
              onSelectPlan={handleOpenRegisterWithPlan}
            />

            {/* Salta Normative & Bromatología Certificate Standards */}
            <SaltaNormativeSection />

            {/* Software Features for Salta Fumigadores */}
            <SaltaFeaturesSection />

            {/* SEO Rich FAQ Section with Schema.org markup */}
            <SaltaFaqSection />
          </main>

          {/* Official Footer */}
          <SaltaFooter />
        </div>
      )}

      {/* Authentication and Registration Modal */}
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        onLoginSuccess={handleLoginSuccess}
        initialMode={authInitialMode}
        preSelectedPlan={authPreSelectedPlan}
      />
    </div>
  );
}
