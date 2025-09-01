export type EducationItem = {
    title: string;
    institution: string;
    location: string;
    start: string;   // ISO YYYY-MM-DD
    end?: string;    // ISO o undefined si “Actual”
    website?: string;
    eqfLevel?: 6 | 7; // EQF-MEC cuando aplique
};

export const education: EducationItem[] = [
    {
        title: "Máster en Diseño y Desarrollo de Interfaz Web",
        institution: "UNIR",
        location: "Cáceres, España",
        start: "2025-02-01",
        website: "https://www.unir.net/",
        eqfLevel: 7, // Nivel 7 EQF-MEC
    },
    {
        title: "UX/UI Immersive",
        institution: "USER SCHOOL",
        location: "Cáceres, España",
        start: "2024-03-01",
        end: "2024-07-15",
        website: "https://www.uxerschool.com/",
    },
    {
        title: "Grado en Ingeniería en telecomunicaciones",
        institution: "Universidad de Extremadura",
        location: "Cáceres, España",
        start: "2018-09-15",
        end: "2023-07-15",
        website: "https://www.unex.es/",
        eqfLevel: 6, // Nivel 6 EQF-MEC
    },
];
