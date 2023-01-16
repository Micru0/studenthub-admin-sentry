export class CandidateEvaluation {
  can_eval_uuid: string;
  candidate_id: number;
  dept_id: number;
  ceq_uuid: string;
  question: string;
  comment: string;
  rating: number;
  staff_id: number;
  created_at: string;
  updated_at: string;
}

export class CandidateEvalDeptQues {
  dept_id: number;
  ceq_uuid: string
}

export class CandidateEvalQues {
  ceq_uuid: string;
  question: string;
  created_at: string;
  updated_at: string;
}


