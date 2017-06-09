
import { TransferCandidate } from './transfer-candidate';

export class Transfer {
	transfer_id: number;
	parent_transfer_id: number;
	company_id: number; 
	total: number;
	company_total: number;
	payment_received_on: string;
	transfer_status: number;
	transfer_created_at: string;
	transfer_updated_at: string;
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