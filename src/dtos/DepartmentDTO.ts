export interface DepartmentDto {
    id: string;
    name: string;
    companyId: string;
    issues?: String[]|null;
    labels?: String[]|null;
    users?: String[]|null;
  }