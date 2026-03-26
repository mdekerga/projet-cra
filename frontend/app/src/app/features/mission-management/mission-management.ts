import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { MissionService } from '../../services/mission.service';
import { MissionDialogComponent } from '../mission-dialog/mission-dialog';
import { Mission } from '../../shared/models/mission.model';

@Component({
  selector: 'app-mission-management',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatButtonModule, MatIconModule, MatDialogModule],
  templateUrl: './mission-management.html',
  styleUrls: ['./mission-management.css'],
})
export class MissionManagementComponent implements OnInit {
  missions: Mission[] = [];
  displayedColumns: string[] = ['client', 'titre', 'period', 'collaborator', 'actions'];

  constructor(
    private missionService: MissionService,
    private dialog: MatDialog,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.loadMissions();
  }

  loadMissions(): void {
    this.missionService.getAll().subscribe((data) => {
      this.missions = data;
      console.log(this.missions);
      this.cdr.detectChanges();
    });
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
