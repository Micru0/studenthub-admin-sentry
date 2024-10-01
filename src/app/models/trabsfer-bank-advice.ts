import { Admin } from "./admin";

export class TransferBankAdvice {
    tba_uuid: string;
    serial_no: number;
    file_path: string;
    created_by: number;
    created_at: string;
    updated_at: string;
    is_deleted: boolean;
    createdBy: Admin;
}