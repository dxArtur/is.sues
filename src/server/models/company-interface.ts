import Department from "./department-interface";

interface Company {
    id: string;
    name: string;
    email: String;
    description?: string;
    departments: Department[]
  }
  
  export default Company;
  