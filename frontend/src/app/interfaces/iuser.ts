import { ICountry } from "./icountry"

export interface IUser {
    id: number,
    name: string
    username: string,
    email: string,
    phone: string,
    website: string,

    countryId: string,
    country?: ICountry
}
