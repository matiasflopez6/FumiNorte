import React from 'react';
import { FumigadorAccount, ClientItem, ServiceRecord } from '../../types';
import { Users, DollarSign, CalendarCheck, Clock, TrendingUp, AlertTriangle, Building, ShieldCheck, Bug } from 'lucide-react';

interface MetricsDashboardProps {
  fumigador: FumigadorAccount;
  clients: ClientItem[];
  services: ServiceRecord[];
}

export const MetricsDashboard: React.FC<MetricsDashboardProps> = ({
  fumigador,
  clients,
  services
}) => {
  // Financial computations
  const totalBilled = services.reduce((acc, s) => acc + (s.cost || 0), 0);
  const totalCobrado = services.filter(s => s.paymentStatus === 'cobrado').reduce((acc, s) => acc + (s.cost || 0), 0);
  const totalPendiente = services.filter(s => s.paymentStatus === 'pendiente').reduce((acc, s) => acc + (s.cost || 0), 0);

  // Clients with pending booster
  const pendingBoosterClients = clients.filter(c => c.status === 'refuerzo_pendiente');

  // Property types count
  const propertyCounts: Record<string, number> = {};
  clients.forEach(c => {
    propertyCounts[c.propertyType] = (propertyCounts[c.propertyType] || 0) + 1;
  });

  // Pests treated count
  const pestCounts: Record<string, number> = {};
  services.forEach(s => {
    s.pestsTreated.forEach(p => {
      pestCounts[p] = (pestCounts[p] || 0) + 1;
    });
  });

  return (
    <div className="space-y-6">
      {/* Welcome header */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900">Métricas y Rendimiento Operativo</h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Estadísticas consolidadas de tu cartera para <span className="font-semibold text-slate-700">{fumigador.companyName}</span>.
          </p>
        </div>
        <div className="text-xs text-slate-500 bg-slate-50 px-3.5 py-2 rounded-xl border border-slate-200">
          Matrícula: <span className="font-mono font-bold text-slate-800">{fumigador.matricula}</span>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-slate-500">Total Clientes</span>
            <div className="p-2 bg-emerald-50 text-emerald-600 rounded-xl">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-slate-900">{clients.length}</div>
          <p className="text-[11px] text-slate-500 mt-1">
            {clients.filter(c => c.status === 'al_dia').length} con servicios al día
          </p>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-slate-500">Servicios Realizados</span>
            <div className="p-2 bg-blue-50 text-blue-600 rounded-xl">
              <CalendarCheck className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-slate-900">{services.length}</div>
          <p className="text-[11px] text-slate-500 mt-1">
            Certificados emitidos en total
          </p>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-slate-500">Facturación Cobrada</span>
            <div className="p-2 bg-emerald-50 text-emerald-600 rounded-xl">
              <DollarSign className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-emerald-700 font-mono">
            ${totalCobrado.toLocaleString('es-AR')}
          </div>
          <p className="text-[11px] text-slate-500 mt-1">
            ${totalPendiente.toLocaleString('es-AR')} pendientes de cobro
          </p>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-slate-500">Refuerzos Pendientes</span>
            <div className="p-2 bg-amber-50 text-amber-600 rounded-xl">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-amber-600">
            {pendingBoosterClients.length}
          </div>
          <p className="text-[11px] text-slate-500 mt-1">
            Clientes para contactar por WhatsApp
          </p>
        </div>
      </div>

      {/* Breakdowns */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Inmuebles Breakdown */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
          <h3 className="font-bold text-sm text-slate-900 mb-4 flex items-center gap-2">
            <Building className="w-4 h-4 text-emerald-600" />
            <span>Distribución por Tipo de Inmueble</span>
          </h3>

          <div className="space-y-3">
            {Object.keys(propertyCounts).length === 0 ? (
              <p className="text-xs text-slate-400">Sin datos de inmuebles</p>
            ) : (
              Object.entries(propertyCounts).map(([type, count]) => {
                const percentage = Math.round((count / (clients.length || 1)) * 100);
                return (
                  <div key={type} className="space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <span className="capitalize font-medium text-slate-700">{type}</span>
                      <span className="font-bold text-slate-900">{count} ({percentage}%)</span>
                    </div>
                    <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                      <div 
                        className="bg-emerald-600 h-full rounded-full transition-all"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Pests Breakdown */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
          <h3 className="font-bold text-sm text-slate-900 mb-4 flex items-center gap-2">
            <Bug className="w-4 h-4 text-emerald-600" />
            <span>Plagas Más Frecuentes en Tratamientos</span>
          </h3>

          <div className="space-y-3">
            {Object.keys(pestCounts).length === 0 ? (
              <p className="text-xs text-slate-400">Sin datos de plagas tratadas aún</p>
            ) : (
              Object.entries(pestCounts).map(([pest, count]) => {
                const percentage = Math.round((count / (services.length || 1)) * 100);
                return (
                  <div key={pest} className="space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-medium text-slate-700">{pest}</span>
                      <span className="font-bold text-slate-900">{count} veces</span>
                    </div>
                    <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                      <div 
                        className="bg-teal-600 h-full rounded-full transition-all"
                        style={{ width: `${Math.min(percentage, 100)}%` }}
                      />
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
