import { IUser } from "./iuser";

export interface IAlbum {
    userId: number,
    id: number,
    title: string,
    user?: IUser
}
