import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { CraService } from '../../services/cra.service';

type CraStatus = 'DRAFT' | 'SUBMITTED' | 'APPROVED' | 'REJECTED';

interface MissionSummary {
  name: string;
  client: string;
  startDate: string;
  endDate: string;
}

interface CollabDashboardResponse {
  firstName: string;
  craStatus: CraStatus;
  rejectionReason: string;
  currentMission: MissionSummary | null;
}

@Component({
  selector: 'app-dashboard-collab',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule, RouterModule],
  templateUrl: './collab-dashboard.html',
  styleUrls: ['./collab-dashboard.css'],
})
export class CollabDashboard implements OnInit {
  currentMonth = new Date();
  craStatus: CraStatus = 'DRAFT';
  rejectionReason = '';
  isSubmissionWindow = false;
  firstName = '';

  currentMission: MissionSummary | null = null;

  constructor(private craService: CraService) {}

  ngOnInit() {
    const day = new Date().getDate();
    this.isSubmissionWindow = day >= 22 && day <= 28;
    this.loadDashboardData();
  }

  loadDashboardData() {
    this.craService.getMyDashboard().subscribe((data: CollabDashboardResponse) => {
      this.firstName = data.firstName;
      this.craStatus = data.craStatus;
      this.rejectionReason = data.rejectionReason || '';
      this.currentMission = data.currentMission;
    });
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
