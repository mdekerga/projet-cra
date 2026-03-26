import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatIcon } from '@angular/material/icon';
import { CraService } from '../../services/cra.service';

interface CraDay {
  date: Date;
  type: 'WORKED' | 'ABSENCE' | 'SICK' | 'EMPTY';
  isWeekend: boolean;
}

@Component({
  selector: 'app-my-cra',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatSelectModule, MatIcon],
  templateUrl: './cra-saisie.html',
  styleUrls: ['./cra-saisie.css'],
})
export class CraSaisie implements OnInit {
  daysInMonth: CraDay[] = [];
  currentMonth = new Date();
  isSubmissionWindow = false;
  isReadOnly = false;

  constructor(private craService: CraService) {}

  ngOnInit() {
    this.checkSubmissionWindow();
    this.generateCalendar();
  }

  checkSubmissionWindow() {
    const day = new Date().getDate();
    this.isSubmissionWindow = day >= 22 && day <= 28;
  }

  generateCalendar() {
    const year = this.currentMonth.getFullYear();
    const month = this.currentMonth.getMonth();
    const numDays = new Date(year, month + 1, 0).getDate();

    this.daysInMonth = [];
    for (let i = 1; i <= numDays; i++) {
      const date = new Date(year, month, i);
      const dayOfWeek = date.getDay();
      this.daysInMonth.push({
        date: date,
        type: 'EMPTY',
        isWeekend: dayOfWeek === 0 || dayOfWeek === 6,
      });
    }
  }

  fillFullMonth() {
    this.daysInMonth.forEach((day) => {
      if (!day.isWeekend) day.type = 'WORKED';
    });
  }

  submitCra() {
    this.craService.submitMyCurrentMonthCra().subscribe({
      next: () => {
        this.isReadOnly = true;
        alert('CRA soumis avec succès.');
      },
      error: (err) => {
        const message = err?.error?.error || "Impossible de soumettre le CRA pour l'instant.";
        alert(message);
      },
    });
  }
}
