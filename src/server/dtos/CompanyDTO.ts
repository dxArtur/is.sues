export interface CompanyDto {
    id?: string;
    name: string;
    email: string;
    password: string;
    description?: string|null;
    departments?: String[];
}

export interface UpdateCompanyDto {
    id: string;                  // Obrigatório para identifica
    name?: string;               // Opcional
    email?: string;              // Opcional
    password: string;            // Obrigatório para autorizar
    description?: string | null; // Opcional
    departments?: string[];      // Opcional
}


