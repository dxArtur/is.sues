export interface CompanyDto {
    id: string;
    name: string;
    email: string;
    password: string;
    description?: string|null;
    departments?: String[];
  }