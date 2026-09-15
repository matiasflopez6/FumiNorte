import React from 'react';
import { SUBSCRIPTION_PLANS } from '../../data/subscriptionPlans';
import { SubscriptionPlanType } from '../../types';
import { 
  CheckCircle2, 
  ArrowRight, 
  ShieldCheck, 
  Award, 
  Sparkles, 
  Building2, 
  CreditCard, 
  QrCode, 
  FileCheck2 
} from 'lucide-react';

interface SaltaPlansSectionProps {
  onSelectPlan: (planId: SubscriptionPlanType) => void;
}

export const SaltaPlansSection: React.FC<SaltaPlansSectionProps> = ({ onSelectPlan }) => {
  return (
    <section id="planes-suscripcion" className="py-16 sm:py-20 px-4 bg-slate-50 border-t border-slate-200/80">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-black uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            <span>Suscripciones Profesionales Salta</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Elegí tu Plan para Emitir Certificados Oficiales en Salta
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-3 leading-relaxed">
            Todos los planes incluyen base de datos privada e independiente para tu empresa, emisión ilimitada de certificados con código QR y validez reglamentaria ante la Municipalidad de Salta.
          </p>
        </div>

        {/* 3 Plans Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 items-stretch">
          {SUBSCRIPTION_PLANS.map((plan) => {
            const isPopular = plan.popular;

            return (
              <div
                key={plan.id}
                className={`relative rounded-3xl p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 ${
                  isPopular
                    ? 'bg-white border-2 border-emerald-600 shadow-xl shadow-emerald-950/10 ring-4 ring-emerald-600/10 -translate-y-2'
                    : 'bg-white border border-slate-200 shadow-sm hover:shadow-md hover:border-slate-300'
                }`}
              >
                {/* Popular Badge */}
                {isPopular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-emerald-600 text-white text-[11px] font-black uppercase tracking-wider px-4 py-1 rounded-full shadow-md">
                    PLAN RECOMENDADO SALTA
                  </div>
                )}

                {/* Discount Badge */}
                {plan.discountBadge && !isPopular && (
                  <div className="absolute -top-3 right-6 bg-slate-900 text-white text-[10px] font-black uppercase tracking-wider px-3 py-0.5 rounded-full">
                    {plan.discountBadge}
                  </div>
                )}

                <div>
                  <div className="mb-4">
                    <h3 className="text-xl font-black text-slate-900">{plan.name}</h3>
                    <p className="text-xs text-slate-500 mt-1 leading-snug min-h-[34px]">
                      {plan.tagline}
                    </p>
                  </div>

                  {/* Price display */}
                  <div className="py-4 border-y border-slate-100 my-4">
                    <div className="flex items-baseline gap-1">
                      <span className="text-3xl sm:text-4xl font-black text-slate-900 font-mono">
                        ${plan.price.toLocaleString('es-AR')}
                      </span>
                      <span className="text-xs font-semibold text-slate-500">
                        {plan.periodText}
                      </span>
                    </div>

                    <span className="text-[11px] text-slate-500 block mt-1">
                      {plan.billingFrequency}
                    </span>

                    {plan.monthlyEquivalent !== plan.price && (
                      <span className="inline-block mt-2 text-xs font-bold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200/60">
                        Equivale a solo ${plan.monthlyEquivalent.toLocaleString('es-AR')} al mes
                      </span>
                    )}
                  </div>

                  {/* Features list */}
                  <div className="space-y-2.5 mb-6 text-xs text-slate-700">
                    <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block">
                      Incluido en este plan:
                    </span>
                    {plan.features.map((feature, i) => (
                      <div key={i} className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span className="leading-snug text-slate-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* CTA Button */}
                <div className="pt-4 border-t border-slate-100">
                  <button
                    onClick={() => onSelectPlan(plan.id)}
                    className={`w-full py-3.5 px-5 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md ${
                      isPopular
                        ? 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-700/20'
                        : 'bg-slate-900 hover:bg-slate-800 text-white'
                    }`}
                  >
                    <span>Contratar {plan.name}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  <p className="text-[10px] text-center text-slate-400 mt-2">
                    Activación instantánea • Factura y recibo digital
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Accepted Payment Methods in Salta */}
        <div className="mt-12 bg-white rounded-2xl p-6 border border-slate-200/90 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3 text-center md:text-left">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0 mx-auto md:mx-0">
              <Building2 className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900">
                Métodos de Pago Habilitados para la Provincia de Salta
              </h4>
              <p className="text-xs text-slate-500">
                Transferencias bancarias locales inmediatas con Banco Macro (Alias Salta), Mercado Pago con código QR y tarjetas de débito/crédito.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <span className="px-3 py-1.5 bg-slate-100 rounded-lg text-xs font-semibold text-slate-700">
              Banco Macro Salta
            </span>
            <span className="px-3 py-1.5 bg-blue-50 text-blue-800 rounded-lg text-xs font-semibold">
              Mercado Pago
            </span>
            <span className="px-3 py-1.5 bg-slate-100 rounded-lg text-xs font-semibold text-slate-700">
              CBU / Transferencia
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
