import { Component, OnInit } from '@angular/core';
import { AdminCraService } from '../../services/admin-cra.service';
import { CRA } from '../../shared/models/cra.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.html',
  standalone: true,
  imports: [CommonModule],
  styleUrls: ['./admin-dashboard.css'],
})
export class AdminDashboardComponent implements OnInit {
  pendingCRAs: CRA[] = [];
  rejectionReason: string = '';
  selectedCraId: number | null = null;

  constructor(private adminCraService: AdminCraService) {}

  ngOnInit(): void {
    this.loadPendingCRAs();
  }

  loadPendingCRAs() {
    this.adminCraService.getSubmittedCRAs().subscribe((data) => {
      this.pendingCRAs = data;
    });
  }

  onApprove(id: number) {
    if (confirm("Approuver ce compte rendu d'activité ?")) {
      this.adminCraService.processCRA(id, true).subscribe(() => {
        this.loadPendingCRAs(); // Rafraîchir la liste
      });
    }
  }

  onReject(id: number) {
    const reason = prompt('Motif du rejet (obligatoire) :');
    if (reason && reason.trim().length > 0) {
      this.adminCraService.processCRA(id, false, reason).subscribe(() => {
        this.loadPendingCRAs();
      });
    } else if (reason !== null) {
      alert('Le motif est obligatoire pour rejeter un CRA.');
    }
  }
}
