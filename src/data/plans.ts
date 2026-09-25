// Tipos para los planes y servicios
export interface Package {
  id: string;
  name: string;
  price: number;
  sku?: string;
  features: string[];
  featured?: boolean;
}

export interface Service {
  id: string;
  title: string;
  shortTitle: string;
  description: string;
  image: string;
  href: string;
}

// ===========================================
// PAQUETES PRINCIPALES (8 paquetes)
// ===========================================
export const mainPackagesSpanish: Package[] = [
  {
    id: "startapp",
    name: "STARTAPP",
    price: 650,
    sku: "ALP-TBZMAX",
    features: [
      "Asesoría básica de 30 min sobre desarrollo móvil o software.",
    ],
  },
  {
    id: "microdev",
    name: "MICRO DEV",
    price: 1290,
    sku: "ALP-08CHCR",
    features: [
      "Informe básico de viabilidad técnica.",
      "1 revisión.",
      "Soporte técnico por correo durante tres días.",
    ],
    featured: true,
  },
  {
    id: "flexcode",
    name: "FLEXCODE",
    price: 3850,
    sku: "ALP-UJMFVC",
    features: [
      "Desarrollo de módulo funcional (login, formulario, etc.).",
      "Integración de 1 API externa. (debe ser contratada por el cliente de manera externa)",
      "Soporte técnico por 1 semana.",
    ],
  },
  {
    id: "syncup",
    name: "SYNCUP",
    price: 7800,
    sku: "ALP-BJALYH",
    features: [
      "Desarrollo parcial de app móvil (1 pantalla)",
      "Integración simple con sistema externo (ERP, CRM).",
      "Automatización básica de 1 proceso manual.",
    ],
  },
  {
    id: "custombuild",
    name: "CUSTOMBUILD",
    price: 12900,
    sku: "ALP-Q9JFMR",
    features: [
      "Desarrollo de software (funciones específicas según el negocio).",
      "Integración de sistema (1 plataforma).",
      "Asesoría tecnológica especializada.",
      "Mantenimiento correctivo y evolutivo por 2 semanas.",
    ],
    featured: true,
  },
  {
    id: "optim",
    name: "OPTIM",
    price: 18400,
    sku: "ALP-VERN7F",
    features: [
      "Automatización de 3 procesos internos.",
      "Desarrollo de dashboard personalizado.",
      "Consultoría en arquitectura tecnológica.",
      "Soporte y mantenimiento por 2 semanas.",
    ],
  },
  {
    id: "proconnect",
    name: "PROCONNECT",
    price: 26500,
    sku: "ALP-OQV6L7",
    features: [
      "Desarrollo de app móvil funcional completa (iOS y Android).",
      "Integración con plataformas externas (pasarelas, CRM, etc., deben ser contratadas por el cliente de manera externa)",
      "Mantenimiento y actualizaciones por 3 semanas.",
    ],
  },
  {
    id: "enter360",
    name: "ENTER 360",
    price: 35000,
    sku: "ALP-FTEDC8",
    features: [
      "Desarrollo integral de software empresarial.",
      "Consultoría estratégica en transformación digital.",
      "Automatización avanzada de procesos.",
      "Integración con hasta 4 sistemas. (deben ser contratadas por el cliente de manera externa)",
      "Soporte técnico prioritario por 6 semanas.",
    ],
    featured: true,
  },
];

