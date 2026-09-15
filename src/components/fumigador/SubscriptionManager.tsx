import React, { useState } from 'react';
import { FumigadorAccount, SubscriptionPlanType } from '../../types';
import { SUBSCRIPTION_PLANS } from '../../data/subscriptionPlans';
import { SubscriptionModal } from './SubscriptionModal';
import { 
  ShieldCheck, 
  Award, 
  Calendar, 
  CheckCircle2, 
  CreditCard, 
  Sparkles, 
  AlertTriangle, 
  ArrowUpRight, 
  FileCheck2, 
  RefreshCw 
} from 'lucide-react';

interface SubscriptionManagerProps {
  fumigador: FumigadorAccount;
  onSubscriptionUpdated: (updated: FumigadorAccount) => void;
}

export const SubscriptionManager: React.FC<SubscriptionManagerProps> = ({
  fumigador,
  onSubscriptionUpdated
}) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedPlanForModal, setSelectedPlanForModal] = useState<SubscriptionPlanType>('semestral');

  const currentSub = fumigador.subscription;
  const isSubActive = currentSub?.status === 'activa';
  const activePlanConfig = SUBSCRIPTION_PLANS.find(p => p.id === currentSub?.plan);

  const handleOpenPlanModal = (planId: SubscriptionPlanType) => {
    setSelectedPlanForModal(planId);
    setModalOpen(true);
  };

  return (
    <div className="space-y-6">
      {/* Header & Current Status Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                Suscripción Profesional FumiSalta
              </span>
              {isSubActive ? (
                <span className="text-xs font-bold text-emerald-700 bg-emerald-100/80 px-2.5 py-1 rounded-full flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Activa</span>
                </span>
              ) : (
                <span className="text-xs font-bold text-amber-800 bg-amber-100 px-2.5 py-1 rounded-full flex items-center gap-1">
                  <AlertTriangle className="w-3.5 h-3.5" />
                  <span>Sin suscripción activa</span>
                </span>
              )}
            </div>
            <h2 className="text-2xl font-black text-slate-900">
              Estado de Suscripción para Emisión de Certificados
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Habilitación legal y técnica de la empresa <strong className="text-slate-800">{fumigador.companyName}</strong> (Matrícula: {fumigador.matricula}) para emitir certificados oficiales en Salta.
            </p>
          </div>

          <button
            onClick={() => handleOpenPlanModal(currentSub?.plan || 'semestral')}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm rounded-xl shadow-md shadow-emerald-700/20 transition-all cursor-pointer shrink-0"
          >
            <RefreshCw className="w-4 h-4" />
            <span>{isSubActive ? 'Cambiar o Renovar Plan' : 'Activar Suscripción Ahora'}</span>
          </button>
        </div>

        {/* Current plan detail grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-6">
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
            <span className="text-[11px] font-bold uppercase text-slate-500 block mb-1">
              Plan Contratado
            </span>
            <span className="text-base font-black text-slate-900 block">
              {activePlanConfig ? activePlanConfig.name : 'Ningún plan activo'}
            </span>
            <span className="text-xs text-slate-500 mt-0.5 block">
              {activePlanConfig ? activePlanConfig.billingFrequency : 'Requiere plan para emitir certificados'}
            </span>
          </div>

          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
            <span className="text-[11px] font-bold uppercase text-slate-500 block mb-1">
              Emisión de Certificados
            </span>
            <div className="flex items-center gap-1.5 mt-1">
              {isSubActive ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span className="text-sm font-black text-emerald-700">Habilitada Ilimitada</span>
                </>
              ) : (
                <>
                  <AlertTriangle className="w-4 h-4 text-amber-600" />
                  <span className="text-sm font-black text-amber-700">Bloqueada (Plan Requerido)</span>
                </>
              )}
            </div>
            <span className="text-xs text-slate-500 mt-0.5 block">
              Con QR y formato oficial Salta
            </span>
          </div>

          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
            <span className="text-[11px] font-bold uppercase text-slate-500 block mb-1">
              Vigencia Hasta
            </span>
            <span className="text-base font-mono font-black text-slate-900 block">
              {currentSub?.expiresAt || 'No definida'}
            </span>
            <span className="text-xs text-slate-500 mt-0.5 block">
              {currentSub?.startedAt ? `Iniciado el ${currentSub.startedAt}` : 'Sin inicio'}
            </span>
          </div>

          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
            <span className="text-[11px] font-bold uppercase text-slate-500 block mb-1">
              Comprobante de Pago
            </span>
            <span className="text-xs font-mono font-bold text-slate-800 truncate block">
              {currentSub?.paymentReference || 'N/A'}
            </span>
            <span className="text-[11px] text-slate-500 mt-0.5 block truncate">
              {currentSub?.paymentMethod || 'Pendiente de pago'}
            </span>
          </div>
        </div>
      </div>

      {/* Available Plans Comparison */}
      <div>
        <div className="mb-4">
          <h3 className="text-lg font-bold text-slate-900">
            Comparativa de Planes de Suscripción para Fumigadores
          </h3>
          <p className="text-xs text-slate-500">
            Podés cambiar tu modalidad en cualquier momento. La actualización a un plan mayor se aplica instantáneamente.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {SUBSCRIPTION_PLANS.map((plan) => {
            const isCurrent = currentSub?.plan === plan.id && isSubActive;

            return (
              <div
                key={plan.id}
                className={`bg-white rounded-3xl p-6 border-2 shadow-sm flex flex-col justify-between relative transition-all ${
                  plan.popular
                    ? 'border-emerald-600 ring-2 ring-emerald-600/10'
                    : isCurrent
                      ? 'border-teal-600 bg-teal-50/20'
                      : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                {plan.discountBadge && (
                  <span className="absolute -top-3 right-6 px-3 py-1 bg-emerald-600 text-white text-[10px] font-black rounded-full uppercase tracking-wider shadow-sm">
                    {plan.discountBadge}
                  </span>
                )}

                <div className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between">
                      <h4 className="text-base font-black text-slate-900">{plan.name}</h4>
                      {isCurrent && (
                        <span className="text-[10px] font-black bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full uppercase">
                          Tu Plan Actual
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-500 mt-1 leading-snug">
                      {plan.tagline}
                    </p>
                  </div>

                  <div className="py-2 border-y border-slate-100">
                    <span className="text-3xl font-black text-slate-900 font-mono">
                      ${plan.price.toLocaleString('es-AR')}
                    </span>
                    <span className="text-xs text-slate-500 ml-1">
                      {plan.periodText}
                    </span>
                    {plan.monthlyEquivalent !== plan.price && (
                      <span className="text-xs font-semibold text-emerald-700 block mt-1">
                        Costo mensual: ${plan.monthlyEquivalent.toLocaleString('es-AR')}/mes
                      </span>
                    )}
                  </div>

                  <div className="space-y-2 text-xs text-slate-700">
                    <span className="font-bold text-[11px] text-slate-500 uppercase tracking-wider block">
                      Incluye:
                    </span>
                    {plan.features.map((feat, i) => (
                      <div key={i} className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span className="text-slate-600 text-[11px] leading-snug">{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-6 mt-6 border-t border-slate-100">
                  <button
                    onClick={() => handleOpenPlanModal(plan.id)}
                    className={`w-full py-3 px-4 font-bold text-xs rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                      isCurrent
                        ? 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                        : plan.popular
                          ? 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-md shadow-emerald-600/20'
                          : 'bg-slate-900 hover:bg-slate-800 text-white'
                    }`}
                  >
                    <span>{isCurrent ? 'Renovar Este Plan' : `Elegir ${plan.name}`}</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <SubscriptionModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        currentAccount={fumigador}
        onSubscriptionUpdated={onSubscriptionUpdated}
        defaultPlan={selectedPlanForModal}
      />
    </div>
  );
};
