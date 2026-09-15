import React, { useState } from 'react';
import { FumigadorAccount, ClientItem, ServiceRecord } from '../../types';
import { SUBSCRIPTION_PLANS } from '../../data/subscriptionPlans';
import { FumiNorteLogo } from '../common/FumiNorteLogo';
import { SubscriptionModal } from './SubscriptionModal';
import { 
  Award, 
  Printer, 
  CheckCircle2, 
  Shield, 
  Calendar, 
  QrCode, 
  FileCheck2, 
  Lock, 
  AlertTriangle, 
  Sparkles, 
  ArrowRight 
} from 'lucide-react';

interface CertificateGeneratorProps {
  fumigador: FumigadorAccount;
  clients: ClientItem[];
  services: ServiceRecord[];
  initialClient?: ClientItem | null;
  initialService?: ServiceRecord | null;
  onSubscriptionUpdated?: (updated: FumigadorAccount) => void;
}

export const CertificateGenerator: React.FC<CertificateGeneratorProps> = ({
  fumigador,
  clients,
  services,
  initialClient,
  initialService,
  onSubscriptionUpdated
}) => {
  const [selectedClientId, setSelectedClientId] = useState<string>(
    initialClient?.id || initialService?.clientId || clients[0]?.id || ''
  );
  const [certNumber, setCertNumber] = useState<string>(
    initialService?.certificateNumber || `CERT-SALTA-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`
  );
  const [dateIssued, setDateIssued] = useState<string>(
    initialService?.date || new Date().toISOString().split('T')[0]
  );
  const [validityDays, setValidityDays] = useState<number>(30);
  const [productsUsed, setProductsUsed] = useState<string>(
    initialService?.chemicalProduct || 'Fipronil Gel 0.05% + Lambdacialotrina microencapsulada (Anti-alacrán y cucarachicidas) + Cebo Rodenticida en cebaderas con llave'
  );
  const [safetyHours, setSafetyHours] = useState<number>(initialService?.safetyPeriodHours || 2);
  const [observations, setObservations] = useState<string>(
    initialService?.observations || 'Tratamiento ejecutado conforme a la Ordenanza de Bromatología y Saneamiento de la Municipalidad de Salta. Productos autorizados por SENASA y ANMAT.'
  );
  const [isSubModalOpen, setIsSubModalOpen] = useState(false);

  const selectedClient = clients.find(c => c.id === selectedClientId) || clients[0];

  // Subscription check
  const isSubscribed = fumigador.subscription?.status === 'activa';
  const activePlanInfo = SUBSCRIPTION_PLANS.find(p => p.id === fumigador.subscription?.plan);

  // Calculate expiration
  const expirationDate = new Date(dateIssued || new Date());
  expirationDate.setDate(expirationDate.getDate() + Number(validityDays));
  const expirationDateFormatted = expirationDate.toISOString().split('T')[0];

  const handlePrint = () => {
    if (!isSubscribed) {
      setIsSubModalOpen(true);
      return;
    }
    window.print();
  };

  if (!selectedClient) {
    return (
      <div className="bg-white rounded-2xl p-12 text-center border border-slate-200">
        <Award className="w-12 h-12 text-slate-300 mx-auto mb-3" />
        <h3 className="text-base font-bold text-slate-700">No hay clientes disponibles en Salta</h3>
        <p className="text-xs text-slate-500 mt-1">
          Primero debes registrar al menos un cliente en tu base de datos para emitir su constancia técnica de fumigación.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Subscription Requirement Banner if not subscribed */}
      {!isSubscribed && (
        <div className="bg-gradient-to-r from-amber-500/10 via-amber-500/20 to-amber-500/10 border-2 border-amber-400 p-5 rounded-3xl print:hidden flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
          <div className="flex items-start gap-3">
            <div className="p-2.5 bg-amber-500 text-slate-950 rounded-2xl shrink-0 mt-0.5">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-black text-slate-900 flex items-center gap-2">
                <span>Suscripción Requerida para Emitir Certificados Oficiales en Salta</span>
                <span className="text-[10px] uppercase font-bold bg-amber-200 text-amber-900 px-2 py-0.5 rounded-full">
                  Acceso Restringido
                </span>
              </h3>
              <p className="text-xs text-slate-600 mt-0.5">
                Para imprimir o descargar certificados con validez legal ante la Municipalidad de Salta, debes contar con un plan activo (Mensual, Semestral o Anual).
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsSubModalOpen(true)}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs rounded-xl shadow-md transition-all cursor-pointer shrink-0"
          >
            <Sparkles className="w-4 h-4" />
            <span>Suscribirme para Emitir</span>
          </button>
        </div>
      )}

      {/* Active Subscription Banner if subscribed */}
      {isSubscribed && (
        <div className="bg-emerald-50 border border-emerald-200/80 px-4 py-3 rounded-2xl print:hidden flex items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 text-emerald-900">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>
              Suscripción Activa: <strong>{activePlanInfo?.name}</strong> habilitada para emisión ilimitada de certificados en Salta.
            </span>
          </div>
          <button
            onClick={() => setIsSubModalOpen(true)}
            className="text-emerald-700 hover:text-emerald-900 font-bold underline cursor-pointer"
          >
            Administrar Plan
          </button>
        </div>
      )}

      {/* Configuration bar (hidden on print) */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm print:hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
          <div>
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <Award className="w-5 h-5 text-emerald-600" />
              <span>Emisión de Certificados Oficiales - Provincia de Salta</span>
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Constancias válidas para inspecciones de Bromatología Municipal, SENASA y Saneamiento Ambiental de Salta.
            </p>
          </div>

          <button
            onClick={handlePrint}
            className={`flex items-center gap-2 px-6 py-3 font-bold text-xs rounded-xl shadow-md transition-all cursor-pointer ${
              isSubscribed
                ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-700/20'
                : 'bg-slate-900 hover:bg-slate-800 text-white'
            }`}
          >
            {isSubscribed ? <Printer className="w-4 h-4" /> : <Lock className="w-4 h-4 text-amber-400" />}
            <span>{isSubscribed ? 'Imprimir / Guardar en PDF' : 'Desbloquear con Suscripción'}</span>
          </button>
        </div>

        {/* Controls */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-3 border-t border-slate-100">
          <div>
            <label className="block text-[11px] font-bold uppercase text-slate-500 mb-1">
              Cliente Destinatario (Salta)
            </label>
            <select
              value={selectedClientId}
              onChange={(e) => setSelectedClientId(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800"
            >
              {clients.map((c) => (
                <option key={c.id} value={c.id}>{c.name} ({c.address} - {c.locality})</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-bold uppercase text-slate-500 mb-1">
              N° de Certificado Salta
            </label>
            <input
              type="text"
              value={certNumber}
              onChange={(e) => setCertNumber(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 font-mono"
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold uppercase text-slate-500 mb-1">
              Fecha de Tratamiento
            </label>
            <input
              type="date"
              value={dateIssued}
              onChange={(e) => setDateIssued(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800"
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold uppercase text-slate-500 mb-1">
              Vigencia Reglamentaria
            </label>
            <select
              value={validityDays}
              onChange={(e) => setValidityDays(Number(e.target.value))}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800"
            >
              <option value={30}>30 días (Obligatorio Gastronomía / Salta)</option>
              <option value={60}>60 días (Comercial / Depósitos)</option>
              <option value={90}>90 días (Residencial / Fincas)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Printable Certificate Sheet */}
      <div className="relative">
        {/* Overlay if not subscribed */}
        {!isSubscribed && (
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-[2px] z-20 rounded-2xl flex flex-col items-center justify-center p-6 text-center text-white print:hidden">
            <div className="w-16 h-16 bg-amber-500 text-slate-950 rounded-3xl flex items-center justify-center mb-3 shadow-xl">
              <Lock className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-black max-w-md">
              Emisión Oficial Bloqueada
            </h3>
            <p className="text-xs text-slate-200 max-w-sm mt-1 mb-4">
              Cada fumigador de Salta abona una suscripción mensual, semestral o anual para emitir certificados con código QR verificable.
            </p>
            <button
              onClick={() => setIsSubModalOpen(true)}
              className="px-6 py-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs rounded-xl shadow-lg transition-all cursor-pointer flex items-center gap-2"
            >
              <span>Ver Planes y Activar Suscripción</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

        <div className="bg-white rounded-2xl shadow-xl border border-slate-300 p-8 max-w-3xl mx-auto print:border-none print:shadow-none print:p-0 print:m-0 print:max-w-none text-slate-800 font-sans">
          {/* Double border frame */}
          <div className="border-4 border-double border-emerald-800 p-6 sm:p-8 rounded-xl relative bg-white">
            {/* Top Salta header */}
            <div className="flex flex-col sm:flex-row items-center justify-between pb-6 border-b-2 border-slate-200 gap-4">
              <div className="flex items-center gap-4 text-center sm:text-left">
                <div className="w-14 h-14 rounded-2xl bg-slate-50 border border-slate-200 p-2 flex items-center justify-center shrink-0">
                  <FumiNorteLogo variant="icon" size="md" theme="light" />
                </div>
                <div>
                  <span className="text-[10px] font-extrabold uppercase tracking-widest text-emerald-800 block">
                    REGISTRO PROVINCIAL DE CONTROL DE PLAGAS — PROVINCIA DE SALTA
                  </span>
                  <h1 className="text-2xl font-black text-slate-900 tracking-tight">
                    {fumigador.companyName}
                  </h1>
                  <p className="text-xs text-slate-600 mt-0.5">
                    Director Técnico: <strong className="text-slate-800">{fumigador.fullName}</strong> — Matrícula: <strong className="font-mono text-emerald-800">{fumigador.matricula}</strong>
                  </p>
                  <p className="text-xs text-slate-500">
                    Tel: {fumigador.phone} | Jurisdicción: {fumigador.cityZone || 'Provincia de Salta'}
                  </p>
                </div>
              </div>

              <div className="text-center sm:text-right border-2 border-emerald-800/30 bg-emerald-50/50 p-3 rounded-xl shrink-0">
                <span className="text-[10px] uppercase font-bold text-slate-500 block">CERTIFICADO N°</span>
                <span className="text-base font-black text-emerald-900 font-mono tracking-wider">
                  {certNumber}
                </span>
                <span className="text-[9px] text-emerald-700 block font-bold mt-0.5">
                  HABILITACIÓN SALTA
                </span>
              </div>
            </div>

            {/* Title banner */}
            <div className="my-6 text-center bg-slate-900 text-white py-2.5 rounded-lg">
              <h2 className="text-sm sm:text-base font-bold uppercase tracking-widest">
                Certificado Oficial de Desinfección, Desinsectación y Desratización
              </h2>
              <span className="text-[10px] text-emerald-300 font-medium block">
                Conforme a normativas de Bromatología de la Municipalidad de Salta y SENASA
              </span>
            </div>

            {/* Client and Location Data */}
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/80 mb-6 text-xs space-y-2">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <div>
                  <span className="text-slate-500 font-medium">Titular / Razón Social: </span>
                  <strong className="text-slate-900">{selectedClient.name}</strong>
                </div>
                <div>
                  <span className="text-slate-500 font-medium">Destino del Inmueble: </span>
                  <strong className="text-slate-900 capitalize">{selectedClient.propertyType}</strong>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <div>
                  <span className="text-slate-500 font-medium">Domicilio Tratado: </span>
                  <strong className="text-slate-900">{selectedClient.address}</strong>
                </div>
                <div>
                  <span className="text-slate-500 font-medium">Localidad / Zona: </span>
                  <strong className="text-slate-900">{selectedClient.locality}</strong>
                </div>
              </div>
            </div>

            {/* Technical Specifications */}
            <div className="space-y-4 text-xs mb-6">
              <div className="border-b border-slate-100 pb-2">
                <h4 className="font-bold text-slate-800 uppercase text-[11px] mb-1">
                  1. Vectores y Plagas de la Provincia de Salta Controladas
                </h4>
                <p className="text-slate-600">
                  Control de {selectedClient.frequentPest.join(', ')}. Fumigación y barrera química en zócalos, aberturas, rejillas cloacales, cámaras sépticas y áreas críticas perimetrales.
                </p>
              </div>

              <div className="border-b border-slate-100 pb-2">
                <h4 className="font-bold text-slate-800 uppercase text-[11px] mb-1">
                  2. Productos Químicos y Principios Activos Dosificados
                </h4>
                <p className="text-slate-700 font-medium bg-emerald-50/60 p-2.5 rounded-lg border border-emerald-200/60">
                  {productsUsed}
                </p>
                <p className="text-[10px] text-slate-500 mt-1">
                  Sustancias inscriptas en el Registro Nacional de Plaguicidas (ANMAT / SENASA). Formulación de baja toxicidad y alto poder de desalojo y volteo.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 bg-slate-50 p-3 rounded-xl border border-slate-200">
                <div>
                  <span className="text-slate-500 block text-[10px] uppercase font-bold">Fecha de Aplicación</span>
                  <span className="font-bold text-slate-900">{dateIssued}</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[10px] uppercase font-bold">Vencimiento del Certificado</span>
                  <span className="font-bold text-emerald-800">{expirationDateFormatted}</span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[10px] uppercase font-bold">Período de Ventilación</span>
                  <span className="font-bold text-slate-900">{safetyHours} Horas</span>
                </div>
              </div>

              {observations && (
                <div className="text-[11px] text-slate-600 bg-amber-50/60 p-2.5 rounded-lg border border-amber-200/60">
                  <strong>Recomendaciones para el titular:</strong> {observations}
                </div>
              )}
            </div>

            {/* Signatures & Security Stamp */}
            <div className="pt-6 border-t-2 border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-6">
              {/* QR verification */}
              <div className="flex items-center gap-3">
                <div className="w-16 h-16 bg-slate-100 border border-slate-300 rounded-lg p-1.5 flex flex-col items-center justify-center text-slate-800">
                  <QrCode className="w-10 h-10 text-emerald-800" />
                  <span className="text-[7px] font-bold font-mono">SALTA-OK</span>
                </div>
                <div className="text-[10px] text-slate-500 leading-tight">
                  <span className="font-bold text-slate-700 block">SISTEMA OFICIAL FUMISALTA</span>
                  <span>Registro Digital Provincial de Certificados</span>
                  <span className="block text-emerald-700 font-mono mt-0.5">Hash: {certNumber}</span>
                  <span className="text-[9px] text-slate-400">Verificable por Inspectores</span>
                </div>
              </div>

              {/* Signature & Stamp box */}
              <div className="text-center w-56 pt-6 border-t border-slate-400">
                <span className="font-bold text-slate-900 text-xs block">{fumigador.fullName}</span>
                <span className="text-[10px] text-slate-600 block">Director Técnico / Aplicador</span>
                <span className="text-[10px] font-mono text-emerald-800 font-bold block">
                  {fumigador.matricula}
                </span>
                <span className="text-[9px] text-slate-400 block mt-0.5">Firma y Matrícula Habilitada en Salta</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <SubscriptionModal
        isOpen={isSubModalOpen}
        onClose={() => setIsSubModalOpen(false)}
        currentAccount={fumigador}
        onSubscriptionUpdated={(updated) => {
          if (onSubscriptionUpdated) onSubscriptionUpdated(updated);
        }}
        requiredForCert={true}
      />
    </div>
  );
};