export const mainPackagesEnglish: Package[] = [
  {
    id: "startapp",
    name: "STARTAPP",
    price: 650,
    sku: "ALP-TBZMAX",
    features: [
      "Basic 30-minute consultation on mobile app or software development.",
    ],
  },
  {
    id: "microdev",
    name: "MICRO DEV",
    price: 1290,
    sku: "ALP-08CHCR",
    features: [
      "Basic technical feasibility report.",
      "1 review.",
      "Email technical support for three days.",
    ],
    featured: true,
  },
  {
    id: "flexcode",
    name: "FLEXCODE",
    price: 3850,
    sku: "ALP-UJMFVC",
    features: [
      "Functional module development (login, form, etc.).",
      "Integration of 1 external API. (must be contracted externally by the client)",
      "Technical support for 1 week.",
    ],
  },
  {
    id: "syncup",
    name: "SYNCUP",
    price: 7800,
    sku: "ALP-BJALYH",
    features: [
      "Partial mobile app development (1 screen)",
      "Simple integration with an external system (ERP, CRM).",
      "Basic automation of 1 manual process.",
    ],
  },
  {
    id: "custombuild",
    name: "CUSTOMBUILD",
    price: 12900,
    sku: "ALP-Q9JFMR",
    features: [
      "Software development (specific functions according to the business).",
      "System integration (1 platform).",
      "Specialized technology consulting.",
      "Corrective and evolutionary maintenance for 2 weeks.",
    ],
    featured: true,
  },
  {
    id: "optim",
    name: "OPTIM",
    price: 18400,
    sku: "ALP-VERN7F",
    features: [
      "Automation of 3 internal processes.",
      "Custom dashboard development.",
      "Technology architecture consulting.",
      "Support and maintenance for 2 weeks.",
    ],
  },
  {
    id: "proconnect",
    name: "PROCONNECT",
    price: 26500,
    sku: "ALP-OQV6L7",
    features: [
      "Complete functional mobile app development (iOS and Android).",
      "Integration with external platforms (payment gateways, CRM, etc., must be contracted externally by the client)",
      "Maintenance and updates for 3 weeks.",
    ],
  },
  {
    id: "enter360",
    name: "ENTER 360",
    price: 35000,
    sku: "ALP-FTEDC8",
    features: [
      "Comprehensive enterprise software development.",
      "Strategic consulting on digital transformation.",
      "Advanced process automation.",
      "Integration with up to 4 systems. (must be contracted externally by the client)",
      "Priority technical support for 6 weeks.",
    ],
    featured: true,
  },
];

// ===========================================
// SERVICIOS DE CONSULTORÍA (5 servicios)
// ===========================================
export const consultingServicesSpanish: Package[] = [
  {
    id: "microasesoria",
    name: "MICROASESORÍA EXPRESS",
    price: 120,
    features: [
      "Sesión de 10 minutos para resolver una duda puntual sobre herramientas o software.",
    ],
  },
  {
    id: "diagnostico",
    name: "DIAGNÓSTICO BÁSICO DE TECNOLOGÍA",
    price: 240,
    features: [
      "Evaluación general del entorno tecnológico del cliente (hardware, software o conectividad).",
      "Recomendaciones iniciales sin implementación.",
    ],
    featured: true,
  },
  {
    id: "revision",
    name: "REVISIÓN DE INFRAESTRUCTURA DIGITAL",
    price: 330,
    features: [
      "Análisis de herramientas actuales (hosting, apps, almacenamiento) y sugerencias de mejora o sustitución.",
    ],
  },
  {
    id: "seleccion",
    name: "ASESORÍA DE SELECCIÓN DE SOFTWARE",
    price: 460,
    features: [
      "Búsqueda y recomendación de plataformas tecnológicas adecuadas (CRM, ERP, etc.) según el tipo de negocio.",
      "Incluye tabla comparativa de hasta 3 opciones.",
    ],
  },
  {
    id: "auditoria",
    name: "MINI AUDITORÍA DE PROCESOS TECNOLÓGICOS",
    price: 580,
    features: [
      "Revisión de un proceso interno (ventas, atención al cliente, inventario, etc.) y propuesta de mejora mediante automatización o integración tecnológica.",
    ],
  },
];

