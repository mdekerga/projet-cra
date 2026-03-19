import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { UserService } from '../../services/user.service';
import { User } from '../../shared/models/user.model';
import { MissionService } from '../../services/mission.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
  ],
  template: `
    <h2 mat-dialog-title>Assigner une mission</h2>
    <mat-dialog-content>
      <form [formGroup]="form" class="d-flex flex-column gap-3 mt-2">
        <mat-form-field appearance="outline">
          <mat-label>Nom du Client</mat-label>
          <input matInput formControlName="clientName" />
        </mat-form-field>

        <div class="d-flex gap-2">
          <mat-form-field appearance="outline">
            <mat-label>Début</mat-label>
            <input matInput type="date" formControlName="startDate" />
          </mat-form-field>
          <mat-form-field appearance="outline">
            <mat-label>Fin</mat-label>
            <input matInput type="date" formControlName="endDate" />
          </mat-form-field>
        </div>

        <mat-form-field appearance="outline">
          <mat-label>Assigner à...</mat-label>
          <mat-select formControlName="assignedUserId">
            <mat-option *ngFor="let user of users" [value]="user.id">
              {{ user.firstName }} {{ user.lastName }}
            </mat-option>
          </mat-select>
        </mat-form-field>
      </form>
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button (click)="ref.close()">Annuler</button>
      <button mat-raised-button color="primary" [disabled]="form.invalid" (click)="save()">
        Créer
      </button>
    </mat-dialog-actions>
  `,
})
export class MissionDialogComponent implements OnInit {
  form: FormGroup;
  users: User[] = [];

  constructor(
    private fb: FormBuilder,
    public ref: MatDialogRef<MissionDialogComponent>,
    private userService: UserService,
    private missionService: MissionService,
  ) {
    this.form = this.fb.group({
      clientName: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      assignedUserId: [null, Validators.required],
    });
  }

  ngOnInit() {
    this.userService.getAllUsers().subscribe((data) => (this.users = data.filter((u) => u.active)));
  }

  save() {
    this.missionService.create(this.form.value).subscribe(() => this.ref.close(true));
  }
}
