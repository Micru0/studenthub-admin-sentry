import { Store } from './store';
import { Company } from './company';
import {Candidate} from "./candidate";
import { Contract } from './contract';
import { Staff } from './staff';


export class CandidateWorkHistory {
    id: number;
    candidate_id: number;
    contract_uuid: string;
    store_id: number;
    company_id: number;
    parent_company_id: number;
    staff_id: number;
    start_date: string;
    end_date: string;
    candidate_hourly_rate: any;
    company_hourly_rate: any;
    transfer_cost: number;
    transferCost: number;

    // Related
    store: Store;
    candidate: Candidate;
    company: Company;
    contract: Contract;
    staff: Staff;
}
