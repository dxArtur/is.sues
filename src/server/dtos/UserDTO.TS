export interface UserDto {
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