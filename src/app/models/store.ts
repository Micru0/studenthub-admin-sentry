import { Candidate } from './candidate';
import {Brand} from "./brand";

export class Store {
    store_id: number;
    company_id: number;
    store_name: string;
    store_location: string;
    store_total_candidates: number;
    store_status: string;
    candidates: Candidate[];
    brand: Brand;
}
