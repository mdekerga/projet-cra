export interface Mission {
  id?: number; 
  clientName: string; 
  startDate: string; 
  endDate: string; 
  assignedUserId: number; 
  assignedUserName?: string; 
  active: boolean; 
}
