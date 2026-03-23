import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-dashboard-collab',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule, RouterModule],
  templateUrl: './collab-dashboard.html',
  styleUrls: ['./collab-dashboard.css'],
})
export class CollabDashboard implements OnInit {
  currentMonth = new Date();
  craStatus: 'DRAFT' | 'SUBMITTED' | 'APPROVED' | 'REJECTED' = 'DRAFT';
  rejectionReason = '';
  isSubmissionWindow = false;

  currentMission = {
    name: 'Projet Cloud AWS',
    client: 'Société Générale',
    startDate: new Date(2026, 2, 1),
    endDate: new Date(2026, 11, 31),
  };

  ngOnInit() {
    const day = new Date().getDate();
    this.isSubmissionWindow = day >= 22 && day <= 28;
    // Ici, vous feriez un appel API pour récupérer le vrai statut du CRA
    this.craStatus = 'DRAFT';
  }

  getStatusClass() {
    return {
      'status-draft': this.craStatus === 'DRAFT',
      'status-submitted': this.craStatus === 'SUBMITTED',
      'status-approved': this.craStatus === 'APPROVED',
      'status-rejected': this.craStatus === 'REJECTED',
    };
  }
}
