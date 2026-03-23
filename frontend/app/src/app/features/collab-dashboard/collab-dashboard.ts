import { Component, OnInit } from '@angular/core';
import { CraService } from '../../services/cra.service';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-collab-dashboard',
  templateUrl: './collab-dashboard.html',
  imports: [CommonModule, FormsModule],
  styleUrls: ['./collab-dashboard.css'],
})
export class CollabDashboardComponent implements OnInit {
  currentCRA: any = null;
  selectedMonth: number = new Date().getMonth() + 1;
  selectedYear: number = new Date().getFullYear();
  errorMessage: string = '';

  constructor(
    private craService: CraService,
    private authService: AuthService,
  ) {}

  ngOnInit(): void {}

  onGenerateClick() {
    const userId = this.authService.getUserId();
    this.craService.generateCRA(userId, this.selectedMonth, this.selectedYear).subscribe({
      next: (data) => {
        this.currentCRA = data;
        this.errorMessage = '';
      },
      error: (err) => (this.errorMessage = 'Erreur lors de la génération.'),
    });
  }

  onSubmitCRA() {
    this.craService.submitCRA(this.currentCRA.id).subscribe({
      next: (data) => {
        this.currentCRA = data;
        alert('CRA soumis avec succès !');
      },
      error: (err) => {
        this.errorMessage = err.error.message || 'Erreur de soumission.';
      },
    });
  }
}
