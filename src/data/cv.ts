// src/data/cv.ts
export type Experience = {
    company: string;
    role: string;
    location: string;
    start: string; // ISO o "MMM YYYY"
    end: string;   // "Actual" o fecha
    bullets: string[];
    };

    export const aboutText: string[] = [
    "Desarrollador front-end con más de dos años de experiencia en desarrollo web y base sólida en QA. He trabajado en proyectos para empresas como Orange, Movistar, Bedrock Streaming y CaixaBank, participando tanto en testing como en desarrollo con tecnologías como HTML, CSS, JavaScript, Angular, React, SQL y Python.",
    "Actualmente, en MB3, he liderado un equipo de desarrollo en un proyecto creado desde cero, combinando diseño, desarrollo y toma de decisiones técnicas. Trabajo a menudo con metodologías ágiles (Scrum y Kanban) y participo en ceremonias como dailies, sprint plannings, reviews y retrospectives, enfocándome en la calidad del producto y la mejora continua."
    ];

    export const skills = {
    lenguajes: ["HTML", "CSS", "JavaScript", "TypeScript", "Python", "SQL"],
    frameworks: ["React", "Angular"],
    herramientas: ["Git", "GitHub", "Figma", "Jira", "TestLink", "Illustrator", "Slack", "Discord"],
    metodologias: ["Scrum", "Kanban", "CI/CD básico", "Responsive Design", "Usabilidad"],
    soft: ["Trabajo en equipo", "Liderazgo", "Comunicación", "Organización", "Resolución de problemas", "Pensamiento analítico"],
    idiomas: ["Inglés (B2)"]
    };

    export const timeline: Experience[] = [
    {
        company: "MB3-Gestión",
        role: "Analista Programador",
        location: "Mérida, España",
        start: "Ago 2025",
        end: "Actualidad",
        bullets: [
        "Desarrollo de aplicaciones para proyectos de Teléfonica.",
        "Integración básica backend: SQL, consumo de APIs y Python puntual.",
        "Coordinación con producto, diseño y QA para alinear entregas y optimizar UX."
        ]
    },
    {
        company: "Jaippy",
        role: "Asistente de departamento de ventas",
        location: "Badajoz, España",
        start: "Feb 2025",
        end: "Jul 2025",
        bullets: [
        "Prospección de clientes potenciales (BBDD, RRSS y otras fuentes).",
        "Contacto inicial con leads (llamadas, emails, mensajes).",
        "Cualificación de leads y traspaso a equipo de ventas.",
        "Registro y seguimiento en herramientas CRM.",
        "Apoyo en planificación de reuniones/demos y sesiones de feedback para mejorar el proceso."
        ]
    },
    {
        company: "Jaippy",
        role: "Desarrollador web",
        location: "Badajoz, España",
        start: "Ago 2023",
        end: "Jul 2025",
        bullets: [
        "Desarrollo desde cero de una aplicación web (análisis, diseño, desarrollo, pruebas y despliegue).",
        "UI con HTML, CSS y JavaScript con diseño responsive y usabilidad.",
        "Exploración/uso de frameworks modernos (Angular, React).",
        "Liderazgo técnico: reparto de tareas, code reviews y decisiones técnicas.",
        "Gestión ágil (Scrum/Kanban): dailies, plannings, reviews y retrospectivas.",
        "Integración básica backend: SQL, consumo de APIs y Python puntual.",
        "Definición de roadmap técnico, estimaciones y planificación de sprints.",
        "Coordinación con producto, diseño y QA para alinear entregas y optimizar UX."
        ]
    },
    {
        company: "NTT DATA",
        role: "Ingeniería de control de calidad",
        location: "Cáceres, España",
        start: "Mar 2023",
        end: "Ago 2023",
        bullets: [
        "Pruebas funcionales y de regresión según requisitos.",
        "Diseño/ejecución de casos de prueba y gestión de bugs.",
        "Trabajo en Scrum/Kanban y colaboración estrecha con desarrollo/negocio."
        ]
    },
    {
        company: "Optiva Media",
        role: "Ingeniería de control de calidad",
        location: "Cáceres, España",
        start: "Jun 2022",
        end: "Feb 2023",
        bullets: [
        "Pruebas funcionales e integración para Orange, Movistar y Bedrock Streaming.",
        "Mantenimiento de casos de prueba y scripts de automatización.",
        "Testing en integración continua, reporte/seguimiento de incidencias y mejora de procesos.",
        "Participación en ceremonias ágiles para alinear prioridades."
        ]
    }
];
