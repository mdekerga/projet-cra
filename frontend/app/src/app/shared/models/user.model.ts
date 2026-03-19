export interface User {
  id?: number;
  firstName: string;
  lastName: string;
  email: string;
  role: 'ADMIN' | 'COLLABORATEUR';
  statut: 'MISSION' | 'INTERCONTRAT';
  active: boolean;
  password?: string; 
}
