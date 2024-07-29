import { Store } from './store';
import { Company } from './company';
import { University } from './university';
import { Country } from './country';
import { Bank } from './bank';
import { Area } from './area';
import { CandidateEducation } from './candidate-education';


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
    candidate_password_hash: string;
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
    candidate_preferred_time: string;
    candidate_job_search_status: any;
    candidate_status: number;
    approved: number;
    deleted: boolean;
    isProfileCompleted: boolean;
    candidate_email_verification: boolean;
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
    currency_code: string;
    candidateSkills: any[];
    candidateExperiences: any[];
    candidateEducations: CandidateEducation[];

    // Related
    store: Store;
    company: Company;
    university: University;
    country: Country;
    area: Area;
    nationality: Country;
    bank: Bank;
}

export class CandidateWorkingHour {
    candidate_working_hour_uuid: string;
    candidate_id: number;
    store_id: number;
    date: string;
    start_time: string;
    end_time: string;
    total_time: number;
    start_location_lat: string;
    start_location_long: string;
    end_location_lat: string;
    end_location_long: string;
    created_at: string;
    updated_at: string;
    store: Store;
    candidate: Candidate;
}
