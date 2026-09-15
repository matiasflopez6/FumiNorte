import { ServiceItem, ZoneItem, FAQItem } from '../types';

export const COMPANY_INFO = {
  name: 'Fumibug',
  brandName: 'Fumibug Fumigaciones',
  phoneFormatted: '(011) 3193-4993',
  phoneCall: '+5491131934993',
  phoneRaw: '1131934993',
  whatsappNumber: '5491131934993',
  emailSales: 'ventas@fumibug.com',
  emailGeneral: 'fumibugfumigaciones@gmail.com',
  locationOverview: 'Zona Norte, Zona Oeste y CABA - Buenos Aires',
  hours: 'Lunes a Sábados: 08:00 a 20:00 hs | Guardias de Emergencia 24hs',
  social: {
    facebook: 'https://www.facebook.com/profile.php?id=61564629337613',
    instagram: 'https://www.instagram.com/fumibug/',
    whatsapp: 'https://api.whatsapp.com/send?phone=5491131934993',
    messenger: 'https://www.facebook.com/messages/t/410091372183623'
  }
};

export const SERVICES_LIST: ServiceItem[] = [
  {
    id: 'cucarachas',
    title: 'Cucarachas',
    category: 'frecuente',
    shortDesc: 'Eliminación segura y duradera con productos de baja toxicidad y efecto contagioso en nidos.',
    fullDesc: 'Tratamiento integral de cucarachas (alemana de cocina, americana y oriental). Aplicamos cebos en gel de última generación sin olor y aspersión perimetral focalizada que infecta a la colonia sin obligarte a abandonar tu casa por horas.',
    method: 'Gel atrayente bio-contagioso + microemulsión residual',
    toxicity: 'Baja toxicidad / Seguro para mascotas y niños',
    idealFor: 'Hogares, cocinas, restaurantes, bares, panaderías y consorcios',
    iconName: 'Bug',
    badge: 'Más Solicitado',
    imageUrl: 'https://images.unsplash.com/photo-1628177142898-93e36e4e3a50?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'hormigas',
    title: 'Hormigas',
    category: 'frecuente',
    shortDesc: 'Tratamientos que erradican la colonia completa tanto en interiores como en parques y jardines.',
    fullDesc: 'Erradicamos hormiga carpintera (destructora de maderas y techos), hormiga podadora/cortadora y de cocina. El producto es transportado por las obreras directo al hormiguero profundo eliminando la reina.',
    method: 'Cebado granular específico + aspersión barrera exterior',
    toxicity: 'Grado ecológico con nulo impacto en plantas',
    idealFor: 'Casas con jardín, countries, quintas y cocinas',
    iconName: 'ShieldAlert',
    badge: 'Efecto Colonia',
    imageUrl: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'roedores',
    title: 'Roedores (Ratas y Ratones)',
    category: 'roedores',
    shortDesc: 'Control y desratización efectiva mediante estaciones de cebado inviolables y seguras.',
    fullDesc: 'Desratización profesional con cebos anticoagulantes de segunda generación en cajas cebaderas con llave de seguridad. Previene accidentes con niños o animales domésticos y bloquea focos infecciosos.',
    method: 'Cajas cebaderas cerradas inviolables + sellado de pasos',
    toxicity: 'Estaciones herméticas cerradas con llave',
    idealFor: 'Galpones, viviendas, entretechos, locales y depósitos',
    iconName: 'Rat',
    badge: 'Seguridad 100%',
    imageUrl: 'https://images.unsplash.com/photo-1548767797-d8c844163c4c?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'chinches',
    title: 'Chinches de Cama',
    category: 'rastreros',
    shortDesc: 'Inspección minuciosa y tratamiento profundo en sommiers, respaldos y zócalos.',
    fullDesc: 'Las chinches de cama provocan picaduras nocturnas y se esconden en costuras y grietas. Implementamos un protocolo de choque con choque térmico y residualidad para cortar el ciclo de huevos.',
    method: 'Tratamiento de alta penetración + choque térmico',
    toxicity: 'Baja toxicidad / Reingreso en pocas horas',
    idealFor: 'Dormitorios, hoteles, residencias y departamentos',
    iconName: 'BedDouble',
    imageUrl: 'https://images.unsplash.com/photo-1582533561751-ef6f6ab93a2e?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'pulgas-garrapatas',
    title: 'Pulgas y Garrapatas',
    category: 'rastreros',
    shortDesc: 'Desparasitación ambiental integral para hogares con mascotas y espacios verdes.',
    fullDesc: 'Tratamos alfombras, hendiduras, patios y zonas de descanso animal con reguladores de crecimiento de insectos (IGR) que impiden que las larvas maduren, frenando reinfestaciones.',
    method: 'Nebulización en frío + IGR inhibidor de crecimiento',
    toxicity: 'Compatible con hogares con perros y gatos',
    idealFor: 'Casas familiares con mascotas, refugios, veterinarias',
    iconName: 'PawPrint',
    badge: 'Pet Friendly',
    imageUrl: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'mosquitos',
    title: 'Mosquitos y Jejenes',
    category: 'voladores',
    shortDesc: 'Termoniebla y aspersión para reducción drástica de mosquitos adultos y larvas.',
    fullDesc: 'Fumigaciones perimetrales en parques, canchas y jardines. Reduce notablemente la presencia de Aedes aegypti (Dengue) y Culex con formulaciones residuales resistentes al rocío matinal.',
    method: 'Termonebulización de alto alcance + larvicidas biológicos',
    toxicity: 'Aprobado ANMAT para parques y espacios abiertos',
    idealFor: 'Eventos al aire libre, countries, jardines y predios',
    iconName: 'Wind',
    badge: 'Prevención Dengue',
    imageUrl: 'https://images.unsplash.com/photo-1576086213369-97a306d36557?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'aranas',
    title: 'Arañas y Alacranes',
    category: 'rastreros',
    shortDesc: 'Protección perimetral y desinsectación de techos, galpones y zócalos.',
    fullDesc: 'Tratamiento preventivo y correctivo contra arañas domésticas, araña de rincón y alacranes. Se crea una barrera física e insecticida que anula su fuente de alimento y refugios.',
    method: 'Barrera química perimetral + limpieza de telas y nidos',
    toxicity: 'Baja toxicidad y alto poder de volteo',
    idealFor: 'Casas, depósitos, bauleras y sótanos',
    iconName: 'Sparkles',
    imageUrl: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'comercial',
    title: 'Comercios y Consorcios',
    category: 'comercial',
    shortDesc: 'Planes mensuales con Libro de Fumigación y Certificado Oficial para habilitación.',
    fullDesc: 'Servicio para gastronomía, consorcios de edificios, depósitos alimenticios y comercios en general. Emitimos Certificado Oficial de Desinfección y Control de Plagas exigido por Bromatología y municipios.',
    method: 'Manejo Integrado de Plagas (MIP) + Planillas de monitoreo',
    toxicity: 'Cumplimiento estricto normas sanitarias ANMAT',
    idealFor: 'Restaurantes, consorcios, fábricas, oficinas y locales',
    iconName: 'Building2',
    badge: 'Certificado Oficial',
    imageUrl: 'https://images.unsplash.com/photo-1584992236310-6edddc08acff?auto=format&fit=crop&w=800&q=80'
  }
];

