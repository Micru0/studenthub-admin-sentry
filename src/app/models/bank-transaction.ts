import { Contact } from "./contact";

export class BankTransaction {
    bank_transaction_id: number; 
    contact_id: number; 
    currency_rate: number; 
    currency_code: string; 
    has_attachments: boolean; 
    is_reconciled: boolean;
    line_amount_types: string; 
    overpayment_id: string; 
    prepayment_id: string; 
    reference: string; 
    status: string; 
    status_attribute_string: string; 
    sub_total: number; 
    total: number; 
    total_tax: number; 
    type: string; 
    url: string; 
    validation_errors: string; 
    created_at: string; 
    updated_at: string; 
    date: string; 
    contact: Contact;
}