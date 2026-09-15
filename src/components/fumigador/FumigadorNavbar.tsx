import React from 'react';
import { FumigadorAccount } from '../../types';
import { SUBSCRIPTION_PLANS } from '../../data/subscriptionPlans';
import { FumiNorteLogo } from '../common/FumiNorteLogo';
import { 
  Users, 
  FileText, 
  Award, 
  BarChart3, 
  Database, 
  LogOut, 
  ShieldCheck, 
  Globe, 
  CreditCard, 
  CheckCircle2, 
  AlertTriangle 
} from 'lucide-react';

interface FumigadorNavbarProps {
  currentAccount: FumigadorAccount;
  activeTab: 'clients' | 'services' | 'certificates' | 'metrics' | 'backup' | 'subscription';
  setActiveTab: (tab: 'clients' | 'services' | 'certificates' | 'metrics' | 'backup' | 'subscription') => void;
  clientsCount: number;
  onLogout: () => void;
  onSwitchAccount: () => void;
  onViewPublicSite: () => void;
}

export const FumigadorNavbar: React.FC<FumigadorNavbarProps> = ({
  currentAccount,
  activeTab,
  setActiveTab,
  clientsCount,
  onLogout,
  onSwitchAccount,
  onViewPublicSite
}) => {
  const isSubscribed = currentAccount.subscription?.status === 'activa';
  const planInfo = SUBSCRIPTION_PLANS.find(p => p.id === currentAccount.subscription?.plan);

  return (
    <header className="sticky top-0 z-40 bg-slate-900 border-b border-slate-800 text-white shadow-xl">
      {/* Top micro-bar */}
      <div className="bg-slate-950 px-4 py-1.5 border-b border-slate-800/80 text-[11px] text-slate-400 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1 text-emerald-400 font-semibold">
            <ShieldCheck className="w-3.5 h-3.5" />
            Sistema Provincial de Fumigadores de Salta:
          </span>
          <span className="text-slate-300 font-medium">{currentAccount.companyName}</span>
          <span className="hidden sm:inline text-slate-600">|</span>
          <span className="hidden sm:inline bg-slate-800 px-2 py-0.5 rounded text-[10px] text-slate-300 font-mono">
            Matrícula: {currentAccount.matricula}
          </span>
        </div>
        <div className="flex items-center gap-3">
          {/* Subscription Pill */}
          <button
            onClick={() => setActiveTab('subscription')}
            className={`flex items-center gap-1.5 px-2.5 py-0.5 rounded-full font-bold text-[10px] transition-all cursor-pointer ${
              isSubscribed
                ? 'bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 hover:bg-emerald-500/30'
                : 'bg-amber-500/20 border border-amber-400/50 text-amber-300 hover:bg-amber-500/30 animate-pulse'
            }`}
          >
            {isSubscribed ? <CheckCircle2 className="w-3 h-3" /> : <AlertTriangle className="w-3 h-3" />}
            <span>{isSubscribed ? `${planInfo?.name} Activo` : 'Activar Suscripción'}</span>
          </button>

          <span className="text-slate-700">|</span>

          <button
            onClick={onViewPublicSite}
            className="flex items-center gap-1 hover:text-emerald-400 text-slate-300 transition-colors cursor-pointer"
          >
            <Globe className="w-3.5 h-3.5 text-emerald-400" />
            <span className="hidden sm:inline">Web FumiSalta</span>
          </button>

          <span className="text-slate-700">|</span>

          <button
            onClick={onSwitchAccount}
            className="hover:text-white transition-colors cursor-pointer"
          >
            Cambiar Cuenta
          </button>
        </div>
      </div>

      {/* Main navigation row */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex flex-wrap items-center justify-between gap-4">
        {/* Brand & Fumigador Info */}
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-slate-900/90 border border-slate-700/80 p-1.5 flex items-center justify-center shadow-lg shadow-slate-950/40">
            <FumiNorteLogo variant="icon" size="sm" theme="dark" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-sm font-bold text-white tracking-tight">{currentAccount.companyName}</h1>
              <span className="bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 text-[10px] px-1.5 py-0.5 rounded font-bold">
                SALTA
              </span>
            </div>
            <p className="text-xs text-slate-400 flex items-center gap-1.5">
              <span>{currentAccount.fullName}</span>
              <span>•</span>
              <span className="text-slate-400">{currentAccount.cityZone || 'Salta Capital'}</span>
            </p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="flex items-center gap-1 bg-slate-950/60 p-1 rounded-xl border border-slate-800 overflow-x-auto">
          <button
            onClick={() => setActiveTab('clients')}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              activeTab === 'clients'
                ? 'bg-emerald-600 text-white shadow'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>Mis Clientes</span>
            <span className={`px-1.5 py-0.2 rounded-full text-[10px] font-bold ${
              activeTab === 'clients' ? 'bg-emerald-800 text-white' : 'bg-slate-800 text-slate-300'
            }`}>
              {clientsCount}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('services')}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              activeTab === 'services'
                ? 'bg-emerald-600 text-white shadow'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>Órdenes y Servicios</span>
          </button>

          <button
            onClick={() => setActiveTab('certificates')}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              activeTab === 'certificates'
                ? 'bg-emerald-600 text-white shadow'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <Award className="w-4 h-4" />
            <span>Emitir Certificado</span>
          </button>

          <button
            onClick={() => setActiveTab('subscription')}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              activeTab === 'subscription'
                ? 'bg-emerald-600 text-white shadow'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <CreditCard className="w-4 h-4 text-emerald-400" />
            <span>Suscripción</span>
          </button>

          <button
            onClick={() => setActiveTab('metrics')}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              activeTab === 'metrics'
                ? 'bg-emerald-600 text-white shadow'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <BarChart3 className="w-4 h-4" />
            <span>Métricas</span>
          </button>

          <button
            onClick={() => setActiveTab('backup')}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              activeTab === 'backup'
                ? 'bg-emerald-600 text-white shadow'
                : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <Database className="w-4 h-4" />
            <span>Base de Datos</span>
          </button>
        </nav>

        {/* User Actions */}
        <div className="flex items-center gap-2">
          <button
            onClick={onLogout}
            title="Cerrar sesión"
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-slate-300 hover:text-rose-400 bg-slate-800/60 hover:bg-rose-950/30 border border-slate-700/60 hover:border-rose-800/50 rounded-xl transition-all cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            <span className="hidden sm:inline">Salir</span>
          </button>
        </div>
      </div>
    </header>
  );
};
