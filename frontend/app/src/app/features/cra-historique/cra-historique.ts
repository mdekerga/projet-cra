import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';

export interface CraHistory {
  id: number;
  month: string;
  year: number;
  missionName: string;
  totalDays: number;
  status: 'VALIDE' | 'EN_ATTENTE' | 'REFUSE';
  submissionDate: Date;
}

@Component({
  selector: 'app-cra-historique',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule, MatButtonModule, MatTooltipModule],
  templateUrl: './cra-historique.html',
  styleUrls: ['./cra-historique.css'],
})
export class CraHistorique implements OnInit {
  history: CraHistory[] = [];
  isLoading: boolean = false;

  constructor() {}

  ngOnInit(): void {
    this.loadMyHistory();
  }

  loadMyHistory(): void {
    this.isLoading = true;

    setTimeout(() => {
      this.history = [
        {
          id: 1,
          month: 'Mars',
          year: 2026,
          missionName: 'DevOps API - Client AXA',
          totalDays: 21,
          status: 'EN_ATTENTE',
          submissionDate: new Date('2026-03-01'),
        },
        {
          id: 2,
          month: 'Février',
          year: 2026,
          missionName: 'DevOps API - Client AXA',
          totalDays: 20,
          status: 'VALIDE',
          submissionDate: new Date('2026-02-01'),
        },
        {
          id: 3,
          month: 'Janvier',
          year: 2026,
          missionName: 'Audit Sécurité - Client BNP',
          totalDays: 18,
          status: 'REFUSE',
          submissionDate: new Date('2026-01-02'),
        },
      ];
      this.isLoading = false;
    }, 800);
  }

  viewDetails(id: number): void {
    console.log('Visualisation du CRA ID :', id);
  }

  getStatusColor(status: string): string {
    switch (status) {
      case 'VALIDE':
        return '#1bc5bd';
      case 'EN_ATTENTE':
        return '#ffa800';
      case 'REFUSE':
        return '#f64e60';
      default:
        return '#7e8299';
    }
  }
}
