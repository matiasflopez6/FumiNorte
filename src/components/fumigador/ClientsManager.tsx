import React, { useState, useMemo } from 'react';
import { ClientItem, PropertyType, FumigadorAccount } from '../../types';
import { 
  Search, Plus, Phone, MessageSquare, MapPin, Building, Home, Utensils, 
  Warehouse, Calendar, AlertCircle, CheckCircle2, Clock, Trash2, Edit, 
  FileText, Award, ShieldAlert, Sparkles, X
} from 'lucide-react';

interface ClientsManagerProps {
  fumigador: FumigadorAccount;
  clients: ClientItem[];
  onSaveClient: (clientData: Omit<ClientItem, 'id' | 'fumigadorId' | 'createdAt'>, existingId?: string) => void;
  onDeleteClient: (clientId: string) => void;
  onOpenNewService: (client: ClientItem) => void;
  onOpenCertificate: (client: ClientItem) => void;
}

const PROPERTY_TYPES: { id: PropertyType; label: string; icon: any }[] = [
  { id: 'residencial', label: 'Residencial / Casa', icon: Home },
  { id: 'consorcio', label: 'Consorcio / Edificio', icon: Building },
  { id: 'gastronomia', label: 'Gastronómico / Bar', icon: Utensils },
  { id: 'comercial', label: 'Comercio / Local', icon: Building },
  { id: 'industrial', label: 'Industria / Depósito', icon: Warehouse }
];

const COMMON_PESTS = [
  'Cucarachas (Blattella/Periplaneta)', 'Alacranes (Tityus)', 'Mosquitos (Dengue)', 
  'Vinchucas (Chagas)', 'Roedores / Ratas', 'Hormigas mineras', 'Barigüí y Jejenes', 
  'Moscas', 'Palomas', 'Termitas'
];

