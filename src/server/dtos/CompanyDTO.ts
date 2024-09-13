export interface CompanyDto {
    id?: string;
    name: string;
    email: string;
    password: string;
    latitude?: number;
    longitude?: number;
    description?: string|null;
    headid?: string|null;
    departments?: String[];
}

export interface UpdateCompanyDto {
    id: string;                  // Obrigatório para identifica
    name?: string;               // Opcional
    email?: string;              // Opcional
    password: string;            // Obrigatório para autorizar
    latitude?: number;
    longitude?: number;
    description?: string | null; // Opcional
    headid?: string|null;
    departments?: string[];      // Opcional
}


