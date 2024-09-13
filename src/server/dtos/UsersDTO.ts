export interface UsersDto {
    id?: string;
    name: string;
    email: string;
    password: string;
    occupation: string;
    adm: boolean;
    photo?: string;
    departmentId?: string;
    issues?: string[];
  }