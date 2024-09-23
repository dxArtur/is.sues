export interface IssueDto {
    id: string;
    title: string;
    description: string;
    createdAt: Date;
    updatedAt: Date;
    status: boolean;
    isAssigned: boolean;
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
  status?: Boolean;
  isAssigned?: Boolean;
  departmentId?: string;    
  authorId?: string; 
  assignedUserId?: string;     
}



