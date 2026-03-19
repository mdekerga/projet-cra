import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MissionService } from '../../services/mission.service';
import { MissionDialogComponent } from '../mission-dialog/mission-dialog';
import { Mission } from '../../shared/models/mission.model';

@Component({
  selector: 'app-mission-management',
  standalone: true,
  templateUrl: './mission-management.html',
  styleUrls: ['./mission-management.css'],
})
export class MissionManagementComponent implements OnInit {
  missions: Mission[] = [];
  displayedColumns: string[] = ['client', 'period', 'collaborator', 'actions'];

  constructor(
    private missionService: MissionService,
    private dialog: MatDialog,
  ) {}

  ngOnInit(): void {
    this.loadMissions();
  }

  loadMissions(): void {
    this.missionService.getAll().subscribe((data) => (this.missions = data));
  }

  openMissionDialog(): void {
    const dialogRef = this.dialog.open(MissionDialogComponent, { width: '500px' });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) this.loadMissions();
    });
  }

  deleteMission(id: number): void {
    if (confirm('Supprimer cette mission ?')) {
      this.missionService.delete(id).subscribe(() => this.loadMissions());
    }
  }

  editMission(mission: Mission): void {
    const dialogRef = this.dialog.open(MissionDialogComponent, {
      width: '500px',
      data: { mission },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) this.loadMissions();
    });
  }
}
