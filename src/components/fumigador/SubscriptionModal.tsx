import React, { useState } from 'react';
import { FumigadorAccount, SubscriptionPlanType } from '../../types';
import { SUBSCRIPTION_PLANS } from '../../data/subscriptionPlans';
import { storageService } from '../../services/storageService';
import { 
  X, 
  CheckCircle2, 
  ShieldCheck, 
  Award, 
  Calendar, 
  CreditCard, 
  Building2, 
  QrCode, 
  Sparkles, 
  ArrowRight, 
  AlertCircle 
} from 'lucide-react';

interface SubscriptionModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentAccount: FumigadorAccount;
  onSubscriptionUpdated: (updated: FumigadorAccount) => void;
  defaultPlan?: SubscriptionPlanType;
  requiredForCert?: boolean;
}

export const SubscriptionModal: React.FC<SubscriptionModalProps> = ({
  isOpen,
  onClose,
  currentAccount,
  onSubscriptionUpdated,
  defaultPlan = 'semestral',
  requiredForCert = false
}) => {
  const [selectedPlan, setSelectedPlan] = useState<SubscriptionPlanType>(defaultPlan);
  const [paymentMethod, setPaymentMethod] = useState<'mercadopago' | 'transferencia' | 'tarjeta'>('transferencia');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [transactionRef, setTransactionRef] = useState('');

  if (!isOpen) return null;

  const planInfo = SUBSCRIPTION_PLANS.find(p => p.id === selectedPlan) || SUBSCRIPTION_PLANS[1];

  const handleConfirmPayment = () => {
    setIsProcessing(true);
    setTimeout(() => {
      const generatedRef = `SALTA-${selectedPlan.toUpperCase()}-${Math.floor(100000 + Math.random() * 900000)}`;
      setTransactionRef(generatedRef);
      
      const methodLabel = paymentMethod === 'transferencia' 
        ? 'Transferencia Bancaria CBU/Alias Salta' 
        : paymentMethod === 'mercadopago' 
          ? 'Mercado Pago Salta' 
          : 'Tarjeta Débito/Crédito';

      const updated = storageService.subscribeFumigador(currentAccount.id, selectedPlan, {
        method: methodLabel,
        reference: generatedRef
      });

      setIsProcessing(false);
      setIsSuccess(true);
      onSubscriptionUpdated(updated);
    }, 900);
  };

  const handleFinish = () => {
    setIsSuccess(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm overflow-y-auto">
      <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 max-w-2xl w-full p-6 sm:p-8 my-8 relative animate-in fade-in zoom-in duration-200">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-slate-600 p-2 rounded-xl hover:bg-slate-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {isSuccess ? (
          <div className="text-center py-6 space-y-4">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-2">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h3 className="text-2xl font-black text-slate-900">
              ¡Suscripción Activada Exitosamente!
            </h3>
            <p className="text-sm text-slate-600 max-w-md mx-auto">
              Tu cuenta de fumigador profesional para <strong>{currentAccount.companyName}</strong> cuenta ahora con el <strong>{planInfo.name}</strong> activo para emitir certificados oficiales con código QR en toda la Provincia de Salta.
            </p>

            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 max-w-md mx-auto text-left text-xs space-y-2">
              <div className="flex justify-between">
                <span className="text-slate-500">Comprobante de Habilitación:</span>
                <span className="font-mono font-bold text-slate-900">{transactionRef}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Plan Contratado:</span>
                <span className="font-bold text-emerald-700">{planInfo.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Monto Abonado:</span>
                <span className="font-mono font-bold text-slate-900">${planInfo.price.toLocaleString('es-AR')} ARS</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Jurisdicción Registrada:</span>
                <span className="font-semibold text-slate-800">Provincia de Salta</span>
              </div>
            </div>

            <div className="pt-4">
              <button
                onClick={handleFinish}
                className="w-full sm:w-auto px-8 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm rounded-xl shadow-lg shadow-emerald-600/20 transition-all cursor-pointer"
              >
                Continuar a Emisión de Certificados
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div>
              {requiredForCert && (
                <div className="mb-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-xs font-bold">
                  <AlertCircle className="w-3.5 h-3.5 text-amber-600" />
                  <span>Suscripción requerida para emitir y descargar certificados</span>
                </div>
              )}
              <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                Suscripción Profesional FumiSalta
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Elegí el plan para tu empresa de fumigación en Salta ({currentAccount.companyName}) y desbloqueá la emisión ilimitada de certificados con código QR y validez bromatológica.
              </p>
            </div>

            {/* Plan Selector (3 Plans) */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {SUBSCRIPTION_PLANS.map((plan) => {
                const isSelected = selectedPlan === plan.id;
                return (
                  <div
                    key={plan.id}
                    onClick={() => setSelectedPlan(plan.id)}
                    className={`relative p-4 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between ${
                      isSelected
                        ? 'border-emerald-600 bg-emerald-50/50 shadow-md ring-2 ring-emerald-600/20'
                        : 'border-slate-200 hover:border-slate-300 bg-white'
                    }`}
                  >
                    {plan.discountBadge && (
                      <span className="absolute -top-2.5 right-3 px-2 py-0.5 bg-emerald-600 text-white text-[9px] font-black rounded-full uppercase tracking-wider">
                        {plan.discountBadge}
                      </span>
                    )}
                    <div>
                      <span className="text-xs font-bold uppercase text-slate-700 block">
                        {plan.name}
                      </span>
                      <div className="mt-2 mb-1">
                        <span className="text-2xl font-black text-slate-900 font-mono">
                          ${plan.price.toLocaleString('es-AR')}
                        </span>
                        <span className="text-[11px] text-slate-500 block">
                          {plan.periodText}
                        </span>
                      </div>
                      {plan.monthlyEquivalent !== plan.price && (
                        <span className="text-[10px] font-semibold text-emerald-700 block bg-emerald-100/70 px-1.5 py-0.5 rounded w-fit mb-2">
                          equivale a ${plan.monthlyEquivalent.toLocaleString('es-AR')}/mes
                        </span>
                      )}
                      <p className="text-[11px] text-slate-500 leading-snug mt-1">
                        {plan.tagline}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-slate-200/60 mt-3 flex items-center justify-between">
                      <span className="text-[11px] font-bold text-slate-700">
                        {isSelected ? 'Seleccionado' : 'Elegir'}
                      </span>
                      <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                        isSelected ? 'border-emerald-600 bg-emerald-600 text-white' : 'border-slate-300'
                      }`}>
                        {isSelected && <CheckCircle2 className="w-3.5 h-3.5" />}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Selected Plan Inclusions */}
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2">
              <span className="text-xs font-bold text-slate-800 block">
                Beneficios incluidos en tu {planInfo.name}:
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] text-slate-600">
                {planInfo.features.map((feat, idx) => (
                  <div key={idx} className="flex items-start gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Payment Method Selector */}
            <div className="space-y-3">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600">
                Método de Pago para Salta:
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('transferencia')}
                  className={`p-3 rounded-xl border text-left text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer ${
                    paymentMethod === 'transferencia'
                      ? 'border-emerald-600 bg-emerald-50 text-emerald-950 font-bold'
                      : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <Building2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Transferencia / Alias Salta</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('mercadopago')}
                  className={`p-3 rounded-xl border text-left text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer ${
                    paymentMethod === 'mercadopago'
                      ? 'border-emerald-600 bg-emerald-50 text-emerald-950 font-bold'
                      : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <QrCode className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Mercado Pago (QR)</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('tarjeta')}
                  className={`p-3 rounded-xl border text-left text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer ${
                    paymentMethod === 'tarjeta'
                      ? 'border-emerald-600 bg-emerald-50 text-emerald-950 font-bold'
                      : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                  }`}
                >
                  <CreditCard className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Tarjeta Débito / Crédito</span>
                </button>
              </div>

              {/* Payment details box */}
              {paymentMethod === 'transferencia' && (
                <div className="bg-emerald-50/70 border border-emerald-200/80 p-3.5 rounded-xl text-xs text-emerald-950 space-y-1">
                  <p className="font-bold flex items-center gap-1.5">
                    <Building2 className="w-4 h-4 text-emerald-600" />
                    Datos para Transferencia Bancaria (Salta):
                  </p>
                  <p>Banco: <strong>Banco Macro (Sucursal Salta Centro)</strong></p>
                  <p>Alias: <code className="bg-emerald-100 px-1.5 py-0.5 rounded font-mono font-bold text-emerald-900">FUMISALTA.OFICIAL</code></p>
                  <p>CBU: <code className="font-mono text-[11px]">2850100640094012894012</code></p>
                  <p className="text-[10px] text-emerald-800 pt-1">
                    * La acreditación es automática e instantánea en el sistema.
                  </p>
                </div>
              )}

              {paymentMethod === 'mercadopago' && (
                <div className="bg-blue-50/70 border border-blue-200/80 p-3.5 rounded-xl text-xs text-blue-950 space-y-1">
                  <p className="font-bold flex items-center gap-1.5">
                    <QrCode className="w-4 h-4 text-blue-600" />
                    Cobro Instantáneo con Mercado Pago:
                  </p>
                  <p>Dinero en cuenta, tarjetas guardadas o débito inmediato.</p>
                </div>
              )}
            </div>

            {/* Total and Submit */}
            <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <span className="text-xs text-slate-500 block">Total a abonar:</span>
                <span className="text-2xl font-black text-slate-900 font-mono">
                  ${planInfo.price.toLocaleString('es-AR')} ARS
                </span>
              </div>

              <button
                type="button"
                onClick={handleConfirmPayment}
                disabled={isProcessing}
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-3.5 bg-emerald-600 hover:bg-emerald-500 disabled:bg-slate-300 text-white font-bold text-sm rounded-xl shadow-lg shadow-emerald-600/20 transition-all cursor-pointer"
              >
                {isProcessing ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                    <span>Procesando suscripción...</span>
                  </>
                ) : (
                  <>
                    <span>Confirmar y Activar {planInfo.name}</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
