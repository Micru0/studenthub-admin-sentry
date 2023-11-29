import { StaffNotification } from "./staff-notification";

export class Staff{
    staff_id: number;
    staff_name: string;
    staff_job_title: string;
    staff_email: string;
    staff_password_hash: string;
    staff_gmail_username: string;
    staff_gmail_password: string;
    staff_role: number;
    staff_salary: string;
    staff_photo: string;
    staff_salary_currency: string;
    hours_per_day: number;
    week_start_day: number;
    work_days: number;
    staff_status: string;
    staff_notification: boolean | number;
    staff_created_at: string;
    staff_updated_at: string;
    totalAssigned: number;
    totalRequests: number;
    totalStories: number;
    totalNotes: number;
    deleted: number;
    totalInvitations: number;
    totalSuggestions: number;
    totalRejectedInvitations: number;
    totalAcceptedInvitations:number;
    permissions:any[];
    staffNotifications: StaffNotification[];
}
