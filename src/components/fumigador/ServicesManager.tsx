import React, { useState } from 'react';
import { ServiceRecord, ClientItem, FumigadorAccount } from '../../types';
import { Plus, Search, Calendar, DollarSign, CheckCircle2, Clock, Trash2, Award, FileText, AlertTriangle, ShieldCheck, X } from 'lucide-react';

interface ServicesManagerProps {
  fumigador: FumigadorAccount;
  clients: ClientItem[];
  services: ServiceRecord[];
  onSaveService: (serviceData: Omit<ServiceRecord, 'id' | 'fumigadorId'>) => void;
  onDeleteService: (serviceId: string) => void;
  onOpenCertificateForService: (service: ServiceRecord) => void;
  preSelectedClient?: ClientItem | null;
}

const CHEMICAL_PRESETS = [
  'Gel Fipronil 0.05% (Cucarachicida de baja toxicidad)',
  'Lambdacialotrina microencapsulada (Especial Alacranes y Escorpiones)',
  'Deltametrina fluida de bajo olor (Barrera residual zócalos)',
  'Permetrina + Piriproxifeno (Fumigación Dengue / Mosquitos / Aedes)',
  'Brodifacoum 0.005% bloques parafinados en cajas cebaderas con llave',
  'Bromadiolona grano entero en estaciones cebaderas para roedores',
  'Imidacloprid + Gel atrayente (Hormigas y cucarachas)',
  'Termonebulización ULV para parques y fincas de Salta'
];

