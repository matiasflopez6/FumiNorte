import React from 'react';
import { FumiNorteLogo } from '../common/FumiNorteLogo';
import { ShieldCheck, Mail, Phone, MapPin } from 'lucide-react';

export const SaltaFooter: React.FC = () => {
  return (
    <footer className="bg-slate-950 text-white border-t border-slate-800 py-12 px-4">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="text-center sm:text-left space-y-1">
          <div className="flex items-center justify-center sm:justify-start gap-2">
            <FumiNorteLogo variant="full" size="md" theme="dark" subtitle="Control de Plagas" />
          </div>
          <p className="text-xs text-slate-400">
            Plataforma de gestión técnica y certificación de servicios para empresas y técnicos fumigadores matriculados de Salta.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-4 text-xs text-slate-400">
          <span className="flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-emerald-400" />
            Salta Capital & Valles Calchaquíes
          </span>
          <span className="hidden sm:inline text-slate-700">•</span>
          <span>Soporte: info@fumisalta.gob.ar / WhatsApp Salta</span>
        </div>
      </div>

      <div className="max-w-6xl mx-auto mt-8 pt-6 border-t border-slate-900 text-center text-[11px] text-slate-600">
        © {new Date().getFullYear()} FumiSalta. Software desarrollado para aplicadores de productos fitosanitarios y domisanitarios según normativas municipales y de SENASA.
      </div>
    </footer>
  );
};
