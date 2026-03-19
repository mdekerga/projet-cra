import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

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

  pendingCRAs = [
    { id: 1, userName: 'Jean Dupont', month: 'Mars 2026', mission: 'DevOps API', totalDays: 21 },
    {
      id: 2,
      userName: 'Alice Martin',
      month: 'Mars 2026',
      mission: 'Migration Cloud',
      totalDays: 19,
    },
    {
      id: 3,
      userName: 'Marc Durand',
      month: 'Février 2026',
      mission: 'Audit Sécurité',
      totalDays: 20,
    },
  ];

  constructor(private snackBar: MatSnackBar) {}

  ngOnInit(): void {}

  approveCRA(id: number): void {
    this.pendingCRAs = this.pendingCRAs.filter((cra) => cra.id !== id);
    this.snackBar.open('CRA approuvé avec succès !', 'Fermer', { duration: 3000 });
  }

  rejectCRA(id: number): void {
    const reason = prompt('Motif du refus :');
    if (reason) {
      this.pendingCRAs = this.pendingCRAs.filter((cra) => cra.id !== id);
      this.snackBar.open('CRA renvoyé pour modification.', 'Fermer', { duration: 3000 });
    }
  }
}
