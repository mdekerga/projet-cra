import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { AdminCraService, AdminSubmittedCra } from '../../services/admin-cra.service';

@Component({
  selector: 'app-cra-validation',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    MatSnackBarModule,
  ],
  templateUrl: './cra-validation-component.html',
  styleUrl: './cra-validation-component.css',
})
export class CraValidationComponent implements OnInit {
  displayedColumns: string[] = ['collaborator', 'period', 'mission', 'days', 'actions'];

  pendingCRAs: AdminSubmittedCra[] = [];

  constructor(
    private snackBar: MatSnackBar,
    private adminCraService: AdminCraService,
  ) {}

  ngOnInit(): void {
    this.loadSubmittedCRAs();
  }

  loadSubmittedCRAs(): void {
    this.adminCraService.getSubmittedCRAs().subscribe({
      next: (cras) => {
        this.pendingCRAs = cras;
      },
      error: () => {
        this.snackBar.open('Impossible de charger les CRA à valider.', 'Fermer', {
          duration: 3000,
        });
      },
    });
  }

  getPeriodLabel(cra: AdminSubmittedCra): string {
    const monthDate = new Date(cra.year, cra.month - 1, 1);
    return monthDate.toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' });
  }

  approveCRA(id: number): void {
    this.adminCraService.processCRA(id, true).subscribe({
      next: () => {
        this.pendingCRAs = this.pendingCRAs.filter((cra) => cra.id !== id);
        this.snackBar.open('CRA approuvé avec succès !', 'Fermer', { duration: 3000 });
      },
      error: () => {
        this.snackBar.open("Impossible d'approuver ce CRA.", 'Fermer', { duration: 3000 });
      },
    });
  }

  rejectCRA(id: number): void {
    const reason = prompt('Motif du refus :');
    if (reason) {
      this.adminCraService.processCRA(id, false, reason).subscribe({
        next: () => {
          this.pendingCRAs = this.pendingCRAs.filter((cra) => cra.id !== id);
          this.snackBar.open('CRA renvoyé pour modification.', 'Fermer', { duration: 3000 });
        },
        error: () => {
          this.snackBar.open('Impossible de refuser ce CRA.', 'Fermer', { duration: 3000 });
        },
      });
    }
  }
}
