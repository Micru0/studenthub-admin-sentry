import { Staff } from './staff';
import {Company} from './company';

export class Request {
    request_uuid: string;
    company_id: number;
    contact_uuid: string;
    request_created_by: number;
    request_updated_by: number;
    request_position_type: number;
    request_position_title: string;
    request_number_of_employees: number;
    request_additional_info: string;
    request_status: any;
    request_feedback: string;
    request_created_datetime: string;
    request_updated_datetime: string;
    num_hours_followup_interval: any;
    request_started_at: any;
    request_cancelled_at: any;
    request_delivered_at: any;
    requestCreatedBy: Staff;
    requestUpdatedBy: Staff;
    staffs: Staff[];
    staff: Staff;
    company: Company;
}

enum Status {
    pending,
    started,
    delivered,
    cancelled
}
