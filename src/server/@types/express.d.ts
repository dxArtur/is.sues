declare namespace Express{
    export interface Request{
      user:{
          id: string;
          name:string;
          adm: boolean;
          department: string;
      }
    }
  }