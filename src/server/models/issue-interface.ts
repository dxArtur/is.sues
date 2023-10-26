interface Issue {
    id: string;
    title: string;
    status: boolean;
    department: string;
    description: string;
    authorId: string;
    labelIds: number;
    createdAt: Date;
  }

  export default Issue