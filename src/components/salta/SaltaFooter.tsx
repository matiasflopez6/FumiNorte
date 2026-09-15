import React from 'react';
import { FumiNorteLogo } from '../common/FumiNorteLogo';
import { ShieldCheck, Mail, Phone, MapPin, CheckCircle2 } from 'lucide-react';

export const SaltaFooter: React.FC = () => {
  return (
    <footer className="bg-slate-950 text-white border-t border-slate-800 pt-12 pb-8 px-4">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 pb-10 border-b border-slate-900">
        {/* Brand & Description */}
        <div className="md:col-span-5 space-y-3">
          <FumiNorteLogo variant="full" size="md" theme="dark" subtitle="Control de Plagas & Software" />
          <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
            Plataforma oficial de gestión técnica y emisión de certificados de fumigación y desinfección con código QR para empresas y técnicos matriculados en la Provincia de Salta.
          </p>
          <div className="flex items-center gap-2 pt-1 text-xs text-emerald-400 font-semibold">
            <ShieldCheck className="w-4 h-4" />
            <span>Homologado ante Bromatología Municipalidad de Salta</span>
          </div>
        </div>

        {/* Quick Links for SEO Crawlers & Users */}
        <div className="md:col-span-3 space-y-2">
          <h4 className="text-xs font-black uppercase tracking-wider text-slate-300">
            Navegación & Servicios
          </h4>
          <ul className="space-y-1.5 text-xs text-slate-400">
            <li>
              <a href="#planes-suscripcion" className="hover:text-emerald-400 transition-colors">
                Planes de Suscripción (Mensual, Semestral, Anual)
              </a>
            </li>
            <li>
              <a href="#normativa-salta" className="hover:text-emerald-400 transition-colors">
                Normativa Bromatología & Modelo Certificado
              </a>
            </li>
            <li>
              <a href="#ventajas" className="hover:text-emerald-400 transition-colors">
                Beneficios para Fumigadores Salteños
              </a>
            </li>
            <li>
              <a href="#preguntas-frecuentes" className="hover:text-emerald-400 transition-colors">
                Preguntas Frecuentes (FAQ Salta)
              </a>
            </li>
          </ul>
        </div>

        {/* Localities in Salta Province Covered */}
        <div className="md:col-span-4 space-y-2">
          <h4 className="text-xs font-black uppercase tracking-wider text-slate-300 flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-emerald-400" />
            <span>Cobertura Provincial Salta</span>
          </h4>
          <p className="text-xs text-slate-400 leading-relaxed">
            Habilitado para servicios en Salta Capital, Villa San Lorenzo, Vaqueros, Cerrillos, Rosario de Lerma, Cafayate, Tartagal, Orán y General Güemes.
          </p>
          <div className="pt-2 text-xs text-slate-400">
            <span className="text-slate-500">Atención técnica: </span>
            <span className="text-emerald-400 font-semibold">contacto@fuminorte-salta.com.ar</span>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto mt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left text-[11px] text-slate-500">
        <div>
          © {new Date().getFullYear()} FumiNorte • Control de Plagas y Software de Certificación. Todos los derechos reservados.
        </div>
        <div>
          Normativas provinciales de aplicación fitosanitaria y domisanitaria — ANMAT / SENASA.
        </div>
      </div>
    </footer>
  );
};
