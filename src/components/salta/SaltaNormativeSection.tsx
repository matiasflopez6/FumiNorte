import React from 'react';
import { ShieldCheck, Award, FileText, QrCode, CheckCircle2, AlertTriangle, Sparkles } from 'lucide-react';

export const SaltaNormativeSection: React.FC = () => {
  return (
    <section id="normativa-salta" className="py-16 sm:py-20 px-4 bg-white border-t border-slate-200/80">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Text Information */}
          <div className="lg:col-span-6 space-y-5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold uppercase tracking-wider">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Validez Provincial Salta</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight leading-tight">
              Certificados de Fumigación Homologados para la Ciudad de Salta
            </h2>

            <p className="text-slate-600 text-sm leading-relaxed">
              En Salta, la reglamentación para comercios, gastronómicos, hoteles y consorcios exige constancias de desinfección y desinsectación emitidas por aplicadores habilitados.
            </p>

            <div className="space-y-3 pt-2">
              <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80">
                <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900">Bromatología Municipalidad de Salta</h4>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Formato admitido para habilitaciones comerciales, peñas, confiterías y locales de elaboración de alimentos (Art. 30 y concordantes).
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80">
                <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900">Control de Vectores Autóctonos de Salta</h4>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Fichas técnicas para el combate de <em>Aedes aegypti</em> (Dengue), <em>Tityus trivittatus</em> (Alacranes) y <em>Triatoma infestans</em> (Vinchucas).
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80">
                <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
                  <QrCode className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900">Código QR Anti-Falsificación</h4>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Permite a inspectores municipales verificar la autenticidad del certificado, la matrícula del fumigador y el principio activo aplicado.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Certificate Mockup Visual */}
          <div className="lg:col-span-6 bg-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-2xl relative overflow-hidden border border-slate-800">
            <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>

            <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-4">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-emerald-500"></span>
                <span className="text-xs font-bold tracking-wider uppercase text-emerald-400">
                  Modelo Oficial de Certificado Salta
                </span>
              </div>
              <span className="text-[10px] font-mono text-slate-400 bg-slate-800 px-2.5 py-1 rounded-md">
                CERT-SALTA-2025
              </span>
            </div>

            {/* Inner certificate preview */}
            <div className="bg-white rounded-2xl p-5 text-slate-900 text-xs space-y-3 shadow-inner border border-slate-300">
              <div className="text-center border-b border-slate-200 pb-3">
                <span className="text-[9px] uppercase font-black text-emerald-800 block tracking-widest">
                  REGISTRO OFICIAL DE CONTROL DE PLAGAS — PROVINCIA DE SALTA
                </span>
                <span className="text-base font-black text-slate-900 block mt-0.5">
                  FUMIGACIONES NORTE SALTA
                </span>
                <span className="text-[10px] text-slate-500">
                  Director Técnico: Ing. Facundo Saravia • Matrícula MP-SALTA-2841
                </span>
              </div>

              <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-200 text-[11px] space-y-1">
                <div className="flex justify-between">
                  <span className="text-slate-500">Inmueble:</span>
                  <span className="font-bold">Restaurante & Peña Balderrama</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Dirección:</span>
                  <span className="font-bold">Av. San Martín 1126, Salta</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Plagas Controladas:</span>
                  <span className="font-semibold text-emerald-800">Cucarachas, Alacranes, Dengue</span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-1 text-[10px] text-slate-600">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 bg-slate-100 border border-slate-300 rounded flex items-center justify-center font-mono font-bold text-emerald-800 text-[8px]">
                    QR SALTA
                  </div>
                  <div>
                    <span className="font-bold block text-slate-800">Validado en FumiSalta</span>
                    <span>Vigencia: 30 Días</span>
                  </div>
                </div>

                <div className="text-right">
                  <span className="font-serif italic block text-slate-800 font-bold">F. Saravia</span>
                  <span className="text-[9px] text-slate-400">Firma & Sello Habilitado</span>
                </div>
              </div>
            </div>

            <p className="text-[11px] text-slate-400 text-center mt-4">
              * Se genera automáticamente con 1 solo clic desde tu panel y se imprime en papel membretado o se envía en PDF a tu cliente por WhatsApp.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
