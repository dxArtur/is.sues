export interface LabelDto {
    id: number;
    name: string;
    description: string;
    departmentId: string;
  }

  export interface CreateLabelDto {
    name: string;               // Nome do label, obrigatório
    description: string;       // Descrição do label, opcional
    departmentId: string;       // ID do departamento, obrigatório e um UUID
}

export interface GetLabelByIdDTO {
  id: number;
}

export interface UpdateLabelDto {
  id: number;               // ID do label, obrigatório
  name?: string;            // Nome do label, opcional
  description?: string;     // Descrição do label, opcional
  departmentId?: string;    // ID do departamento, opcional
}

