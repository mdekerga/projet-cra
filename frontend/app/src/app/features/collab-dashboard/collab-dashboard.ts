import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // Pour ngIf, ngClass, pipes
import { RouterModule } from '@angular/router'; // Pour routerLink

// Imports Angular Material
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';

import { CraService } from '../../services/cra.service';
import { CRA } from '../../shared/models/cra.model';

@Component({
  selector: 'app-collab-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
  ],
  templateUrl: './collab-dashboard.html',
  styleUrls: ['./collab-dashboard.css'],
})
export class CraDashboardComponent implements OnInit {
  currentCra: CRA | null = null;
  craHistory: CRA[] = [];
  currentMonthName: string = '';
  currentYear: number = new Date().getFullYear();

  stats = { workDays: 0, offDays: 0 };

  constructor(private craService: CraService) {}

  ngOnInit(): void {
    const now = new Date();
    this.currentMonthName = now.toLocaleString('fr-FR', { month: 'long' });

    const userId = 1;

    this.craService.getCraByMonth(userId, now.getMonth() + 1, now.getFullYear()).subscribe({
      next: (cra) => {
        this.currentCra = cra;
        this.calculateStats();
      },
      error: (err) => console.error('Erreur chargement CRA', err),
    });

    this.craService.getUserHistory(userId).subscribe((history) => {
      this.craHistory = history;
    });
  }

  private calculateStats(): void {
    if (!this.currentCra) return;
    this.stats.workDays = this.currentCra.entries.filter((e) =>
      ['MISSION', 'INTERCONTRAT'].includes(e.type),
    ).length;
    this.stats.offDays = this.currentCra.entries.filter((e) =>
      ['CONGE', 'RTT', 'MALADIE'].includes(e.type),
    ).length;
  }
}
