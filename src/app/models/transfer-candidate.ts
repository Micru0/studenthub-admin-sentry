import { Candidate } from './candidate';

export class TransferCandidate {
    tc_id: number;
    transfer_confirmation_id: any;
    transfer_id: number; 
    candidate_id: number;
    store_id: number;
    store_name: string;
    company_id: number;
    company_name: string;
    company_email: string;
    candidate_hourly_rate: number;
    company_hourly_rate: number;
    hours: number;
    bonus: number;
    candidate_bonus: number;
    transfer_cost: number;
    paid: number;
    tc_created_at: string;
    tc_updated_at: string;
    total_paid: number;
    total_amount: number;
    profit: number;
    candidate: Candidate;
}