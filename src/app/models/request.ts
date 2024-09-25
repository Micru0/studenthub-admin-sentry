import { Staff } from './staff';
import {Company} from './company';
import {Suggestion} from './suggestion';
import { Note } from './note';

export class Request {
    request_uuid: string;
    company_id: number;
    contact_uuid: string;
    request_created_by: number;
    request_updated_by: number;
    request_position_type: number;
    request_job_description: string;
    request_position_title: string;
    request_number_of_employees: number;
    no_of_employees_per_story: number;
    request_additional_info: string;
    request_status: any;
    request_feedback: string;
    request_created_datetime: string;
    request_updated_datetime: string;
    num_hours_followup_interval: any;
    request_started_at: any;
    request_cancelled_at: any;
    request_compensation: any;
    request_assigned_at: any;
    request_finished_at: any;
    request_location: any;
    request_priority: any;
    request_re_worked_at: any;
    request_time_spent: any;
    staff_id: any;
    is_old: any;
    request_delivered_at: any;
    our_fees_unit: string;
    our_fees: number;
    requestCreatedBy: Staff;
    requestUpdatedBy: Staff;
    staffs: Staff[];
    staff: Staff;
    contact: any;
    company: Company;
    stories: Story[];
    suggestions: Suggestion[];
    requestActivities: Note[];
    requestSkills: RequestSkill[];
}

export class RequestSkill {
    request_uuid: string;
    skill: string;
}

export class Story {
    story_uuid: string;
    is_old: string;
    request_uuid: string;
    suggestion_uuid: string;
    staff_id: number;
    story_status: number;
    story_time_spent: number;
    story_created_at: string;
    story_last_updated_at: string;
    request: Request;
    staff: Staff;
    company: Company;
    storyActivities: StoryActivity[];
    latestStoryActivity: StoryActivity;
}

export class StoryActivity {
    story_activity_uuid: string;
    story_uuid: string;
    staff_id: number;
    activity_time_spent: number;
    activity_status	: string;
    activity_created_at: string;
    activity_last_updated_at: string;
    story: Story;
    staff: Staff;
}
enum Status {
    pending,
    started,
    delivered,
    cancelled
}
