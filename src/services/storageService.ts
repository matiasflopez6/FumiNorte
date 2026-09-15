import { FumigadorAccount, ClientItem, ServiceRecord, SubscriptionPlanType, SubscriptionInfo } from '../types';
import { SUBSCRIPTION_PLANS } from '../data/subscriptionPlans';

const ACCOUNTS_KEY = 'fumisalta_accounts_v2';
const CURRENT_USER_KEY = 'fumisalta_current_user_v2';

// Initial pre-seeded demo fumigadores for Salta
const DEMO_ACCOUNTS: FumigadorAccount[] = [
  {
    id: 'fumi-salta-001',
    email: 'facundo@fumigacionesnorte.com',
    password: 'password123',
    fullName: 'Ing. Facundo Saravia',
    companyName: 'FumiNorte - Control de Plagas',
    matricula: 'MP-SALTA-2841',
    phone: '+54 387 459 2211',
    cityZone: 'Salta Capital y Villa San Lorenzo',
    createdAt: '2025-01-10T10:00:00Z',
    specialties: ['Cucarachas', 'Alacranes', 'Dengue / Mosquitos', 'Consorcios'],
    subscription: {
      plan: 'semestral',
      status: 'activa',
      startedAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      expiresAt: new Date(Date.now() + 150 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      pricePaid: 95500,
      paymentMethod: 'Transferencia Bancaria Macro (Salta)',
      paymentReference: 'TR-SALTA-84920'
    }
  },
  {
    id: 'fumi-salta-002',
    email: 'valeria@biosalta.com',
    password: 'password123',
    fullName: 'Dra. Valeria Figueroa',
    companyName: 'BioControl Salta Ambiental',
    matricula: 'MP-SALTA-1590',
    phone: '+54 387 512 8844',
    cityZone: 'Valle de Lerma y Cafayate',
    createdAt: '2025-02-01T12:00:00Z',
    specialties: ['Vinchucas', 'Alacranes', 'Bromatología Gastronómica'],
    subscription: {
      plan: 'mensual',
      status: 'activa',
      startedAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      expiresAt: new Date(Date.now() + 20 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      pricePaid: 19900,
      paymentMethod: 'Mercado Pago Salta',
      paymentReference: 'MP-9382104'
    }
  },
  {
    id: 'fumi-salta-003',
    email: 'gaston@desinfeccionessalta.com',
    password: 'password123',
    fullName: 'Gastón Albarracín',
    companyName: 'Desinfecciones Albarracín Salta',
    matricula: 'HABIL-SALTA-3902',
    phone: '+54 387 633 4455',
    cityZone: 'Salta Capital (Limache e Intersindical)',
    createdAt: '2025-03-01T09:00:00Z',
    specialties: ['Hormigas', 'Roedores', 'Casas Particulares'],
    subscription: {
      plan: 'mensual',
      status: 'sin_suscripcion',
      startedAt: '',
      expiresAt: '',
      pricePaid: 0
    }
  }
];

const DEMO_CLIENTS_FACUNDO: ClientItem[] = [
  {
    id: 'cli-salta-01',
    fumigadorId: 'fumi-salta-001',
    name: 'Restaurante y Peña Don Balderrama',
    phone: '+54 387 421 1542',
    email: 'administracion@balderrama-salta.com.ar',
    address: 'Av. San Martín 1126',
    locality: 'Centro, Salta Capital',
    propertyType: 'gastronomia',
    frequentPest: ['Cucarachas (Blattella)', 'Barigüí y Moscas'],
    status: 'al_dia',
    lastServiceDate: '2025-05-10',
    nextServiceDate: '2025-06-10',
    notes: 'Exigen certificado con visado municipal de Salta para habilitación bromatológica.',
    createdAt: '2025-01-15'
  },
  {
    id: 'cli-salta-02',
    fumigadorId: 'fumi-salta-001',
    name: 'Edificio Portezuelo Suites (Consorcio)',
    phone: '+54 387 439 8800',
    email: 'consorcio@portezuelosuites.com',
    address: 'Av. Reyes Católicos 1420',
    locality: 'Tres Cerritos, Salta Capital',
    propertyType: 'consorcio',
    frequentPest: ['Cucarachas', 'Roedores urbanos'],
    status: 'refuerzo_pendiente',
    lastServiceDate: '2025-04-18',
    nextServiceDate: '2025-05-18',
    notes: 'Tratar cocheras subterráneas, bauleras y salas de bombas cada 30 días.',
    createdAt: '2025-02-05'
  },
  {
    id: 'cli-salta-03',
    fumigadorId: 'fumi-salta-001',
    name: 'Finca Residencial Los Ceibos',
    phone: '+54 387 492 1133',
    address: 'Calle Los Ceibos 45',
    locality: 'San Lorenzo Chico, Salta',
    propertyType: 'residencial',
    frequentPest: ['Alacranes (Tityus)', 'Mosquitos (Aedes aegypti)'],
    status: 'al_dia',
    lastServiceDate: '2025-05-02',
    nextServiceDate: '2025-08-02',
    notes: 'Prevención estricta de alacranes en perímetro, cámara séptica y deck exterior.',
    createdAt: '2025-03-20'
  }
];

const DEMO_SERVICES_FACUNDO: ServiceRecord[] = [
  {
    id: 'srv-salta-01',
    fumigadorId: 'fumi-salta-001',
    clientId: 'cli-salta-01',
    clientName: 'Restaurante y Peña Don Balderrama',
    date: '2025-05-10',
    pestsTreated: ['Cucarachas (Blattella)', 'Moscas'],
    chemicalProduct: 'Fipronil Gel 0.05% + Deltametrina fluida de bajo olor',
    dosage: 'Cebado en zonas calientes de cocina y pulverización perimetral',
    safetyPeriodHours: 4,
    cost: 58000,
    paymentStatus: 'cobrado',
    certificateNumber: 'CERT-SALTA-2025-0481',
    observations: 'Control conforme a Ordenanza de Desinfección y Bromatología de la Municipalidad de Salta.',
    nextServiceRecommendedDate: '2025-06-10'
  },
  {
    id: 'srv-salta-02',
    fumigadorId: 'fumi-salta-001',
    clientId: 'cli-salta-03',
    clientName: 'Finca Residencial Los Ceibos',
    date: '2025-05-02',
    pestsTreated: ['Alacranes (Tityus)', 'Mosquitos (Aedes aegypti)'],
    chemicalProduct: 'Lambdacialotrina microencapsulada 2.5% + Nebulización ULV',
    dosage: 'Barrera química residual perimetral en zócalos, rejillas y drenajes',
    safetyPeriodHours: 2,
    cost: 48000,
    paymentStatus: 'cobrado',
    certificateNumber: 'CERT-SALTA-2025-0465',
    observations: 'Tratamiento anti-escorpiónico en rejillas y control de larvas de mosquito.',
    nextServiceRecommendedDate: '2025-08-02'
  }
];

const DEMO_CLIENTS_VALERIA: ClientItem[] = [
  {
    id: 'cli-val-01',
    fumigadorId: 'fumi-salta-002',
    name: 'Bodega & Hotel Boutique Cafayate',
    phone: '+54 3868 42 1990',
    email: 'info@bodegacafayate.com.ar',
    address: 'Ruta Nacional 40 Km 4340',
    locality: 'Cafayate, Salta',
    propertyType: 'gastronomia',
    frequentPest: ['Palomas', 'Cucarachas', 'Hormigas'],
    status: 'al_dia',
    lastServiceDate: '2025-05-05',
    nextServiceDate: '2025-06-05',
    notes: 'Protección en nave de barricas y restaurante turístico.',
    createdAt: '2025-02-14'
  },
  {
    id: 'cli-val-02',
    fumigadorId: 'fumi-salta-002',
    name: 'Cabañas Valle de Lerma',
    phone: '+54 387 499 5500',
    address: 'Ruta Provincial 21 s/n',
    locality: 'San Agustín, Cerrillos, Salta',
    propertyType: 'comercial',
    frequentPest: ['Vinchucas', 'Mosquitos', 'Alacranes'],
    status: 'al_dia',
    lastServiceDate: '2025-05-08',
    nextServiceDate: '2025-07-08',
    notes: 'Monitoreo de grietas y termonebulización en parque exterior.',
    createdAt: '2025-03-01'
  }
];

const DEMO_CLIENTS_GASTON: ClientItem[] = [
  {
    id: 'cli-gas-01',
    fumigadorId: 'fumi-salta-003',
    name: 'Panadería La Salteñita',
    phone: '+54 387 423 9988',
    address: 'Av. Ex Combatientes de Malvinas 3400',
    locality: 'Limache, Salta Capital',
    propertyType: 'comercial',
    frequentPest: ['Cucarachas', 'Hormigas'],
    status: 'refuerzo_pendiente',
    lastServiceDate: '2025-04-10',
    nextServiceDate: '2025-05-10',
    notes: 'Requiere certificado para la inspección municipal de Salta de la próxima semana.',
    createdAt: '2025-03-05'
  }
];

export const storageService = {
  // --- Account Management ---
  init() {
    const existingAccounts = localStorage.getItem(ACCOUNTS_KEY);
    if (!existingAccounts) {
      localStorage.setItem(ACCOUNTS_KEY, JSON.stringify(DEMO_ACCOUNTS));
      // Seed data for Facundo (Salta 001)
      localStorage.setItem(`fumisalta_clients_fumi-salta-001`, JSON.stringify(DEMO_CLIENTS_FACUNDO));
      localStorage.setItem(`fumisalta_services_fumi-salta-001`, JSON.stringify(DEMO_SERVICES_FACUNDO));
      // Seed data for Valeria (Salta 002)
      localStorage.setItem(`fumisalta_clients_fumi-salta-002`, JSON.stringify(DEMO_CLIENTS_VALERIA));
      localStorage.setItem(`fumisalta_services_fumi-salta-002`, JSON.stringify([]));
      // Seed data for Gaston (Salta 003 - Sin suscripcion)
      localStorage.setItem(`fumisalta_clients_fumi-salta-003`, JSON.stringify(DEMO_CLIENTS_GASTON));
      localStorage.setItem(`fumisalta_services_fumi-salta-003`, JSON.stringify([]));
    }
  },

  getAllAccounts(): FumigadorAccount[] {
    this.init();
    try {
      const raw = localStorage.getItem(ACCOUNTS_KEY);
      return raw ? JSON.parse(raw) : DEMO_ACCOUNTS;
    } catch {
      return DEMO_ACCOUNTS;
    }
  },

  registerFumigador(
    data: Omit<FumigadorAccount, 'id' | 'createdAt'>, 
    chosenPlan?: SubscriptionPlanType
  ): FumigadorAccount {
    const accounts = this.getAllAccounts();
    const existing = accounts.find(a => a.email.toLowerCase() === data.email.toLowerCase());
    if (existing) {
      throw new Error('Ya existe una cuenta de fumigador registrada con este email en Salta.');
    }

    const plan = chosenPlan || 'mensual';
    const planConfig = SUBSCRIPTION_PLANS.find(p => p.id === plan) || SUBSCRIPTION_PLANS[0];
    const durationDays = plan === 'anual' ? 365 : plan === 'semestral' ? 180 : 30;

    const newAccount: FumigadorAccount = {
      ...data,
      id: 'fumi-salta-' + Date.now().toString(36) + Math.random().toString(36).substring(2, 6),
      createdAt: new Date().toISOString(),
      subscription: {
        plan,
        status: 'activa',
        startedAt: new Date().toISOString().split('T')[0],
        expiresAt: new Date(Date.now() + durationDays * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        pricePaid: planConfig.price,
        paymentMethod: 'Activación de Alta / FumiSalta',
        paymentReference: 'SUB-SALTA-' + Math.floor(100000 + Math.random() * 900000)
      }
    };

    accounts.push(newAccount);
    localStorage.setItem(ACCOUNTS_KEY, JSON.stringify(accounts));
    // Initialize collections
    localStorage.setItem(`fumisalta_clients_${newAccount.id}`, JSON.stringify([]));
    localStorage.setItem(`fumisalta_services_${newAccount.id}`, JSON.stringify([]));

    this.setCurrentUser(newAccount);
    return newAccount;
  },

  login(email: string, password?: string): FumigadorAccount {
    const accounts = this.getAllAccounts();
    const found = accounts.find(a => a.email.toLowerCase() === email.toLowerCase());
    if (!found) {
      throw new Error('No se encontró ningún fumigador registrado con ese correo en Salta.');
    }
    if (found.password && password && found.password !== password) {
      throw new Error('La contraseña ingresada es incorrecta.');
    }
    this.setCurrentUser(found);
    return found;
  },

  getCurrentUser(): FumigadorAccount | null {
    this.init();
    try {
      const raw = localStorage.getItem(CURRENT_USER_KEY);
      if (!raw) return null;
      return JSON.parse(raw);
    } catch {
      return null;
    }
  },

  setCurrentUser(account: FumigadorAccount | null) {
    if (account) {
      localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(account));
    } else {
      localStorage.removeItem(CURRENT_USER_KEY);
    }
  },

  logout() {
    localStorage.removeItem(CURRENT_USER_KEY);
  },

  // --- Subscription management ---
  subscribeFumigador(
    fumigadorId: string, 
    planType: SubscriptionPlanType, 
    paymentDetails: { method: string; reference?: string }
  ): FumigadorAccount {
    const accounts = this.getAllAccounts();
    const index = accounts.findIndex(a => a.id === fumigadorId);
    if (index === -1) throw new Error('Cuenta de fumigador no encontrada.');

    const planConfig = SUBSCRIPTION_PLANS.find(p => p.id === planType) || SUBSCRIPTION_PLANS[0];
    const durationDays = planType === 'anual' ? 365 : planType === 'semestral' ? 180 : 30;
    const now = new Date();
    const expires = new Date(now.getTime() + durationDays * 24 * 60 * 60 * 1000);

    const subscription: SubscriptionInfo = {
      plan: planType,
      status: 'activa',
      startedAt: now.toISOString().split('T')[0],
      expiresAt: expires.toISOString().split('T')[0],
      pricePaid: planConfig.price,
      paymentMethod: paymentDetails.method,
      paymentReference: paymentDetails.reference || `REF-SALTA-${Math.floor(100000 + Math.random() * 900000)}`
    };

    accounts[index].subscription = subscription;
    localStorage.setItem(ACCOUNTS_KEY, JSON.stringify(accounts));

    const currentUser = this.getCurrentUser();
    if (currentUser && currentUser.id === fumigadorId) {
      this.setCurrentUser(accounts[index]);
    }

    return accounts[index];
  },

  // --- Private Database for Fumigador: Clients ---
  getClients(fumigadorId: string): ClientItem[] {
    this.init();
    try {
      const raw = localStorage.getItem(`fumisalta_clients_${fumigadorId}`);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  },

  saveClient(fumigadorId: string, clientData: Omit<ClientItem, 'id' | 'fumigadorId' | 'createdAt'>, existingId?: string): ClientItem {
    const clients = this.getClients(fumigadorId);
    let updatedClient: ClientItem;

    if (existingId) {
      const index = clients.findIndex(c => c.id === existingId);
      if (index === -1) throw new Error('Cliente no encontrado en su base de datos.');
      updatedClient = {
        ...clients[index],
        ...clientData
      };
      clients[index] = updatedClient;
    } else {
      updatedClient = {
        ...clientData,
        id: 'cli-' + Date.now().toString(36) + Math.random().toString(36).substring(2, 5),
        fumigadorId,
        createdAt: new Date().toISOString()
      };
      clients.unshift(updatedClient);
    }

    localStorage.setItem(`fumisalta_clients_${fumigadorId}`, JSON.stringify(clients));
    return updatedClient;
  },

  deleteClient(fumigadorId: string, clientId: string) {
    const clients = this.getClients(fumigadorId).filter(c => c.id !== clientId);
    localStorage.setItem(`fumisalta_clients_${fumigadorId}`, JSON.stringify(clients));

    const services = this.getServices(fumigadorId).filter(s => s.clientId !== clientId);
    localStorage.setItem(`fumisalta_services_${fumigadorId}`, JSON.stringify(services));
  },

  // --- Private Database for Fumigador: Services ---
  getServices(fumigadorId: string): ServiceRecord[] {
    this.init();
    try {
      const raw = localStorage.getItem(`fumisalta_services_${fumigadorId}`);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  },

  saveService(fumigadorId: string, serviceData: Omit<ServiceRecord, 'id' | 'fumigadorId'>): ServiceRecord {
    const services = this.getServices(fumigadorId);
    const newService: ServiceRecord = {
      ...serviceData,
      id: 'srv-' + Date.now().toString(36) + Math.random().toString(36).substring(2, 5),
      fumigadorId
    };
    services.unshift(newService);
    localStorage.setItem(`fumisalta_services_${fumigadorId}`, JSON.stringify(services));

    const clients = this.getClients(fumigadorId);
    const clientIndex = clients.findIndex(c => c.id === serviceData.clientId);
    if (clientIndex !== -1) {
      clients[clientIndex].lastServiceDate = serviceData.date;
      if (serviceData.nextServiceRecommendedDate) {
        clients[clientIndex].nextServiceDate = serviceData.nextServiceRecommendedDate;
        clients[clientIndex].status = 'al_dia';
      }
      localStorage.setItem(`fumisalta_clients_${fumigadorId}`, JSON.stringify(clients));
    }

    return newService;
  },

  deleteService(fumigadorId: string, serviceId: string) {
    const services = this.getServices(fumigadorId).filter(s => s.id !== serviceId);
    localStorage.setItem(`fumisalta_services_${fumigadorId}`, JSON.stringify(services));
  },

  // --- Export / Import isolated database ---
  exportDatabase(fumigadorId: string): string {
    const clients = this.getClients(fumigadorId);
    const services = this.getServices(fumigadorId);
    const accounts = this.getAllAccounts();
    const account = accounts.find(a => a.id === fumigadorId);

    const backup = {
      plataforma: 'FumiSalta - Sistema Provincial de Fumigadores',
      fumigador: account,
      exportDate: new Date().toISOString(),
      clientsCount: clients.length,
      servicesCount: services.length,
      clients,
      services
    };

    return JSON.stringify(backup, null, 2);
  },

  importDatabase(fumigadorId: string, jsonString: string): { clientsCount: number; servicesCount: number } {
    const parsed = JSON.parse(jsonString);
    if (!Array.isArray(parsed.clients)) {
      throw new Error('El archivo importado no contiene una lista válida de clientes.');
    }

    const clients: ClientItem[] = parsed.clients.map((c: any) => ({
      ...c,
      id: c.id || ('cli-' + Date.now().toString(36) + Math.random().toString(36).substring(2, 5)),
      fumigadorId
    }));

    const services: ServiceRecord[] = Array.isArray(parsed.services)
      ? parsed.services.map((s: any) => ({
          ...s,
          id: s.id || ('srv-' + Date.now().toString(36) + Math.random().toString(36).substring(2, 5)),
          fumigadorId
        }))
      : [];

    localStorage.setItem(`fumisalta_clients_${fumigadorId}`, JSON.stringify(clients));
    localStorage.setItem(`fumisalta_services_${fumigadorId}`, JSON.stringify(services));

    return {
      clientsCount: clients.length,
      servicesCount: services.length
    };
  }
};
