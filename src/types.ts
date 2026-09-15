export type PropertyType = 'residencial' | 'consorcio' | 'gastronomia' | 'comercial' | 'industrial';
export type ClientStatus = 'al_dia' | 'refuerzo_pendiente' | 'inactivo';
export type PaymentStatus = 'cobrado' | 'pendiente';

export type SubscriptionPlanType = 'mensual' | 'semestral' | 'anual';
export type SubscriptionStatus = 'activa' | 'vencida' | 'sin_suscripcion';

export interface SubscriptionInfo {
  plan: SubscriptionPlanType;
  status: SubscriptionStatus;
  startedAt: string;
  expiresAt: string;
  pricePaid: number;
  paymentMethod?: string;
  paymentReference?: string;
}

export interface PlanPricing {
  id: SubscriptionPlanType;
  name: string;
  tagline: string;
  price: number;
  periodText: string;
  billingFrequency: string;
  discountBadge?: string;
  monthlyEquivalent: number;
  popular?: boolean;
  features: string[];
}

export interface FumigadorAccount {
  id: string;
  email: string;
  password?: string;
  fullName: string;
  companyName: string;
  matricula: string;
  phone: string;
  cityZone: string;
  createdAt: string;
  specialties?: string[];
  subscription?: SubscriptionInfo;
}

export interface ClientItem {
  id: string;
  fumigadorId: string;
  name: string;
  phone: string;
  email?: string;
  address: string;
  locality: string;
  propertyType: PropertyType;
  frequentPest: string[];
  status: ClientStatus;
  lastServiceDate?: string;
  nextServiceDate?: string;
  notes?: string;
  createdAt: string;
}

export interface ServiceRecord {
  id: string;
  fumigadorId: string;
  clientId: string;
  clientName: string;
  date: string;
  pestsTreated: string[];
  chemicalProduct: string;
  dosage: string;
  safetyPeriodHours: number;
  cost: number;
  paymentStatus: PaymentStatus;
  certificateNumber?: string;
  observations?: string;
  nextServiceRecommendedDate?: string;
}

export interface CertificateData {
  id: string;
  fumigadorId: string;
  clientId: string;
  certificateNumber: string;
  clientName: string;
  clientAddress: string;
  locality: string;
  propertyType: PropertyType;
  pestsTreated: string[];
  productsUsed: string;
  safetyPeriodHours: number;
  dateIssued: string;
  validUntil: string;
  fumigadorName: string;
  companyName: string;
  matricula: string;
  phone: string;
  observations?: string;
}

// Keep legacy service and quote items for public preview if needed
export interface ServiceItem {
  id: string;
  title: string;
  category: 'frecuente' | 'rastreros' | 'voladores' | 'roedores' | 'comercial';
  shortDesc: string;
  fullDesc: string;
  method: string;
  toxicity: string;
  idealFor: string;
  iconName: string;
  badge?: string;
  imageUrl?: string;
}

export interface ZoneItem {
  name: string;
  region: 'Zona Norte' | 'Zona Oeste' | 'CABA';
  popularLocalities: string[];
}

export interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

export interface QuoteFormData {
  pest: string;
  propertyType: string;
  rooms: string;
  hasPets: boolean;
  hasGarden: boolean;
  zone: string;
  locality: string;
  urgency: 'normal' | 'urgente' | 'preventivo';
  notes: string;
}
