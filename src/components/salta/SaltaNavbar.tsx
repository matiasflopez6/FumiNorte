import React from 'react';
import { FumigadorAccount } from '../../types';
import { FumiNorteLogo } from '../common/FumiNorteLogo';
import { Shield, LayoutDashboard, UserCheck, ArrowRight, Award } from 'lucide-react';

interface SaltaNavbarProps {
  currentFumigador: FumigadorAccount | null;
  onOpenAuth: (mode: 'login' | 'register') => void;
  onGoToDashboard: () => void;
}

export const SaltaNavbar: React.FC<SaltaNavbarProps> = ({
  currentFumigador,
  onOpenAuth,
  onGoToDashboard
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3.5 flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <div className="flex items-center gap-2">
          <FumiNorteLogo variant="full" size="md" theme="light" subtitle="Control de Plagas" />
        </div>

        {/* Navigation items and CTA uniformly spaced */}
        <div className="flex items-center gap-6 lg:gap-7">
          <nav className="hidden md:flex items-center gap-6 lg:gap-7 text-xs font-bold text-slate-600">
            <a href="#planes-suscripcion" className="hover:text-emerald-700 transition-colors whitespace-nowrap">
              Planes de Suscripción
            </a>
            <a href="#normativa-salta" className="hover:text-emerald-700 transition-colors whitespace-nowrap">
              Normativa & Certificados
            </a>
            <a href="#ventajas" className="hover:text-emerald-700 transition-colors whitespace-nowrap">
              Beneficios
            </a>
            <a href="#preguntas-frecuentes" className="hover:text-emerald-700 transition-colors whitespace-nowrap">
              Preguntas
            </a>
          </nav>

          {currentFumigador ? (
            <button
              onClick={onGoToDashboard}
              className="flex items-center gap-2 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl shadow-md transition-all cursor-pointer whitespace-nowrap"
            >
              <LayoutDashboard className="w-4 h-4" />
              <span>Panel de {currentFumigador.fullName.split(' ')[0]}</span>
            </button>
          ) : (
            <button
              onClick={() => onOpenAuth('register')}
              className="flex items-center gap-1.5 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl shadow-md shadow-emerald-700/20 transition-all cursor-pointer whitespace-nowrap"
            >
              <span>Registrar Empresa</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
