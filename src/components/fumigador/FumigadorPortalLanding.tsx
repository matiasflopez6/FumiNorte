import React from 'react';
import { 
  Shield, 
  Users, 
  Award, 
  Database, 
  ArrowRight, 
  Sparkles, 
  CheckCircle2, 
  CreditCard, 
  Lock, 
  MapPin,
  FileCheck2
} from 'lucide-react';

interface FumigadorPortalLandingProps {
  onOpenAuth: (mode?: 'login' | 'register', plan?: 'mensual' | 'semestral' | 'anual') => void;
  onQuickLogin: (email: string) => void;
  onScrollToPlans?: () => void;
}

export const FumigadorPortalLanding: React.FC<FumigadorPortalLandingProps> = ({
  onOpenAuth,
  onQuickLogin,
  onScrollToPlans
}) => {
  return (
    <div className="bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 text-white py-14 sm:py-20 px-4 border-b border-slate-800">
      <div className="max-w-6xl mx-auto">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-black uppercase tracking-wider mb-6">
          <MapPin className="w-3.5 h-3.5" />
          <span>Exclusivo para la Provincia de Salta • Gestión & Certificación</span>
        </div>

        {/* Main Hero Row */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7 space-y-5">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white leading-tight">
              Software para <span className="text-emerald-400">Fumigadores de Salta</span> con Emisión de Certificados Oficiales.
            </h1>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-xl">
              Gestioná tu base de datos privada con tus clientes de Salta Capital, San Lorenzo y el Valle. <strong>Aboná tu suscripción mensual, semestral o anual</strong> y emití al instante certificados con código QR válidos para inspecciones de Bromatología Municipal.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => onOpenAuth('register', 'semestral')}
                className="flex items-center gap-2 px-6 py-3.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs sm:text-sm rounded-xl shadow-lg shadow-emerald-500/20 transition-all cursor-pointer"
              >
                <span>Registrar mi Empresa</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <a
                href="#planes-suscripcion"
                onClick={(e) => {
                  if (onScrollToPlans) {
                    e.preventDefault();
                    onScrollToPlans();
                  }
                }}
                className="flex items-center gap-2 px-5 py-3.5 bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs sm:text-sm rounded-xl border border-slate-700 transition-all cursor-pointer"
              >
                <CreditCard className="w-4 h-4 text-emerald-400" />
                <span>Ver Planes y Precios</span>
              </a>
            </div>

            {/* Micro badges */}
            <div className="pt-4 flex flex-wrap gap-4 text-xs text-slate-400">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                3 Planes: Mensual, Semestral y Anual
              </span>
              <span className="flex items-center gap-1.5">
                <Lock className="w-4 h-4 text-emerald-400" />
                Clientes y datos 100% aislados
              </span>
              <span className="flex items-center gap-1.5">
                <Award className="w-4 h-4 text-emerald-400" />
                Homologado para Bromatología Salta
              </span>
            </div>
          </div>

          {/* Interactive Demo Login Card for Salta */}
          <div className="lg:col-span-5 bg-slate-800/90 border border-slate-700 p-6 sm:p-7 rounded-3xl shadow-2xl backdrop-blur-sm">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <h3 className="text-xs font-black text-white uppercase tracking-wider">
                Prueba en vivo con cuentas de Salta
              </h3>
            </div>
            <p className="text-xs text-slate-300 mb-4">
              Elegí un fumigador para ingresar y comprobar cómo cada cuenta tiene sus propios clientes y estado de suscripción:
            </p>

            <div className="space-y-2.5">
              {/* Demo Account 1 - Semestral */}
              <button
                onClick={() => onQuickLogin('facundo@fumigacionesnorte.com')}
                className="w-full text-left p-3.5 bg-slate-900 hover:bg-emerald-950/40 border border-slate-700 hover:border-emerald-500 rounded-2xl transition-all group cursor-pointer"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-xs text-white group-hover:text-emerald-300">
                        Ing. Facundo Saravia
                      </span>
                      <span className="text-[9px] bg-emerald-500/20 text-emerald-300 font-bold px-2 py-0.5 rounded-full">
                        Plan Semestral Activo
                      </span>
                    </div>
                    <span className="text-[11px] text-slate-400 block mt-0.5">
                      FumiNorte - Control de Plagas (3 clientes Salta Cap.)
                    </span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-emerald-400 transition-colors" />
                </div>
              </button>

              {/* Demo Account 2 - Mensual */}
              <button
                onClick={() => onQuickLogin('valeria@biosalta.com')}
                className="w-full text-left p-3.5 bg-slate-900 hover:bg-teal-950/40 border border-slate-700 hover:border-teal-500 rounded-2xl transition-all group cursor-pointer"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-xs text-white group-hover:text-teal-300">
                        Dra. Valeria Figueroa
                      </span>
                      <span className="text-[9px] bg-teal-500/20 text-teal-300 font-bold px-2 py-0.5 rounded-full">
                        Plan Mensual Activo
                      </span>
                    </div>
                    <span className="text-[11px] text-slate-400 block mt-0.5">
                      BioControl Ambiental (Valle de Lerma y Cafayate)
                    </span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-teal-400 transition-colors" />
                </div>
              </button>

              {/* Demo Account 3 - Sin suscripcion */}
              <button
                onClick={() => onQuickLogin('gaston@desinfeccionessalta.com')}
                className="w-full text-left p-3.5 bg-slate-900 hover:bg-amber-950/40 border border-amber-500/40 hover:border-amber-400 rounded-2xl transition-all group cursor-pointer"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-xs text-white group-hover:text-amber-300">
                        Gastón Albarracín
                      </span>
                      <span className="text-[9px] bg-amber-500/20 text-amber-300 font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                        <Lock className="w-2.5 h-2.5" />
                        <span>Sin Suscripción</span>
                      </span>
                    </div>
                    <span className="text-[11px] text-slate-400 block mt-0.5">
                      Desinfecciones Albarracín (Prueba bloqueo de certificado)
                    </span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-amber-400" />
                </div>
              </button>

              <div className="pt-2 text-center">
                <button
                  onClick={() => onOpenAuth('login')}
                  className="text-xs text-slate-400 hover:text-emerald-400 underline cursor-pointer"
                >
                  ¿Ya tenés cuenta creada? Iniciar Sesión aquí
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
