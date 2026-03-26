import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

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
  stats = { totalCollabs: 0, intercontratCount: 0 };

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    const today = new Date().getDate();
    this.isSubmissionWindow = today >= 22 && today <= 28;
    this.loadDashboardData();
  }

  loadDashboardData() {
    this.stats = { totalCollabs: 12, intercontratCount: 2 };
    this.pendingCras = [
      { id: 101, user: { firstName: 'Alice', lastName: 'Martin' }, month: new Date() },
    ];
    this.cdr.detectChanges();
  }

  viewCra(id: number) {
    console.log('Détails:', id);
  }
  approve(id: number) {
    console.log('Approuvé:', id);
  }
}
