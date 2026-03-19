
export type DayType = 'MISSION' | 'INTERCONTRAT' | 'CONGE' | 'RTT' | 'MALADIE';

export interface CraEntry {
  date: string;
  type: DayType;
}

export interface CRA {
  id: number;
  month: number;
  year: number;
  status: 'DRAFT' | 'SUBMITTED' | 'APPROVED' | 'REJECTED' | 'INVALIDATED';
  entries: any[];
  user?: {
    firstName: string;
    lastName: string;
    email: string;
  };
  submittedAt?: string; 
  rejectionReason?: string;
}
