export interface ITabsResponse{
    responseResult: Itab[];
    success: boolean;
    errorMessage: string;
}

export interface Itab {
    id: number,
    name: string,
    label: string,
    status: boolean
}

export interface IComboTab {
    id: number,
    name: string
}