import { Country } from "./country.module";

export interface Division {
    id: number;
    name?: string;   // make optional to fix the error
    country?: Country;
    districts?: number[];
}