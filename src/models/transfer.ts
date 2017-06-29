
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
	company_name: string;
	company_email: string;
	total_transfer_cost: number;
	
	//extra field 
	total_paid: number;
	total_unpaid: number;
	profit: number;
	candidates: TransferCandidate[];
	invoices: Invoice[];
}

export class Invoice {
    invoice_id: number;
    transfer_id: number;
    invoice_date: string;
    invoice_status: string;
	invoice_total: number;
}