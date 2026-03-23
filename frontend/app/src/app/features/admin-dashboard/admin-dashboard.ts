import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
// Importations Material
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table'; // Contient mat-cell, mat-header-cell, etc.
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatTableModule, // <--- Indispensable pour les directives de table
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './admin-dashboard.html',
  styleUrls: ['./admin-dashboard.css'],
})
export class AdminDashboardComponent implements OnInit {
  isSubmissionWindow = false;
  displayedColumns: string[] = ['collaborator', 'month', 'actions'];
  pendingCras: any[] = [];
  stats = { totalCollabs: 0, intercontratCount: 0 };

  ngOnInit() {
    const today = new Date().getDate();
    this.isSubmissionWindow = today >= 22 && today <= 28;
    this.loadDashboardData();
  }

  loadDashboardData() {
    // Data mockée pour le test
    this.stats = { totalCollabs: 12, intercontratCount: 2 };
    this.pendingCras = [
      { id: 101, user: { firstName: 'Alice', lastName: 'Martin' }, month: new Date() },
    ];
  }

  viewCra(id: number) {
    console.log('Détails:', id);
  }
  approve(id: number) {
    console.log('Approuvé:', id);
  }
}
