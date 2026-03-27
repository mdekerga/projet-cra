import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { AdminCraService, AdminSubmittedCra } from '../../services/admin-cra.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatSnackBarModule,
  ],
  templateUrl: './admin-dashboard.html',
  styleUrls: ['./admin-dashboard.css'],
})
export class AdminDashboardComponent implements OnInit {
  isSubmissionWindow = false;
  displayedColumns: string[] = ['collaborator', 'period', 'mission', 'days', 'actions'];
  pendingCras: AdminSubmittedCra[] = [];
  stats = { totalCollabs: 0, intercontratCount: 0 };

  constructor(
    private cdr: ChangeDetectorRef,
    private adminCraService: AdminCraService,
    private userService: UserService,
    private snackBar: MatSnackBar,
  ) {}

  ngOnInit() {
    const today = new Date().getDate();
    this.isSubmissionWindow = today >= 22 && today <= 28;
    this.loadDashboardData();
  }

  loadDashboardData() {
    // Charger les utilisateurs et les CRA soumis en parallèle
    this.userService.getAllUsers().subscribe((users) => {
      this.stats.totalCollabs = users.length;
      this.stats.intercontratCount = users.filter((u) => u.statut === 'INTERCONTRAT').length;
      this.cdr.detectChanges();
    });

    this.adminCraService.getSubmittedCRAs().subscribe((cras) => {
      this.pendingCras = cras;
      this.cdr.detectChanges();
    });
  }

  viewCra(id: number) {
    console.log('Détails:', id);
  }

  getCraMonthLabel(cra: AdminSubmittedCra): string {
    if (!cra?.month || !cra?.year) {
      return '-';
    }

    const monthDate = new Date(cra.year, cra.month - 1, 1);
    return monthDate.toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' });
  }

  approve(id: number) {
    this.adminCraService.processCRA(id, true).subscribe(() => {
      this.loadDashboardData();
    });
  }

  reject(id: number) {
    const reason = prompt('Motif du refus :');
    if (!reason || !reason.trim()) {
      this.snackBar.open('Le motif de refus est obligatoire.', 'Fermer', { duration: 3000 });
      return;
    }

    this.adminCraService.processCRA(id, false, reason.trim()).subscribe({
      next: () => {
        this.snackBar.open('CRA refusé et renvoyé au collaborateur.', 'Fermer', { duration: 3000 });
        this.loadDashboardData();
      },
      error: () => {
        this.snackBar.open('Impossible de refuser ce CRA.', 'Fermer', { duration: 3000 });
      },
    });
  }
}