export const ServicesManager: React.FC<ServicesManagerProps> = ({
  fumigador,
  clients,
  services,
  onSaveService,
  onDeleteService,
  onOpenCertificateForService,
  preSelectedClient
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterPayment, setFilterPayment] = useState<string>('all');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Form State
  const [clientId, setClientId] = useState<string>(preSelectedClient ? preSelectedClient.id : (clients[0]?.id || ''));
  const [serviceDate, setServiceDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [pests, setPests] = useState<string[]>(['Cucarachas']);
  const [chemical, setChemical] = useState<string>(CHEMICAL_PRESETS[0]);
  const [dosage, setDosage] = useState<string>('Aplicación focalizada en zócalos y zonas húmedas');
  const [safetyHours, setSafetyHours] = useState<number>(2);
  const [cost, setCost] = useState<number>(35000);
  const [paymentStatus, setPaymentStatus] = useState<'cobrado' | 'pendiente'>('cobrado');
  const [observations, setObservations] = useState<string>('Se recomienda mantener selladas las rejillas y ventilar.');
  const [nextDate, setNextDate] = useState<string>('');

  const openNewServiceModal = (client?: ClientItem) => {
    if (client) {
      setClientId(client.id);
      setPests(client.frequentPest);
    } else if (clients.length > 0) {
      setClientId(clients[0].id);
      setPests(clients[0].frequentPest);
    }
    // Generate cert number
    setServiceDate(new Date().toISOString().split('T')[0]);
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const selectedClient = clients.find(c => c.id === clientId);
    if (!selectedClient) return;

    const certNum = `CERT-SALTA-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;

    onSaveService({
      clientId,
      clientName: selectedClient.name,
      date: serviceDate,
      pestsTreated: pests,
      chemicalProduct: chemical,
      dosage,
      safetyPeriodHours: Number(safetyHours),
      cost: Number(cost),
      paymentStatus,
      certificateNumber: certNum,
      observations,
      nextServiceRecommendedDate: nextDate || undefined
    });

    setIsModalOpen(false);
  };

  const filteredServices = services.filter((srv) => {
    const matchesSearch = 
      srv.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      srv.chemicalProduct.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (srv.certificateNumber && srv.certificateNumber.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesPayment = filterPayment === 'all' || srv.paymentStatus === filterPayment;
    return matchesSearch && matchesPayment;
  });

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold text-slate-900">Registro de Servicios y Tratamientos</h2>
            <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-2.5 py-0.5 rounded-full">
              {services.length} órdenes registradas
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Historial técnico de fumigaciones realizadas, productos químicos dosificados y estados de cobro.
          </p>
        </div>

        <button
          onClick={() => openNewServiceModal()}
          disabled={clients.length === 0}
          className="flex items-center gap-2 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-300 text-white font-semibold text-xs rounded-xl shadow-md shadow-emerald-700/20 transition-all cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Registrar Nuevo Servicio</span>
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-sm flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Buscar por cliente, producto químico o N° certificado..."
            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all"
          />
        </div>

        <select
          value={filterPayment}
          onChange={(e) => setFilterPayment(e.target.value)}
          className="px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-700 font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
        >
          <option value="all">Todos los Cobros</option>
          <option value="cobrado">Cobrado / Pagado</option>
          <option value="pendiente">Pago Pendiente</option>
        </select>
      </div>

      {/* Services List */}
      {filteredServices.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 border border-slate-200/80 text-center shadow-sm">
          <div className="w-14 h-14 mx-auto mb-3 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <FileText className="w-7 h-7" />
          </div>
          <h3 className="text-base font-bold text-slate-800 mb-1">
            {searchTerm ? 'No hay servicios que coincidan con la búsqueda' : 'No tienes órdenes de trabajo registradas aún'}
          </h3>
          <p className="text-xs text-slate-500 max-w-md mx-auto mb-5">
            Cada vez que realices una desinfección o fumigación, regístrala aquí para emitir el certificado oficial y llevar el control contable de tu trabajo.
          </p>
          {clients.length > 0 && (
            <button
              onClick={() => openNewServiceModal()}
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs rounded-xl shadow-md transition-all cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Registrar Primera Orden</span>
            </button>
          )}
        </div>
      ) : (
        <div className="space-y-3">
          {filteredServices.map((srv) => (
            <div
              key={srv.id}
              className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-sm hover:border-slate-300 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4"
            >
              <div className="space-y-1.5 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-bold text-sm text-slate-900">{srv.clientName}</span>
                  <span className="px-2 py-0.5 bg-slate-100 text-slate-700 rounded text-[11px] font-mono">
                    {srv.certificateNumber}
                  </span>
                  {srv.paymentStatus === 'cobrado' ? (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-emerald-50 text-emerald-700 rounded text-[10px] font-bold border border-emerald-200">
                      <CheckCircle2 className="w-3 h-3" /> Cobrado
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-amber-50 text-amber-700 rounded text-[10px] font-bold border border-amber-200">
                      <Clock className="w-3 h-3" /> Pendiente de Cobro
                    </span>
                  )}
                </div>

                <div className="text-xs text-slate-600 flex flex-wrap items-center gap-x-3 gap-y-1">
                  <span className="flex items-center gap-1 text-slate-500">
                    <Calendar className="w-3.5 h-3.5" /> {srv.date}
                  </span>
                  <span>•</span>
                  <span className="text-slate-700 font-medium">
                    Plagas: {srv.pestsTreated.join(', ')}
                  </span>
                  <span>•</span>
                  <span className="text-slate-500">
                    Ventilación: {srv.safetyPeriodHours}hs
                  </span>
                </div>

                <p className="text-xs text-slate-500 bg-slate-50 p-2 rounded-lg border border-slate-100">
                  <strong className="text-slate-700">Producto y dosis:</strong> {srv.chemicalProduct} — {srv.dosage}
                </p>

                {srv.observations && (
                  <p className="text-[11px] text-slate-500 italic">
                    "{srv.observations}"
                  </p>
                )}
              </div>

              <div className="flex md:flex-col items-center md:items-end justify-between gap-3 border-t md:border-t-0 pt-3 md:pt-0 border-slate-100">
                <div className="text-right">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block">Monto Cobrado</span>
                  <span className="text-base font-bold text-slate-900 font-mono">
                    ${srv.cost.toLocaleString('es-AR')}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onOpenCertificateForService(srv)}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 rounded-xl text-xs font-semibold transition-colors cursor-pointer"
                  >
                    <Award className="w-3.5 h-3.5" />
                    <span>Ver Certificado</span>
                  </button>

                  <button
                    onClick={() => {
                      if (confirm('¿Desea eliminar este registro de servicio?')) {
                        onDeleteService(srv.id);
                      }
                    }}
                    className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                    title="Eliminar orden"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* New Service Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
          <div 
            className="bg-white rounded-2xl w-full max-w-xl max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200 flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-5 border-b border-slate-200 flex items-center justify-between bg-slate-50">
              <div>
                <h3 className="font-bold text-slate-900 text-sm">
                  Registrar Servicio de Fumigación
                </h3>
                <p className="text-xs text-slate-500">
                  Emitido por {fumigador.companyName} (Matrícula {fumigador.matricula})
                </p>
              </div>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSave} className="p-6 space-y-4">
              {/* Select Client */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Cliente / Destinatario del Servicio *
                </label>
                <select
                  value={clientId}
                  onChange={(e) => setClientId(e.target.value)}
                  required
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  {clients.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name} — {c.address} ({c.propertyType})
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Fecha de Aplicación *
                  </label>
                  <input
                    type="date"
                    required
                    value={serviceDate}
                    onChange={(e) => setServiceDate(e.target.value)}
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Tiempo de Ventilación / Carencia (Horas)
                  </label>
                  <input
                    type="number"
                    min={0}
                    max={24}
                    value={safetyHours}
                    onChange={(e) => setSafetyHours(Number(e.target.value))}
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>

              {/* Chemical Products Presets */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Producto Químico / Principio Activo
                </label>
                <select
                  value={chemical}
                  onChange={(e) => setChemical(e.target.value)}
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 mb-2"
                >
                  {CHEMICAL_PRESETS.map((chem, idx) => (
                    <option key={idx} value={chem}>{chem}</option>
                  ))}
                </select>
                <input
                  type="text"
                  value={chemical}
                  onChange={(e) => setChemical(e.target.value)}
                  placeholder="O ingresa un producto personalizado..."
                  className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs text-slate-800"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Dosis y Técnica de Aplicación
                </label>
                <input
                  type="text"
                  value={dosage}
                  onChange={(e) => setDosage(e.target.value)}
                  placeholder="ej. Pulverización manual con gota fina + colocación de 12 puntos de gel"
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Monto Cobrado (ARS $)
                  </label>
                  <input
                    type="number"
                    min={0}
                    step={500}
                    value={cost}
                    onChange={(e) => setCost(Number(e.target.value))}
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Estado del Pago
                  </label>
                  <select
                    value={paymentStatus}
                    onChange={(e) => setPaymentStatus(e.target.value as any)}
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  >
                    <option value="cobrado">Cobrado / Pagado</option>
                    <option value="pendiente">Pendiente de Cobro</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Próxima Fecha de Refuerzo Sugerida (Actualiza estado del cliente)
                </label>
                <input
                  type="date"
                  value={nextDate}
                  onChange={(e) => setNextDate(e.target.value)}
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Observaciones Técnicas y Recomendaciones
                </label>
                <textarea
                  rows={2}
                  value={observations}
                  onChange={(e) => setObservations(e.target.value)}
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div className="pt-2 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-medium cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-semibold shadow-md shadow-emerald-700/20 cursor-pointer"
                >
                  Guardar y Emitir Certificado
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
