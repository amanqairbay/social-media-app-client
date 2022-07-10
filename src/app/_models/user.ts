import { Photo } from "./photo";

export interface User {
    id: number;
    email: string;
    username: string;
    name: string;
    surname: string;
    dateOfBirth: Date;
    created: Date;
    lastActive: Date;
    interests?: string;
    gender: string;
    genderId: number;
    status: string;
    statusId: number; 
    city: string;
    cityId: number;
    region: string;
    regionId: number;
    photoUrl: string;
    photos?: Photo[];
}
