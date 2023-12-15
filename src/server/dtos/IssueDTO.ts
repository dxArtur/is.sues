export interface IssueDto {
    id: string;
    title: string;
    description: string;
    createdAt: Date;
    updatedAt: Date;
    status: boolean;
    authorId: string;
    departmentId: string;
  }

  export interface CreateIssueDto {
    title: string;
    description: string;
    departmentId: string;
    authorId: string;
}

export interface UpdateIssueDto {
  id: string;               
  title?: string;          
  description?: string;   
  departmentId?: string;    
  authorId?: string;      
}



