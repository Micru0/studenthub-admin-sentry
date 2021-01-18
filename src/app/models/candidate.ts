import { Store } from './store';
import { Company } from './company';
import { University } from './university';
import { Country } from './country';
import { Bank } from './bank';
import { Area } from './area';


export class Candidate {
	candidate_id: number;
    candidate_uid: string;
    store_id: number;
    bank_id: number;
    university_id: number;
    country_id: number;
    country_area_uuid: string;
    bank_account_name: string;
    candidate_iban: string;
    candidate_name: string;
    candidate_name_ar: string;
    candidate_personal_photo: string;
    candidate_email: string;
    candidate_phone: string;
    candidate_address_line1: string;
    candidate_birth_date: string;
    candidate_civil_id: number;
    candidate_civil_expiry_date: string;
    candidate_civil_photo_front: string;
    candidate_civil_photo_back: string;
    candidate_hourly_rate: number;
    candidate_committed: any;
    candidate_job_search_status: any;
    candidate_status: number;
    approved: number;
    deleted: boolean;
    isProfileCompleted: boolean;
    age: number;
    employee_id: number;
    candidate_mom_kuwaiti: number;
    candidate_resume: string;
    candidate_video: string;
    candidate_video_processed: any;
    candidate_created_at: string;
    candidate_updated_at: string;
    candidate_gender: number;
    candidate_objective: string;
    candidate_driving_license: number;
    candidateSkills: any[];
    candidateExperiences: any[];

    // Related
    store: Store;
    company: Company;
    university: University;
    country: Country;
    area: Area;
    nationality: Country;
    bank: Bank;
}