export const COVERAGE_ZONES: ZoneItem[] = [
  {
    name: 'Zona Oeste',
    region: 'Zona Oeste',
    popularLocalities: [
      'San Miguel', 'Muñiz', 'Bella Vista', 'Morón', 'Castelar',
      'Ituzaingó', 'Haedo', 'Merlo', 'Hurlingham', 'Tres de Febrero',
      'Caseros', 'Moreno', 'Paso del Rey', 'Ramos Mejía'
    ]
  },
  {
    name: 'Zona Norte',
    region: 'Zona Norte',
    popularLocalities: [
      'San Martín', 'Villa Ballester', 'Vicente López', 'Olivos',
      'San Isidro', 'Martínez', 'San Fernando', 'Tigre',
      'Nordelta', 'Don Torcuato', 'Pacheco', 'Pilar', 'Escobar'
    ]
  },
  {
    name: 'CABA',
    region: 'CABA',
    popularLocalities: [
      'Villa Devoto', 'Villa Urquiza', 'Belgrano', 'Palermo',
      'Caballito', 'Flores', 'Saavedra', 'Colegiales', 'Todos los barrios'
    ]
  }
];

export const FAQS: FAQItem[] = [
  {
    question: '¿Los productos que usan son peligrosos para perros, gatos o niños?',
    answer: 'No. En Fumibug priorizamos fórmulas de baja toxicidad aprobadas por ANMAT y el Ministerio de Salud. Empleamos geles bio-específicos y microemulsiones acuosas sin olor que actúan sobre el metabolismo de los insectos sin poner en riesgo a tus mascotas ni a tu familia.',
    category: 'Seguridad'
  },
  {
    question: '¿Cuánto tiempo debemos ausentarnos de la propiedad?',
    answer: 'Para tratamientos en gel (como cucarachas de cocina) ni siquiera es necesario retirarse de la casa ni desocupar alacenas. En tratamientos con aspersión líquida (pulgas, garrapatas o choque general), recomendamos ventilar y esperar entre 1 a 2 horas para que las superficies sequen completamente.',
    category: 'Procedimiento'
  },
  {
    question: '¿Tienen garantía los trabajos de fumigación?',
    answer: 'Sí. Brindamos garantía por escrito en nuestros tratamientos. Dado que los productos tienen efecto residual continuo durante semanas, si notas actividad inusual dentro del periodo de cobertura realizamos un refuerzo sin costo adicional.',
    category: 'Garantía'
  },
  {
    question: '¿Otorgan certificado de fumigación para habilitaciones comerciales?',
    answer: 'Exactamente. Confeccionamos el certificado de fumigación y desinfección homologado para presentar ante Bromatología municipal, consorcios de edificios y auditorías de salubridad.',
    category: 'Comercial'
  },
  {
    question: '¿Cómo puedo solicitar un presupuesto y en cuánto tiempo responden?',
    answer: 'Podés cotizar de forma inmediata con nuestro cotizador web o enviándonos un WhatsApp. Te responderemos en pocos minutos con el valor exacto según los metros cuadrados, tipo de inmueble y plaga a tratar.',
    category: 'Presupuestos'
  }
];

export const TRUST_POINTS = [
  {
    title: 'Baja Toxicidad Certificada',
    desc: 'Formulaciones seguras que cuidan a tus mascotas, plantas y niños.',
    icon: 'Leaf'
  },
  {
    title: 'Efecto Contagioso y Residual',
    desc: 'El cebo es llevado al nido, erradicando a la reina y colonias ocultas.',
    icon: 'Target'
  },
  {
    title: 'Atención Inmediata',
    desc: 'Coordinamos turnos en el día o dentro de las 24hs en toda la zona.',
    icon: 'Clock'
  },
  {
    title: 'Personal Capacitado',
    desc: 'Técnicos idóneos con equipamiento de protección y trazabilidad.',
    icon: 'ShieldCheck'
  }
];
