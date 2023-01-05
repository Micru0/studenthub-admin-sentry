import {Staff} from "./staff";

export class DailyStandupAnswer {
    answer_uuid : string;
    staff_id: number;
    question_uuid: string;
    question: string;
    answer: string;
    staff: Staff;
    created_at: string;
    updated_at: string;
}
