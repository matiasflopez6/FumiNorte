import React, { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp, ShieldCheck, FileCheck2, QrCode, Sparkles } from 'lucide-react';

interface FaqItem {
  question: string;
  answer: string;
  category: string;
}

export const FAQ_DATA: FaqItem[] = [
  {
    question: '¿Qué validez legal tienen los certificados emitidos en FumiNorte ante Bromatología de la Municipalidad de Salta?',
    answer: 'Los certificados generados a través de FumiNorte cumplen rigurosamente con los requisitos exigidos por la Dirección de Bromatología y Saneamiento Ambiental de la Municipalidad de Salta (Ordenanzas de Desinfección y Desinsectación obligatoria). Incluyen director técnico habilitado, número de matrícula provincial, principios activos autorizados por ANMAT/SENASA, fecha de aplicación, vigencia reglamentaria (30 a 90 días según rubro) y código QR único de verificación antifalsificación.',
    category: 'Normativa Salta'
  },
  {
    question: '¿Cómo funciona la verificación mediante código QR para inspectores municipales en Salta?',
    answer: 'Cada certificado emitido genera un código QR criptográfico único. Al ser escaneado por inspectores municipales, bromatólogos o clientes desde cualquier teléfono móvil o tablet, valida inmediatamente en tiempo real la autenticidad del documento, los datos del local fumigado, la empresa emisora y la vigencia del tratamiento, impidiendo duplicados o adulteraciones.',
    category: 'Certificación QR'
  },
  {
    question: '¿Qué plagas y vectores regionales de la Provincia de Salta cubre la plataforma?',
    answer: 'El sistema cuenta con plantillas y protocolos específicos para las plagas más comunes del NOA: control del mosquito vector del Dengue (Aedes aegypti), alacranes y escorpiones (Tityus trivittatus), vinchucas (Triatoma infestans en zonas periurbanas y Valles), cucarachas (Blattella germanica y Periplaneta americana en gastronómicos) y roedores (Mus musculus, Rattus norvegicus).',
    category: 'Control de Plagas'
  },
  {
    question: '¿Mis clientes y la base de datos de mi empresa están seguros y aislados de otros fumigadores?',
    answer: 'Sí, absolutamente. En FumiNorte cada empresa y técnico fumigador dispone de un entorno de datos 100% privado y encriptado. Ningún otro fumigador ni competidor de Salta tiene acceso a tus clientes, direcciones, presupuestos ni historial de órdenes de servicio.',
    category: 'Seguridad y Privacidad'
  },
  {
    question: '¿Cómo se activan los planes de suscripción (Mensual, Semestral, Anual)?',
    answer: 'La activación es instantánea. Podés abonar mediante transferencia bancaria con Banco Macro Salta (con acreditación inmediata), Mercado Pago con código QR, o tarjetas de crédito y débito. Una vez registrado tu pago, tu cuenta queda habilitada para emitir certificados ilimitados durante todo el período contratado.',
    category: 'Suscripciones'
  },
  {
    question: '¿Puedo enviar los certificados en formato PDF a mis clientes por WhatsApp?',
    answer: 'Sí. Una vez confeccionado el certificado, podés imprimirlo en hoja membretada oficial para exhibir en el comercio o descargarlo en PDF de alta resolución para enviarlo en un solo clic por WhatsApp o correo electrónico al propietario o encargado del establecimiento.',
    category: 'Gestión Digital'
  }
];

export const SaltaFaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section 
      id="preguntas-frecuentes" 
      className="py-16 sm:py-20 px-4 bg-slate-50 border-t border-slate-200/80"
      itemScope 
      itemType="https://schema.org/FAQPage"
    >
      <div className="max-w-4xl mx-auto">
        {/* Section Title */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-black uppercase tracking-wider mb-3">
            <HelpCircle className="w-3.5 h-3.5 text-emerald-600" />
            <span>Preguntas Frecuentes • FumiNorte Salta</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight">
            Todo lo que necesitas saber sobre el servicio y la certificación en Salta
          </h2>
          <p className="text-slate-600 text-xs sm:text-sm mt-3 max-w-2xl mx-auto">
            Respuestas a las dudas más habituales sobre homologación municipal, código QR, normativas de Bromatología y suscripciones profesionales.
          </p>
        </div>

        {/* FAQ Accordion List with Microdata */}
        <div className="space-y-3.5">
          {FAQ_DATA.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <div
                key={index}
                itemScope 
                itemProp="mainEntity" 
                itemType="https://schema.org/Question"
                className={`rounded-2xl transition-all duration-200 border overflow-hidden ${
                  isOpen 
                    ? 'bg-white border-emerald-600/60 shadow-md ring-2 ring-emerald-500/10' 
                    : 'bg-white border-slate-200/90 hover:border-slate-300 shadow-sm'
                }`}
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full text-left p-5 sm:p-6 flex items-center justify-between gap-4 cursor-pointer focus:outline-none"
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${index}`}
                >
                  <div className="flex items-start gap-3">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-slate-100 text-slate-600 shrink-0 mt-0.5">
                      {faq.category}
                    </span>
                    <span 
                      itemProp="name" 
                      className="font-bold text-sm sm:text-base text-slate-900 leading-snug"
                    >
                      {faq.question}
                    </span>
                  </div>
                  <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                    isOpen ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-500'
                  }`}>
                    {isOpen ? (
                      <ChevronUp className="w-4 h-4" />
                    ) : (
                      <ChevronDown className="w-4 h-4" />
                    )}
                  </div>
                </button>

                {isOpen && (
                  <div
                    id={`faq-answer-${index}`}
                    itemScope 
                    itemProp="acceptedAnswer" 
                    itemType="https://schema.org/Answer"
                    className="px-5 sm:px-6 pb-6 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100"
                  >
                    <div itemProp="text">
                      {faq.answer}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Helpful bottom callout for Salta users */}
        <div className="mt-10 p-5 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 text-center sm:text-left">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0 mx-auto sm:mx-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs sm:text-sm font-bold text-slate-900">
                ¿Sos fumigador matriculado o tenés una empresa en Salta?
              </h4>
              <p className="text-[11px] text-slate-500">
                Podés registrarte y comenzar a cargar tus órdenes de servicio y clientes de forma inmediata.
              </p>
            </div>
          </div>
          <a
            href="#planes-suscripcion"
            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl shadow-md transition-all shrink-0 cursor-pointer"
          >
            Ver Planes Disponibles
          </a>
        </div>
      </div>
    </section>
  );
};
