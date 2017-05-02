
import { TransferCandidate } from './transfer-candidate';

export class Transfer {
    invoice_id: number; 
	company_id: number; 
	company_name: string;
	company_email: string;
	total: number;
	company_total: number;
	invoice_status: number;
	invoice_created_at: string;
	invoice_updated_at: string;
	profit: number;
	candidates: TransferCandidate[];
	invoices: Invoice[];
}

export class Invoice {
    invoice_id: number;
    transfer_id: number;
    invoice_Date: string;
    invoice_status: string;
}