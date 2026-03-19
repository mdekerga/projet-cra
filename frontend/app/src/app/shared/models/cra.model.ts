import { User } from './user.model';

export interface Mission {
  id: number;
  name: string;
  clientName: string;
}

export enum ActivityType {
  WORK = 'WORK',
  CONGE = 'CONGE',
  RTT = 'RTT',
  MALADIE = 'MALADIE',
}

export interface CRADay {
  id?: number;
  date: string;
  activityType: ActivityType;
  duration: number;
  mission?: Mission;
}

export interface CRA {
  id: number;
  month: number;
  year: number;
  status: 'DRAFT' | 'SUBMITTED' | 'APPROVED' | 'REJECTED';
  rejectionReason?: string;
  submittedAt?: string;
  days: CRADay[];
  user?: User;
}
