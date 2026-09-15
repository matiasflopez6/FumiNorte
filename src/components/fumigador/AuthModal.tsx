import React, { useState } from 'react';
import { FumigadorAccount, SubscriptionPlanType } from '../../types';
import { storageService } from '../../services/storageService';
import { SUBSCRIPTION_PLANS, SALTA_ZONES } from '../../data/subscriptionPlans';
import { FumiNorteLogo } from '../common/FumiNorteLogo';
import { 
  UserCheck, 
  Shield, 
  KeyRound, 
  Building2, 
  Phone, 
  MapPin, 
  Mail, 
  Award, 
  ArrowRight, 
  Sparkles, 
  CheckCircle2, 
  CreditCard,
  Lock
} from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (account: FumigadorAccount) => void;
  initialMode?: 'login' | 'register';
  preSelectedPlan?: SubscriptionPlanType;
}

export const AuthModal: React.FC<AuthModalProps> = ({ 
  isOpen, 
  onClose, 
  onLoginSuccess,
  initialMode = 'login',
  preSelectedPlan = 'semestral'
}) => {
  const [mode, setMode] = useState<'login' | 'register'>(initialMode);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Login form
  const [loginEmail, setLoginEmail] = useState('facundo@fumigacionesnorte.com');
  const [loginPassword, setLoginPassword] = useState('password123');

  // Register form
  const [regName, setRegName] = useState('');
  const [regCompany, setRegCompany] = useState('');
  const [regMatricula, setRegMatricula] = useState('');
  const [regPhone, setRegPhone] = useState('');
  const [regZone, setRegZone] = useState('Salta Capital (Centro, Macrocentro)');
  const [regEmail, setRegEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regPlan, setRegPlan] = useState<SubscriptionPlanType>(preSelectedPlan);

  if (!isOpen) return null;

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const account = storageService.login(loginEmail, loginPassword);
      setLoading(false);
      onLoginSuccess(account);
      onClose();
    } catch (err: any) {
      setLoading(false);
      setError(err.message || 'Error al iniciar sesión');
    }
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!regName.trim() || !regCompany.trim() || !regEmail.trim() || !regPassword.trim()) {
      setError('Por favor complete todos los campos obligatorios.');
      return;
    }

    setLoading(true);
    try {
      const account = storageService.registerFumigador({
        fullName: regName.trim(),
        companyName: regCompany.trim(),
        matricula: regMatricula.trim() || 'MP-SALTA-' + Math.floor(1000 + Math.random() * 9000),
        phone: regPhone.trim() || '+54 387 400 0000',
        cityZone: regZone.trim() || 'Salta Capital',
        email: regEmail.trim(),
        password: regPassword,
        specialties: ['Cucarachas', 'Alacranes', 'Dengue', 'Desinfección Salta']
      }, regPlan);
      
      setLoading(false);
      onLoginSuccess(account);
      onClose();
    } catch (err: any) {
      setLoading(false);
      setError(err.message || 'Error al registrar la cuenta');
    }
  };

  const handleQuickDemo = (email: string) => {
    try {
      const account = storageService.login(email);
      onLoginSuccess(account);
      onClose();
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-900 via-slate-900 to-slate-950 text-white p-6 relative">
          <button 
            onClick={onClose}
            aria-label="Cerrar modal"
            className="absolute top-4 right-4 text-white/70 hover:text-white bg-white/10 hover:bg-white/20 p-2 rounded-full transition-colors cursor-pointer"
          >
            ✕
          </button>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-slate-900/90 border border-slate-700/80 rounded-2xl">
              <FumiNorteLogo variant="icon" size="sm" theme="dark" />
            </div>
            <div>
              <span className="text-xs uppercase tracking-widest font-black text-emerald-400">
                FumiNorte • Control de Plagas
              </span>
              <h2 className="text-xl font-black text-white">
                {mode === 'login' ? 'Acceso a Panel de Fumigador de Salta' : 'Registro de Empresa / Fumigador en Salta'}
              </h2>
            </div>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed">
            Plataforma oficial para fumigadores de la Provincia de Salta. Base de datos privada y emisión de certificados reglamentarios.
          </p>

          {/* Tab Switcher */}
          <div className="flex mt-4 p-1 bg-white/10 rounded-xl border border-white/10">
            <button
              type="button"
              onClick={() => { setMode('login'); setError(null); }}
              className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                mode === 'login' 
                  ? 'bg-emerald-500 text-slate-950 shadow-md' 
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              Iniciar Sesión
            </button>
            <button
              type="button"
              onClick={() => { setMode('register'); setError(null); }}
              className={`flex-1 py-2 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                mode === 'register' 
                  ? 'bg-emerald-500 text-slate-950 shadow-md' 
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              Registrar Fumigador
            </button>
          </div>
        </div>

        {/* Body Content */}
        <div className="p-6 overflow-y-auto space-y-5 flex-1">
          {error && (
            <div className="p-3.5 bg-rose-50 border border-rose-200 text-rose-700 text-xs font-medium rounded-xl flex items-center gap-2">
              <span className="text-rose-500 font-bold">⚠️</span>
              <span>{error}</span>
            </div>
          )}

          {mode === 'login' ? (
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Correo Electrónico del Fumigador
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="email"
                    required
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    placeholder="ej. facundo@fumigacionesnorte.com"
                    className="w-full pl-9 pr-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Contraseña
                </label>
                <div className="relative">
                  <KeyRound className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="password"
                    required
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-9 pr-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 px-4 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-emerald-700/20 flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                {loading ? 'Ingresando a Salta...' : (
                  <>
                    <span>Entrar a mi Base de Datos de Salta</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

              {/* Quick Demo Switcher with Salta Accounts */}
              <div className="pt-3 border-t border-slate-100">
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                  <span className="text-[11px] font-bold text-slate-600 uppercase tracking-wider">
                    Cuentas de demostración en Salta:
                  </span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => handleQuickDemo('facundo@fumigacionesnorte.com')}
                    className="p-2.5 text-left border border-slate-200 hover:border-emerald-500 bg-slate-50 hover:bg-emerald-50/50 rounded-xl transition-all group cursor-pointer"
                  >
                    <div className="font-bold text-xs text-slate-800 group-hover:text-emerald-700 truncate">
                      Facundo Saravia
                    </div>
                    <div className="text-[10px] text-emerald-700 font-semibold">
                      Plan Semestral (Activo)
                    </div>
                    <div className="text-[10px] text-slate-500 truncate">
                      Salta Cap. & San Lorenzo
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleQuickDemo('valeria@biosalta.com')}
                    className="p-2.5 text-left border border-slate-200 hover:border-emerald-500 bg-slate-50 hover:bg-emerald-50/50 rounded-xl transition-all group cursor-pointer"
                  >
                    <div className="font-bold text-xs text-slate-800 group-hover:text-emerald-700 truncate">
                      Dra. Valeria Figueroa
                    </div>
                    <div className="text-[10px] text-emerald-700 font-semibold">
                      Plan Mensual (Activo)
                    </div>
                    <div className="text-[10px] text-slate-500 truncate">
                      Valle de Lerma & Cafayate
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleQuickDemo('gaston@desinfeccionessalta.com')}
                    className="p-2.5 text-left border border-amber-300 hover:border-amber-500 bg-amber-50/40 hover:bg-amber-50 rounded-xl transition-all group cursor-pointer"
                  >
                    <div className="font-bold text-xs text-slate-800 group-hover:text-amber-800 truncate">
                      Gastón Albarracín
                    </div>
                    <div className="text-[10px] text-amber-800 font-bold flex items-center gap-1">
                      <Lock className="w-2.5 h-2.5" />
                      <span>Sin Suscripción</span>
                    </div>
                    <div className="text-[10px] text-slate-500 truncate">
                      Probar bloqueo y pago
                    </div>
                  </button>
                </div>
              </div>
            </form>
          ) : (
            <form onSubmit={handleRegisterSubmit} className="space-y-3.5">
              {/* Plan selector during registration */}
              <div>
                <label className="block text-xs font-bold uppercase text-slate-700 mb-1.5">
                  Elegí tu Plan de Suscripción Inicial:
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {SUBSCRIPTION_PLANS.map((plan) => (
                    <button
                      type="button"
                      key={plan.id}
                      onClick={() => setRegPlan(plan.id)}
                      className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                        regPlan === plan.id
                          ? 'border-emerald-600 bg-emerald-50/70 ring-1 ring-emerald-600'
                          : 'border-slate-200 bg-slate-50/50 hover:bg-slate-100'
                      }`}
                    >
                      <span className="text-[11px] font-bold block text-slate-800">
                        {plan.name}
                      </span>
                      <span className="text-xs font-black text-emerald-700 font-mono block">
                        ${plan.price.toLocaleString('es-AR')}
                      </span>
                      <span className="text-[9px] text-slate-500 block">
                        {plan.periodText}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Tu Nombre y Apellido *
                  </label>
                  <div className="relative">
                    <UserCheck className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                    <input
                      type="text"
                      required
                      value={regName}
                      onChange={(e) => setRegName(e.target.value)}
                      placeholder="ej. Carlos Saravia"
                      className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Nombre Comercial / Empresa en Salta *
                  </label>
                  <div className="relative">
                    <Building2 className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                    <input
                      type="text"
                      required
                      value={regCompany}
                      onChange={(e) => setRegCompany(e.target.value)}
                      placeholder="ej. Control Ambiental Salta SRL"
                      className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Matrícula / Habilitación Bromatología Salta
                  </label>
                  <div className="relative">
                    <Award className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                    <input
                      type="text"
                      value={regMatricula}
                      onChange={(e) => setRegMatricula(e.target.value)}
                      placeholder="ej. MP-SALTA-3490"
                      className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Teléfono / WhatsApp en Salta
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                    <input
                      type="tel"
                      value={regPhone}
                      onChange={(e) => setRegPhone(e.target.value)}
                      placeholder="+54 387 455 6677"
                      className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Zona Principal en la Provincia de Salta
                </label>
                <div className="relative">
                  <MapPin className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                  <select
                    value={regZone}
                    onChange={(e) => setRegZone(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  >
                    {SALTA_ZONES.map((zone, idx) => (
                      <option key={idx} value={zone}>{zone}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Correo Electrónico *
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                    <input
                      type="email"
                      required
                      value={regEmail}
                      onChange={(e) => setRegEmail(e.target.value)}
                      placeholder="fumigador@salta.com"
                      className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Crear Contraseña *
                  </label>
                  <div className="relative">
                    <KeyRound className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                    <input
                      type="password"
                      required
                      value={regPassword}
                      onChange={(e) => setRegPassword(e.target.value)}
                      placeholder="Mínimo 6 caracteres"
                      className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                </div>
              </div>

              <div className="p-3 bg-emerald-50/70 border border-emerald-200/60 rounded-xl text-[11px] text-emerald-800 flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>
                  Tu cuenta incluirá la base de datos aislada para clientes de Salta y la habilitación de tu <strong>{SUBSCRIPTION_PLANS.find(p => p.id === regPlan)?.name}</strong> para emitir certificados oficiales.
                </span>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 px-4 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-emerald-700/20 flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                {loading ? 'Registrando en Salta...' : (
                  <>
                    <span>Confirmar Registro y Empezar</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
