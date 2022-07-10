import { ICity } from "./city";

export interface IRegion{
    id: number;
    name: string;
    cities: ICity[];
}