export const ClientsManager: React.FC<ClientsManagerProps> = ({
  fumigador,
  clients,
  onSaveClient,
  onDeleteClient,
  onOpenNewService,
  onOpenCertificate
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingClient, setEditingClient] = useState<ClientItem | null>(null);

  // Form State
  const [formName, setFormName] = useState('');
  const [formPhone, setFormPhone] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [formAddress, setFormAddress] = useState('');
  const [formLocality, setFormLocality] = useState('');
  const [formType, setFormType] = useState<PropertyType>('residencial');
  const [formPests, setFormPests] = useState<string[]>(['Cucarachas']);
  const [formNextService, setFormNextService] = useState('');
  const [formNotes, setFormNotes] = useState('');

  const openNewClientModal = () => {
    setEditingClient(null);
    setFormName('');
    setFormPhone('');
    setFormEmail('');
    setFormAddress('');
    setFormLocality(fumigador.cityZone.split(',')[0] || 'Salta Capital');
    setFormType('residencial');
    setFormPests(['Cucarachas']);
    setFormNextService('');
    setFormNotes('');
    setIsModalOpen(true);
  };

  const openEditClientModal = (client: ClientItem) => {
    setEditingClient(client);
    setFormName(client.name);
    setFormPhone(client.phone);
    setFormEmail(client.email || '');
    setFormAddress(client.address);
    setFormLocality(client.locality);
    setFormType(client.propertyType);
    setFormPests(client.frequentPest);
    setFormNextService(client.nextServiceDate || '');
    setFormNotes(client.notes || '');
    setIsModalOpen(true);
  };

  const togglePestSelection = (pest: string) => {
    if (formPests.includes(pest)) {
      setFormPests(formPests.filter(p => p !== pest));
    } else {
      setFormPests([...formPests, pest]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim() || !formAddress.trim()) return;

    onSaveClient(
      {
        name: formName.trim(),
        phone: formPhone.trim() || '+54 11 0000 0000',
        email: formEmail.trim() || undefined,
        address: formAddress.trim(),
        locality: formLocality.trim() || 'Salta Capital',
        propertyType: formType,
        frequentPest: formPests.length > 0 ? formPests : ['Control general'],
        status: formNextService && new Date(formNextService) < new Date() ? 'refuerzo_pendiente' : 'al_dia',
        nextServiceDate: formNextService || undefined,
        notes: formNotes.trim() || undefined
      },
      editingClient ? editingClient.id : undefined
    );

    setIsModalOpen(false);
  };

  // Filtered clients
  const filteredClients = useMemo(() => {
    return clients.filter((c) => {
      const matchesSearch = 
        c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.locality.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.phone.includes(searchTerm) ||
        c.frequentPest.some(p => p.toLowerCase().includes(searchTerm.toLowerCase()));

      const matchesType = selectedType === 'all' || c.propertyType === selectedType;
      const matchesStatus = selectedStatus === 'all' || c.status === selectedStatus;

      return matchesSearch && matchesType && matchesStatus;
    });
  }, [clients, searchTerm, selectedType, selectedStatus]);

  const sendWhatsAppReminder = (client: ClientItem) => {
    const cleanPhone = client.phone.replace(/[^0-9]/g, '');
    const message = encodeURIComponent(
      `Hola ${client.name}! Te escribimos de ${fumigador.companyName}. Te recordamos coordinar el próximo servicio de control de plagas y fumigación periódica para el inmueble en ${client.address}. ¿Cuándo te resultaría conveniente que pasemos? Saludos cordiales!`
    );
    window.open(`https://wa.me/${cleanPhone}?text=${message}`, '_blank');
  };

  return (
    <div className="space-y-6">
      {/* Top Banner / Actions Bar */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold text-slate-900">Base de Datos de Clientes</h2>
            <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-2.5 py-0.5 rounded-full">
              {clients.length} registrados
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Gestión privada para <span className="font-semibold text-slate-700">{fumigador.companyName}</span>. Ningún otro fumigador tiene acceso a tus contactos.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={openNewClientModal}
            className="flex items-center gap-2 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs rounded-xl shadow-md shadow-emerald-700/20 transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Nuevo Cliente</span>
          </button>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-sm space-y-3">
        <div className="flex flex-col sm:flex-row gap-3">
          {/* Search bar */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Buscar por nombre, dirección, plaga o teléfono..."
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all"
            />
          </div>

          {/* Type filter */}
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-700 font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
          >
            <option value="all">Todos los Inmuebles</option>
            <option value="residencial">Residencial</option>
            <option value="consorcio">Consorcio / Edificio</option>
            <option value="gastronomia">Gastronomía</option>
            <option value="comercial">Comercio</option>
            <option value="industrial">Industria</option>
          </select>

          {/* Status filter */}
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-700 font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
          >
            <option value="all">Todos los Estados</option>
            <option value="al_dia">Al Día</option>
            <option value="refuerzo_pendiente">Refuerzo Pendiente</option>
          </select>
        </div>
      </div>

      {/* Clients List */}
      {filteredClients.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 border border-slate-200/80 text-center shadow-sm">
          <div className="w-14 h-14 mx-auto mb-3 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
            <Sparkles className="w-7 h-7" />
          </div>
          <h3 className="text-base font-bold text-slate-800 mb-1">
            {searchTerm ? 'No se encontraron clientes para esta búsqueda' : 'Tu base de datos está vacía'}
          </h3>
          <p className="text-xs text-slate-500 max-w-md mx-auto mb-5">
            {searchTerm 
              ? 'Prueba modificando los filtros de búsqueda o tipo de inmueble.' 
              : 'Empieza registrando tu primer cliente residencial, gastronómico o consorcio para tener su historial de tratamientos siempre a mano.'}
          </p>
          <button
            onClick={openNewClientModal}
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs rounded-xl shadow-md transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Agregar Primer Cliente</span>
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredClients.map((client) => {
            const isPending = client.status === 'refuerzo_pendiente';
            const PropIcon = PROPERTY_TYPES.find(p => p.id === client.propertyType)?.icon || Home;

            return (
              <div 
                key={client.id}
                className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group"
              >
                <div>
                  {/* Top row: Property Type badge & Status */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-slate-100 text-slate-700 rounded-lg text-[11px] font-semibold capitalize">
                      <PropIcon className="w-3.5 h-3.5 text-slate-500" />
                      {client.propertyType}
                    </span>

                    {isPending ? (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-amber-50 border border-amber-200 text-amber-700 rounded-full text-[10px] font-bold">
                        <Clock className="w-3 h-3 text-amber-500" />
                        Refuerzo Sugerido
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-emerald-50 border border-emerald-200 text-emerald-700 rounded-full text-[10px] font-bold">
                        <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                        Al Día
                      </span>
                    )}
                  </div>

                  {/* Client Name */}
                  <h3 className="font-bold text-slate-900 text-sm mb-1 group-hover:text-emerald-700 transition-colors">
                    {client.name}
                  </h3>

                  {/* Address & Locality */}
                  <div className="flex items-start gap-1.5 text-xs text-slate-500 mb-2">
                    <MapPin className="w-3.5 h-3.5 text-slate-400 mt-0.5 shrink-0" />
                    <span>{client.address}, {client.locality}</span>
                  </div>

                  {/* Phone */}
                  <div className="flex items-center gap-1.5 text-xs text-slate-600 mb-3 font-mono">
                    <Phone className="w-3.5 h-3.5 text-slate-400" />
                    <span>{client.phone}</span>
                  </div>

                  {/* Plagas frecuentes */}
                  <div className="mb-3">
                    <div className="text-[10px] uppercase font-bold tracking-wider text-slate-400 mb-1">
                      Plagas Tratadas
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {client.frequentPest.map((pest, idx) => (
                        <span 
                          key={idx}
                          className="px-2 py-0.5 bg-slate-100 text-slate-700 rounded text-[10px] font-medium"
                        >
                          {pest}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Notes if any */}
                  {client.notes && (
                    <p className="text-[11px] text-slate-500 bg-slate-50 p-2 rounded-lg border border-slate-100 mb-3 italic">
                      "{client.notes}"
                    </p>
                  )}
                </div>

                {/* Bottom Action Footer */}
                <div className="pt-3 border-t border-slate-100 space-y-2">
                  <div className="flex items-center justify-between text-[11px] text-slate-500 mb-1">
                    <span>Último servicio:</span>
                    <span className="font-semibold text-slate-700">
                      {client.lastServiceDate || 'Sin registro'}
                    </span>
                  </div>

                  {/* Action buttons */}
                  <div className="grid grid-cols-2 gap-1.5">
                    <button
                      onClick={() => onOpenNewService(client)}
                      className="flex items-center justify-center gap-1.5 py-1.5 px-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 rounded-lg text-xs font-semibold transition-colors cursor-pointer"
                    >
                      <FileText className="w-3.5 h-3.5" />
                      <span>+ Orden</span>
                    </button>

                    <button
                      onClick={() => onOpenCertificate(client)}
                      className="flex items-center justify-center gap-1.5 py-1.5 px-2 bg-teal-50 hover:bg-teal-100 text-teal-700 rounded-lg text-xs font-semibold transition-colors cursor-pointer"
                    >
                      <Award className="w-3.5 h-3.5" />
                      <span>Certificado</span>
                    </button>
                  </div>

                  <div className="flex items-center justify-between pt-1">
                    <button
                      onClick={() => sendWhatsAppReminder(client)}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-600 hover:text-emerald-700 cursor-pointer"
                      title="Enviar recordatorio o mensaje por WhatsApp"
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>Avisar WhatsApp</span>
                    </button>

                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => openEditClientModal(client)}
                        className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
                        title="Editar datos del cliente"
                      >
                        <Edit className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => {
                          if (confirm(`¿Eliminar a "${client.name}" de tu base de datos?`)) {
                            onDeleteClient(client.id);
                          }
                        }}
                        className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                        title="Eliminar cliente"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* New / Edit Client Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
          <div 
            className="bg-white rounded-2xl w-full max-w-xl max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200 flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-5 border-b border-slate-200 flex items-center justify-between bg-slate-50">
              <div>
                <h3 className="font-bold text-slate-900 text-sm">
                  {editingClient ? 'Editar Cliente' : 'Registrar Nuevo Cliente'}
                </h3>
                <p className="text-xs text-slate-500">
                  Se guardará exclusivamente en la base de datos de {fumigador.companyName}
                </p>
              </div>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Nombre del Cliente o Consorcio *
                </label>
                <input
                  type="text"
                  required
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  placeholder="ej. Juan Pérez o Edificio Libertador 2200"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Teléfono / WhatsApp *
                  </label>
                  <input
                    type="tel"
                    required
                    value={formPhone}
                    onChange={(e) => setFormPhone(e.target.value)}
                    placeholder="+54 9 11 2345 6789"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Email de Contacto (Opcional)
                  </label>
                  <input
                    type="email"
                    value={formEmail}
                    onChange={(e) => setFormEmail(e.target.value)}
                    placeholder="cliente@correo.com"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Dirección del Inmueble *
                  </label>
                  <input
                    type="text"
                    required
                    value={formAddress}
                    onChange={(e) => setFormAddress(e.target.value)}
                    placeholder="ej. Av. Cabildo 1540 4to A"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Localidad / Barrio *
                  </label>
                  <input
                    type="text"
                    required
                    value={formLocality}
                    onChange={(e) => setFormLocality(e.target.value)}
                    placeholder="ej. Belgrano, San Isidro, Morón"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Tipo de Inmueble
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {PROPERTY_TYPES.map((pt) => {
                    const Icon = pt.icon;
                    return (
                      <button
                        key={pt.id}
                        type="button"
                        onClick={() => setFormType(pt.id)}
                        className={`flex items-center gap-1.5 p-2 rounded-xl border text-xs font-medium transition-all ${
                          formType === pt.id
                            ? 'bg-emerald-50 border-emerald-500 text-emerald-800'
                            : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                        }`}
                      >
                        <Icon className="w-3.5 h-3.5" />
                        <span>{pt.label.split('/')[0]}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Plagas Frecuentes / Tratadas
                </label>
                <div className="flex flex-wrap gap-1.5">
                  {COMMON_PESTS.map((pest) => {
                    const selected = formPests.includes(pest);
                    return (
                      <button
                        key={pest}
                        type="button"
                        onClick={() => togglePestSelection(pest)}
                        className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
                          selected
                            ? 'bg-emerald-600 text-white shadow-xs'
                            : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                        }`}
                      >
                        {selected ? '✓ ' : '+ '}{pest}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Próxima Fecha de Refuerzo / Re-fumigación
                </label>
                <input
                  type="date"
                  value={formNextService}
                  onChange={(e) => setFormNextService(e.target.value)}
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Notas Técnicas (Productos habituales, mascotas, accesos)
                </label>
                <textarea
                  rows={2}
                  value={formNotes}
                  onChange={(e) => setFormNotes(e.target.value)}
                  placeholder="ej. Tienen perros pequeños. Usar únicamente gel en cocina y cebaderas con traba de seguridad en jardín."
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
                  {editingClient ? 'Guardar Cambios' : 'Registrar Cliente'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
