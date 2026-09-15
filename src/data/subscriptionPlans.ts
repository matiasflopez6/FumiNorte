import { PlanPricing } from '../types';

export const SUBSCRIPTION_PLANS: PlanPricing[] = [
  {
    id: 'mensual',
    name: 'Plan Mensual',
    tagline: 'Ideal para fumigadores independientes o inicio de actividad',
    price: 19900,
    periodText: 'por mes',
    billingFrequency: 'Facturación mensual recurrente',
    monthlyEquivalent: 19900,
    popular: false,
    features: [
      'Emisión ilimitada de Certificados Oficiales de Salta',
      'Código QR de validación técnica inmediata',
      'Base de datos privada de clientes ilimitada',
      'Fichas de productos aprobados por SENASA y ANMAT',
      'Avisos de refuerzo y re-fumigación por WhatsApp',
      'Registro técnico de dosificaciones y plagas',
      'Soporte técnico por WhatsApp en Salta'
    ]
  },
  {
    id: 'semestral',
    name: 'Plan Semestral',
    tagline: 'El plan más elegido por empresas y técnicos de Salta Capital y el Valle',
    price: 95500,
    periodText: 'por 6 meses',
    billingFrequency: 'Pago único semestral ($15.916/mes)',
    discountBadge: '20% DE AHORRO',
    monthlyEquivalent: 15916,
    popular: true,
    features: [
      'Todo lo incluido en el Plan Mensual',
      'Ahorro del 20% respecto al pago mensual',
      'Formato adaptado a inspecciones de Bromatología Salta',
      'Control específico de Dengue, Alacranes y Vinchucas',
      'Copia de seguridad (Backup) automática descargable',
      'Reporte financiero mensual de cobros y servicios',
      'Atención técnica prioritaria 7 días a la semana'
    ]
  },
  {
    id: 'anual',
    name: 'Plan Anual',
    tagline: 'Máximo ahorro y distinción profesional para empresas establecidas en Salta',
    price: 159000,
    periodText: 'por año completo',
    billingFrequency: 'Pago único anual ($13.250/mes)',
    discountBadge: '35% DE AHORRO',
    monthlyEquivalent: 13250,
    popular: false,
    features: [
      'Todo lo incluido en el Plan Semestral',
      'Ahorro del 35% (equivalente a 4 meses bonificados)',
      'Insignia oficial de "Fumigador Acreditado FumiSalta"',
      'Personalización completa del membrete con logotipo propio',
      'Emisión de certificados multi-sucursal y consorcios',
      'Acceso preferencial a actualizaciones de normativas de Salta',
      'Línea directa de soporte técnico y capacitaciones'
    ]
  }
];

export const SALTA_ZONES = [
  'Salta Capital (Centro, Macrocentro)',
  'Salta Capital (Tres Cerritos, San Bernardo)',
  'Salta Capital (Barrio Grand Bourg, San Martín)',
  'Salta Capital (Limache, Zona Sur, Intersindical)',
  'Villa San Lorenzo y San Lorenzo Chico',
  'Valle de Lerma (Cerrillos, Rosario de Lerma, La Merced, El Carril)',
  'Cafayate y Valles Calchaquíes',
  'General Güemes y Campo Santo',
  'Metán y Rosario de la Frontera',
  'San Ramón de la Nueva Orán y Tartagal'
];

export const SALTA_COMMON_PESTS = [
  'Cucarachas (Periplaneta / Blattella germanica)',
  'Mosquitos (Aedes aegypti / Prevención Dengue)',
  'Alacranes / Escorpiones (Tityus trivittatus)',
  'Vinchucas (Triatoma infestans / Prevención Chagas)',
  'Roedores (Ratas y Ratones de campo y urbanos)',
  'Hormigas mineras y podadoras',
  'Barigüí y Jejenes',
  'Moscas y tábanos',
  'Palomas y aves urbanas',
  'Termitas y taladros de madera',
  'Pulgas y garrapatas'
];
