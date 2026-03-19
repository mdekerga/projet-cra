import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-cra-form',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatOptionModule,
    MatButtonModule,
  ],
  templateUrl: './cra-form.html',
  styleUrls: ['./cra-form.css'],
})
export class CraForm {
  @Input() currentCra: any;
  @Output() submitted = new EventEmitter<number>();

  isReadOnly(): boolean {
    if (this.currentCra?.status === 'APPROVED') return true;
    if (this.currentCra?.status === 'SUBMITTED' && !this.isInWindow()) return true;
    return false;
  }

  isWeekend(dateStr: string): boolean {
    const date = new Date(dateStr);
    const day = date.getDay();
    return day === 0 || day === 6;
  }

  fillFullMonth(): void {
    if (!this.currentCra || !this.currentCra.entries) return;

    this.currentCra.entries.forEach((entry: any) => {
      if (!this.isWeekend(entry.date)) {
        entry.type = 'MISSION';
      }
    });
  }

  canSubmit(): boolean {
    const statusPermis = ['DRAFT', 'REJECTED', 'INVALIDATED'];
    return statusPermis.includes(this.currentCra?.status);
  }

  isInWindow(): boolean {
    const day = new Date().getDate();
    return day >= 22 && day <= 28;
  }

  submit(): void {
    if (this.isInWindow() && this.currentCra) {
      this.submitted.emit(this.currentCra.id);
    }
  }
}
