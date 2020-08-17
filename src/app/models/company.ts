export class Company {
    company_id: number;
    parent_company_id: number;
    company_name: string;
    company_email: string;
    company_password_hash: string;
    company_bonus_commission: number;
    company_hourly_rate: number;
    company_status: number;
    total_candidates: number;
    total_stores: number;
    total_subcompanies: number;
    subCompanies: Company[];
    files: any[];
}
