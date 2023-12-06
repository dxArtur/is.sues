export interface IssueDto {
    id: string;
    title: string;
    description: string;
    createdAt: Date;
    updatedAt: Date;
    status: boolean;
    labelsId: number[];
    authorId: string;
    departmentId: string;
  }