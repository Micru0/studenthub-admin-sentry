import {Staff} from "src/app/models/staff";

export class StaffLeave {
    staff_leave_uuid: string;
    staff_id: number;
    from_date: string;
    to_date: string;
    note: string;
    category: string;
    file: string;
    status: number;
    statusLbl: string;
    categoryLbl: string;
    created_at: string;
    updated_at: string;
    staff: Staff;
}