export const consultingServicesEnglish: Package[] = [
  {
    id: "microasesoria",
    name: "EXPRESS MICRO CONSULTING",
    price: 120,
    features: [
      "10-minute session to solve a specific question about tools or software.",
    ],
  },
  {
    id: "diagnostico",
    name: "BASIC TECHNOLOGY DIAGNOSTIC",
    price: 240,
    features: [
      "General evaluation of the client's technology environment (hardware, software, or connectivity).",
      "Initial recommendations without implementation.",
    ],
    featured: true,
  },
  {
    id: "revision",
    name: "DIGITAL INFRASTRUCTURE REVIEW",
    price: 330,
    features: [
      "Analysis of current tools (hosting, apps, storage) and suggestions for improvement or replacement.",
    ],
  },
  {
    id: "seleccion",
    name: "SOFTWARE SELECTION CONSULTING",
    price: 460,
    features: [
      "Search and recommendation of suitable technology platforms (CRM, ERP, etc.) based on the type of business.",
      "Includes a comparison table of up to 3 options.",
    ],
  },
  {
    id: "auditoria",
    name: "MINI AUDIT OF TECHNOLOGICAL PROCESSES",
    price: 580,
    features: [
      "Review of one internal process (sales, customer service, inventory, etc.) and improvement proposal through automation or technological integration.",
    ],
  },
];

// ===========================================
// PAQUETES DE LA PÁGINA PRINCIPAL (3 destacados)
// ===========================================
export const homepagePackagesSpanish = [
  {
    name: "BÁSICO",
    price: "$650.00",
    features: [
      "Desarrollo de una aplicación móvil básica.",
      "Soporte técnico por 6 meses.",
      "Ideal para pequeñas empresas que buscan una solución asequible y eficaz.",
      "y más....",
    ],
    featured: false,
  },
  {
    name: "ESTÁNDAR",
    price: "$1,290.00",
    features: [
      "Desarrollo de software a medida",
      "Integración de sistemas",
      "Soporte técnico por 1 año",
      "y más...",
    ],
    featured: true,
  },
  {
    name: "PREMIUM",
    price: "$3,850.00",
    features: [
      "Desarrollo completo de software personalizado",
      "Integración de sistemas avanzados",
      "Consultoría tecnológica continua",
      "y más...",
    ],
    featured: false,
  },
];

export const homepagePackagesEnglish = [
  {
    name: "BASIC",
    price: "$650.00",
    features: [
      "Development of a basic mobile application.",
      "Technical support for 6 months.",
      "Ideal for small businesses looking for an affordable and effective solution.",
      "and more....",
    ],
    featured: false,
  },
  {
    name: "STANDARD",
    price: "$1,290.00",
    features: [
      "Custom software development",
      "System integration",
      "Technical support for 1 year",
      "and more...",
    ],
    featured: true,
  },
  {
    name: "PREMIUM",
    price: "$3,850.00",
    features: [
      "Complete custom software development",
      "Advanced system integration",
      "Continuous technology consulting",
      "and more...",
    ],
    featured: false,
  },
];

// ===========================================
// PRODUCTOS SUGERIDOS (para carrito vacío)
// ===========================================
export const suggestedProductsSpanish: Package[] = [
  {
    id: "auditoria",
    name: "Mini Auditoría de Procesos Tecnológicos",
    price: 580,
    features: [],
  },
  {
    id: "seleccion",
    name: "Asesoría de Selección de Software",
    price: 460,
    features: [],
  },
  {
    id: "revision",
    name: "Revisión de Infraestructura Digital",
    price: 330,
    features: [],
  },
  {
    id: "diagnostico",
    name: "Diagnóstico Básico de Tecnología",
    price: 240,
    features: [],
  },
];

export const suggestedProductsEnglish: Package[] = [
  {
    id: "auditoria",
    name: "Mini Audit of Technological Processes",
    price: 580,
    features: [],
  },
  {
    id: "seleccion",
    name: "Software Selection Consulting",
    price: 460,
    features: [],
  },
  {
    id: "revision",
    name: "Digital Infrastructure Review",
    price: 330,
    features: [],
  },
  {
    id: "diagnostico",
    name: "Basic Technology Diagnostic",
    price: 240,
    features: [],
  },
];
