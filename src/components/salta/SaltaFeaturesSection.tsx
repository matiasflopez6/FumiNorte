import React from 'react';
import { Database, MessageSquare, ShieldCheck, QrCode, FileText, Smartphone, CalendarCheck, Award } from 'lucide-react';

export const SaltaFeaturesSection: React.FC = () => {
  return (
    <section id="ventajas" className="py-16 sm:py-20 px-4 bg-white border-t border-slate-200/80">
      <div className="max-w-6xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Diseñado Exclusivamente para Empresas de Control de Plagas en Salta
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-2">
            Herramientas prácticas para optimizar tus visitas técnicas, asegurar la recurrencia de tus clientes y emitir constancias reglamentarias en minutos.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-slate-50 p-6 rounded-3xl border border-slate-200/80 hover:border-emerald-500/50 transition-all group">
            <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Database className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-sm text-slate-900 mb-1">
              Base de Datos Privada
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Tus clientes pertenecen únicamente a tu cuenta. Nadie más en Salta puede ver tus contactos, presupuestos o fichas.
            </p>
          </div>

          <div className="bg-slate-50 p-6 rounded-3xl border border-slate-200/80 hover:border-emerald-500/50 transition-all group">
            <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <QrCode className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-sm text-slate-900 mb-1">
              Certificados con Código QR
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Emisión oficial al instante con hash de verificación para inspectores de Bromatología y Saneamiento Ambiental de Salta.
            </p>
          </div>

          <div className="bg-slate-50 p-6 rounded-3xl border border-slate-200/80 hover:border-emerald-500/50 transition-all group">
            <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <MessageSquare className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-sm text-slate-900 mb-1">
              Avisos por WhatsApp
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Notifica a tus clientes gastronómicos o residenciales cuando esté por vencer su certificado para coordinar el refuerzo periódico.
            </p>
          </div>

          <div className="bg-slate-50 p-6 rounded-3xl border border-slate-200/80 hover:border-emerald-500/50 transition-all group">
            <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-sm text-slate-900 mb-1">
              Plagas Regionales de Salta
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Plantillas preparadas para control de Alacranes (Tityus), prevención de Dengue (Aedes) y Vinchucas con productos aprobados por ANMAT/SENASA.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
