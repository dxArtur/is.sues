export interface DepartmentDto {
    id: string;
    name: string;
    companyId: string;
    issues?: String[]|null;
    labels?: String[]|null;
    users?: String[]|null;
  }

export interface DepartmentCreateDto {
    name: string;
    companyId: string;
}
export interface UpdateDepartmentDto {
  id: string;         
  name?: string;     
  companyId?: string;
}
