import React, { useState, useRef } from 'react';
import { FumigadorAccount, ClientItem, ServiceRecord } from '../../types';
import { storageService } from '../../services/storageService';
import { Database, Download, Upload, ShieldCheck, CheckCircle2, AlertTriangle, RefreshCw } from 'lucide-react';

interface BackupManagerProps {
  fumigador: FumigadorAccount;
  clients: ClientItem[];
  services: ServiceRecord[];
  onDataImported: () => void;
}

export const BackupManager: React.FC<BackupManagerProps> = ({
  fumigador,
  clients,
  services,
  onDataImported
}) => {
  const [importStatus, setImportStatus] = useState<{ success?: boolean; message?: string } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleExport = () => {
    const jsonStr = storageService.exportDatabase(fumigador.id);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    const safeName = fumigador.companyName.replace(/[^a-zA-Z0-9]/g, '_').toLowerCase();
    link.href = url;
    link.download = `fumibug_backup_${safeName}_${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (evt) => {
      try {
        const content = evt.target?.result as string;
        const result = storageService.importDatabase(fumigador.id, content);
        setImportStatus({
          success: true,
          message: `¡Base de datos importada exitosamente! Se restauraron ${result.clientsCount} clientes y ${result.servicesCount} órdenes de servicio.`
        });
        onDataImported();
      } catch (err: any) {
        setImportStatus({
          success: false,
          message: err.message || 'Error al procesar el archivo JSON.'
        });
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2.5 bg-emerald-50 text-emerald-600 rounded-xl">
            <Database className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900">Base de Datos y Copias de Seguridad</h2>
            <p className="text-xs text-slate-500">
              Control de almacenamiento privado para <span className="font-semibold text-slate-700">{fumigador.companyName}</span>.
            </p>
          </div>
        </div>

        <div className="p-4 bg-emerald-50/70 border border-emerald-200/80 rounded-xl text-xs text-emerald-900 mt-4 flex items-start gap-3">
          <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <p className="font-bold">Aislamiento de Datos por Cuenta de Fumigador</p>
            <p className="text-emerald-800">
              Tus clientes, teléfonos, direcciones y órdenes de trabajo están enlazados exclusivamente al identificador único de tu cuenta (<code className="font-mono bg-emerald-100 px-1 py-0.5 rounded text-[11px]">{fumigador.id}</code>). Otros fumigadores que utilicen la plataforma no pueden ver ni modificar tu base de datos.
            </p>
          </div>
        </div>
      </div>

      {importStatus && (
        <div className={`p-4 rounded-2xl border text-xs font-medium flex items-center gap-3 ${
          importStatus.success
            ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
            : 'bg-rose-50 border-rose-200 text-rose-800'
        }`}>
          {importStatus.success ? (
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
          ) : (
            <AlertTriangle className="w-5 h-5 text-rose-600 shrink-0" />
          )}
          <span>{importStatus.message}</span>
        </div>
      )}

      {/* Export & Import Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Export Card */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-sm flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
              <Download className="w-4 h-4 text-emerald-600" />
              <span>Exportar Copia de Seguridad (Backup)</span>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed">
              Descarga un archivo JSON estructurado con todos tus clientes ({clients.length}), historial de tratamientos ({services.length}) y datos de tu empresa. Puedes guardarlo en tu computadora o enviártelo por email.
            </p>
            <div className="bg-slate-50 p-3 rounded-xl border border-slate-100 text-[11px] text-slate-600">
              <span className="font-bold block mb-1 text-slate-700">Contenido a exportar:</span>
              <span>• {clients.length} Clientes con teléfonos y direcciones</span><br />
              <span>• {services.length} Órdenes de trabajo y certificados emitidos</span>
            </div>
          </div>

          <div className="pt-6">
            <button
              onClick={handleExport}
              className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs rounded-xl shadow-md shadow-emerald-700/20 transition-all cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>Descargar Archivo de Respaldo (.json)</span>
            </button>
          </div>
        </div>

        {/* Import Card */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-sm flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center gap-2 font-bold text-slate-900 text-sm">
              <Upload className="w-4 h-4 text-emerald-600" />
              <span>Importar / Restaurar Base de Datos</span>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed">
              Si cambias de dispositivo o tienes un archivo de respaldo previo, puedes cargarlo aquí. Los datos se incorporarán directamente a tu espacio de trabajo.
            </p>

            <input
              type="file"
              accept=".json"
              ref={fileInputRef}
              onChange={handleFileChange}
              className="hidden"
            />

            <div 
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-slate-200 hover:border-emerald-500 bg-slate-50 hover:bg-emerald-50/40 p-6 rounded-2xl text-center cursor-pointer transition-all"
            >
              <Upload className="w-8 h-8 text-slate-400 mx-auto mb-2" />
              <span className="text-xs font-semibold text-slate-700 block">
                Haz clic para seleccionar archivo de respaldo
              </span>
              <span className="text-[11px] text-slate-400">
                Formato admitido: .JSON
              </span>
            </div>
          </div>

          <div className="pt-4">
            <button
              onClick={() => fileInputRef.current?.click()}
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs rounded-xl transition-all cursor-pointer"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Seleccionar archivo desde el equipo</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
