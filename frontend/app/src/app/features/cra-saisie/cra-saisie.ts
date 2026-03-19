import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-cra-saisie',
  imports: [CommonModule, MatIconModule, MatButtonModule],
  templateUrl: './cra-saisie.html',
  styleUrl: './cra-saisie.css',
})
export class CraSaisie implements OnInit {
  weekDays = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'];
  monthDays: any[] = [];
  totalWorkedDays = 0;

  ngOnInit() {
    this.generateCalendar();
  }

  generateCalendar() {
    for (let i = 1; i <= 31; i++) {
      this.monthDays.push({ day: i, isWorked: true, isWeekend: i % 7 == 0 || i % 7 == 6 });
    }
    this.calculateTotal();
  }

  toggleDay(date: any) {
    if (date.isWeekend) return;
    date.isWorked = !date.isWorked;
    this.calculateTotal();
  }

  calculateTotal() {
    this.totalWorkedDays = this.monthDays.filter((d) => d.isWorked && !d.isWeekend).length;
  }
  submitCRA() {
    console.log('CRA envoyé !');
  }
}
