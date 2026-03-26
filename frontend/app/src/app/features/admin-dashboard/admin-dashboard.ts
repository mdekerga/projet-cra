import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { forkJoin } from 'rxjs';
import { UserService } from '../../services/user.service';
import { CraService } from '../../services/cra.service';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatTableModule, MatButtonModule, MatIconModule],
  templateUrl: './admin-dashboard.html',
  styleUrls: ['./admin-dashboard.css'],
})
export class AdminDashboardComponent implements OnInit {
  isSubmissionWindow = false;
  displayedColumns: string[] = ['collaborator', 'month', 'actions'];
  pendingCras: any[] = [];
  stats = {
    totalCollabs: 0,
    intercontratCount: 0,
  };

  constructor(
    private userService: UserService,
    private craService: CraService,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit() {
    const today = new Date().getDate();
    this.isSubmissionWindow = today >= 22 && today <= 28;
    this.loadDashboardData();
  }

  loadDashboardData() {
    forkJoin({
      users: this.userService.getAllUsers(),
      cras: this.craService.getPendingCras(),
    }).subscribe({
      next: (result: any) => {
        // Ajout du type any ici
        // 1. Total des collaborateurs actifs
        this.stats.totalCollabs = result.users.filter((u: any) => u.active).length;

        // 2. CRA en attente
        this.pendingCras = result.cras;

        // 3. Calcul de l'intercontrat
        this.stats.intercontratCount = result.users.filter(
          (u: any) => u.active && !u.hasCurrentMission,
        ).length;

        this.cdr.detectChanges();
      },
      error: (err) => console.error('Erreur dashboard:', err),
    });
  }

  viewCra(id: number) {
    console.log('Détails:', id);
  }

  approve(id: number) {
    this.craService.updateStatus(id, 'APPROVED').subscribe(() => {
      this.loadDashboardData();
    });
  }
}
