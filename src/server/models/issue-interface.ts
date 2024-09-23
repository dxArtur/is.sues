interface Issue {
    id: string;
    title: string;
    status: Boolean;
    isAssigned: Boolean;
    department: string;
    description: string;
    authorId: string;
    labelIds: number;
    createdAt: Date;
  }

  export default Issue