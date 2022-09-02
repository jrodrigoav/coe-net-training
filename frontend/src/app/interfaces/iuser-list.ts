export interface IUserResponse{
    responseResult: IUserSearched[];
    success: boolean;
    errorMessage: string;
}

export interface IUserSearched {
    id: string
    name: string
    userName: string
    email: string
    webSite: string
  }
  