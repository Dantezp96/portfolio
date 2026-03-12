export type Locale = "en" | "es";

export const LOCALE_KEY = "portfolio-locale";
export const LOCALE_EVENT = "locale-change";

export function getLocale(): Locale {
  if (typeof window === "undefined") return "en";
  return (localStorage.getItem(LOCALE_KEY) as Locale) || "en";
}

export function setLocale(locale: Locale) {
  localStorage.setItem(LOCALE_KEY, locale);
  window.dispatchEvent(new CustomEvent(LOCALE_EVENT, { detail: locale }));
}

export const translations = {
  en: {
    nav: {
      about: "About",
      skills: "Skills",
      projects: "Projects",
      experience: "Experience",
      contact: "Contact",
    },
    hero: {
      greeting: "Hello, I'm",
      tagline: "Building enterprise AI solutions for healthcare — from ETL pipelines processing millions of records to generative AI platforms in production.",
      descriptors: "Data Engineering &bull; Generative AI &bull; Machine Learning &bull; Cloud (Azure)",
      viewWork: "View My Work",
      getInTouch: "Get in Touch",
      scroll: "Scroll down",
    },
    about: {
      title: "About Me",
      subtitle: "Turning complex data into intelligent solutions",
      p1: "Electronic engineer with +3 years of experience in data engineering, applied AI and full-stack development for the healthcare sector. Specialized in Azure cloud architectures, high-performance ETL pipelines, and implementation of generative AI solutions (LLMs, RAG) and Machine Learning (XGBoost, NLP) integrated into production platforms.",
      p2: "Experienced leading the development of multiple enterprise systems with Django, Angular and Celery deployed on Azure Container Apps. My approach combines strong software engineering (Clean Architecture, SOLID) with deep ML fundamentals to build reliable, scalable systems.",
      p3: "Focused on optimizing business processes through technological innovation and digital transformation. Agile methodologies (Scrum, Kanban).",
      yearsExp: "Years Experience",
      recordsClassified: "Records Classified",
      ripsFiles: "RIPS Files / Day",
      aiRules: "AI Rules Learned",
    },
    skills: {
      title: "Skills & Technologies",
      subtitle: "Tools and technologies I work with daily",
      categories: {
        ai: "AI & Machine Learning",
        languages: "Languages & Frameworks",
        dataEng: "Data Engineering",
        cloud: "Cloud & Infrastructure",
      },
    },
    experience: {
      title: "Experience",
      subtitle: "My professional journey",
      present: "Present",
      jobs: [
        {
          role: "Data Engineer & Data Scientist",
          period: "Jul 2023 - Present",
          description: "Design and deployment of enterprise healthcare platforms with AI integration. ETL pipelines processing +1M RIPS files daily with Apache Airflow, reducing ingestion times 40% migrating from Pandas to Polars. Built multi-layer AI classification pipeline (exact match, XGBoost/TF-IDF, LLMs) classifying +17M records. Integrated generative AI (RAG chatbots, contract analysis, intelligent reports) across multiple platforms. Full Azure deployment: Container Apps, ACR, PostgreSQL, Blob Storage, OpenAI Service.",
        },
        {
          role: "Research Assistant / Data Analyst",
          period: "Jul 2020 - Jun 2023",
          description: "Data engineering solutions with Python, Pandas and Polars for large-scale academic data analysis. Implemented ETL pipelines integrating heterogeneous data sources with quality controls. Designed analytical solutions for automated contract evaluation and administrative processes using NLP. Applied research in data science and institutional optimization algorithms.",
        },
        {
          role: "Electronic Designer",
          period: "Jan 2016 - Jun 2020",
          description: "Developed embedded systems with microcontrollers in C, implementing industrial automation and IoT solutions. Designed digital and analog electronic circuits. Led projects integrating hardware and software. Trained students in emerging electronics and embedded systems technologies.",
        },
      ],
    },
    projects: {
      title: "Featured Projects",
      subtitle: "Click on a project to explore it",
      viewDetails: "View Details",
      liveDemo: "Live Demo",
      prev: "Previous project",
      next: "Next project",
    },
    projectDetail: {
      back: "Back to Projects",
      aboutProject: "About this project",
      keyMetrics: "Key Metrics",
      links: "Links",
      liveDemo: "Live Demo",
      sourceCode: "Source Code",
      privateProject: "Enterprise / private project",
      techStack: "Tech Stack",
    },
    contact: {
      title: "Get in Touch",
      subtitle: "Let's build something together",
      name: "Your name",
      email: "Your email",
      subject: "Subject (optional)",
      message: "Your message",
      success: "Message sent!",
      successSub: "I'll get back to you soon.",
      sendAnother: "Send another",
      sending: "Sending...",
      send: "Send Message",
      error: "Something went wrong",
    },
    chat: {
      title: "Portfolio Assistant",
      subtitle: "Ask about Omar's projects & experience",
      tryAsking: "Try asking:",
      q1: "What projects does Omar have?",
      q2: "What tech stack does he use?",
      thinking: "Thinking...",
      rateLimit: "Too many messages. Wait a moment.",
      connectionError: "Connection error. Try again.",
      sendError: "Error sending message",
      placeholder: "Type a message...",
      limitReached: "Message limit reached",
      send: "Send",
    },
    footer: {
      builtWith: "Built with Astro & FastAPI.",
    },
  },
  es: {
    nav: {
      about: "Acerca",
      skills: "Habilidades",
      projects: "Proyectos",
      experience: "Experiencia",
      contact: "Contacto",
    },
    hero: {
      greeting: "Hola, soy",
      tagline: "Construyendo soluciones empresariales de IA para salud — desde pipelines ETL procesando millones de registros hasta plataformas de IA generativa en produccion.",
      descriptors: "Ingenieria de Datos &bull; IA Generativa &bull; Machine Learning &bull; Cloud (Azure)",
      viewWork: "Ver Mi Trabajo",
      getInTouch: "Contactame",
      scroll: "Desplaza hacia abajo",
    },
    about: {
      title: "Sobre Mi",
      subtitle: "Transformando datos complejos en soluciones inteligentes",
      p1: "Ingeniero electronico con +3 anos de experiencia en ingenieria de datos, IA aplicada y desarrollo full-stack para el sector salud. Especializado en arquitecturas cloud Azure, pipelines ETL de alto rendimiento e implementacion de soluciones de IA generativa (LLMs, RAG) y Machine Learning (XGBoost, NLP) integradas en plataformas en produccion.",
      p2: "Experiencia liderando el desarrollo de multiples sistemas empresariales con Django, Angular y Celery desplegados en Azure Container Apps. Mi enfoque combina ingenieria de software solida (Clean Architecture, SOLID) con fundamentos profundos de ML para construir sistemas confiables y escalables.",
      p3: "Enfocado en optimizar procesos de negocio a traves de innovacion tecnologica y transformacion digital. Metodologias agiles (Scrum, Kanban).",
      yearsExp: "Anos de Experiencia",
      recordsClassified: "Registros Clasificados",
      ripsFiles: "Archivos RIPS / Dia",
      aiRules: "Reglas IA Aprendidas",
    },
    skills: {
      title: "Habilidades y Tecnologias",
      subtitle: "Herramientas y tecnologias con las que trabajo diariamente",
      categories: {
        ai: "IA & Machine Learning",
        languages: "Lenguajes & Frameworks",
        dataEng: "Ingenieria de Datos",
        cloud: "Cloud & Infraestructura",
      },
    },
    experience: {
      title: "Experiencia",
      subtitle: "Mi trayectoria profesional",
      present: "Presente",
      jobs: [
        {
          role: "Ingeniero de Datos & Cientifico de Datos",
          period: "Jul 2023 - Presente",
          description: "Diseno y despliegue de plataformas empresariales de salud con integracion de IA. Pipelines ETL procesando +1M archivos RIPS diarios con Apache Airflow, reduciendo tiempos de ingesta 40% migrando de Pandas a Polars. Pipeline de clasificacion IA multi-capa (coincidencia exacta, XGBoost/TF-IDF, LLMs) clasificando +17M registros. Integracion de IA generativa (chatbots RAG, analisis de contratos, reportes inteligentes) en multiples plataformas. Despliegue completo en Azure: Container Apps, ACR, PostgreSQL, Blob Storage, OpenAI Service.",
        },
        {
          role: "Auxiliar de Investigacion / Analista de Datos",
          period: "Jul 2020 - Jun 2023",
          description: "Soluciones de ingenieria de datos con Python, Pandas y Polars para analisis de datos academicos a gran escala. Implementacion de pipelines ETL integrando fuentes de datos heterogeneas con controles de calidad. Diseno de soluciones analiticas para evaluacion automatizada de contratos y procesos administrativos usando NLP. Investigacion aplicada en ciencia de datos y algoritmos de optimizacion institucional.",
        },
        {
          role: "Disenador Electronico",
          period: "Ene 2016 - Jun 2020",
          description: "Desarrollo de sistemas embebidos con microcontroladores en C, implementando automatizacion industrial y soluciones IoT. Diseno de circuitos electronicos digitales y analogicos. Liderazgo de proyectos integrando hardware y software. Capacitacion de estudiantes en tecnologias emergentes de electronica y sistemas embebidos.",
        },
      ],
    },
    projects: {
      title: "Proyectos Destacados",
      subtitle: "Haz clic en un proyecto para explorarlo",
      viewDetails: "Ver Detalles",
      liveDemo: "Demo en Vivo",
      prev: "Proyecto anterior",
      next: "Proyecto siguiente",
    },
    projectDetail: {
      back: "Volver a Proyectos",
      aboutProject: "Sobre este proyecto",
      keyMetrics: "Metricas Clave",
      links: "Enlaces",
      liveDemo: "Demo en Vivo",
      sourceCode: "Codigo Fuente",
      privateProject: "Proyecto empresarial / privado",
      techStack: "Stack Tecnologico",
    },
    contact: {
      title: "Contactame",
      subtitle: "Construyamos algo juntos",
      name: "Tu nombre",
      email: "Tu correo",
      subject: "Asunto (opcional)",
      message: "Tu mensaje",
      success: "Mensaje enviado!",
      successSub: "Te respondere pronto.",
      sendAnother: "Enviar otro",
      sending: "Enviando...",
      send: "Enviar Mensaje",
      error: "Algo salio mal",
    },
    chat: {
      title: "Asistente del Portafolio",
      subtitle: "Pregunta sobre los proyectos y experiencia de Omar",
      tryAsking: "Intenta preguntar:",
      q1: "Que proyectos tiene Omar?",
      q2: "Que tecnologias usa?",
      thinking: "Pensando...",
      rateLimit: "Demasiados mensajes. Espera un momento.",
      connectionError: "Error de conexion. Intenta de nuevo.",
      sendError: "Error enviando mensaje",
      placeholder: "Escribe un mensaje...",
      limitReached: "Limite de mensajes alcanzado",
      send: "Enviar",
    },
    footer: {
      builtWith: "Construido con Astro & FastAPI.",
    },
  },
} as const;

export type Translations = (typeof translations)["en"];
