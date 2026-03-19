import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { User } from '../../shared/models/user.model';

export interface DialogData {
  mode: 'create' | 'edit';
  user?: User;
}

@Component({
  selector: 'app-user-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
  ],
  template: `
    <div class="dialog-header">
      <h2 mat-dialog-title>
        <mat-icon color="primary" class="me-2">{{ isEditMode ? 'edit' : 'person_add' }}</mat-icon>
        {{ isEditMode ? 'Modifier' : 'Nouveau' }} Collaborateur
      </h2>
      <button mat-icon-button (click)="onCancel()" class="close-button">
        <mat-icon>close</mat-icon>
      </button>
    </div>

    <mat-dialog-content>
      <form [formGroup]="userForm" class="form-container">
        <div class="row">
          <div class="col-md-6">
            <mat-form-field appearance="outline" class="full-width">
              <mat-label>Prénom</mat-label>
              <input matInput formControlName="firstName" placeholder="Jean" />
              <mat-error *ngIf="userForm.get('firstName')?.hasError('required')"
                >Prénom obligatoire</mat-error
              >
            </mat-form-field>
          </div>
          <div class="col-md-6">
            <mat-form-field appearance="outline" class="full-width">
              <mat-label>Nom</mat-label>
              <input matInput formControlName="lastName" placeholder="Dupont" />
              <mat-error *ngIf="userForm.get('lastName')?.hasError('required')"
                >Nom obligatoire</mat-error
              >
            </mat-form-field>
          </div>
        </div>

        <mat-form-field appearance="outline" class="full-width">
          <mat-label>Email Professionnel</mat-label>
          <input
            matInput
            formControlName="email"
            type="email"
            placeholder="jean.dupont@entreprise.fr"
          />
          <mat-icon matSuffix>email</mat-icon>
          <mat-error *ngIf="userForm.get('email')?.hasError('required')"
            >Email obligatoire</mat-error
          >
          <mat-error *ngIf="userForm.get('email')?.hasError('email')"
            >Format email invalide</mat-error
          >
        </mat-form-field>

        <mat-form-field appearance="outline" class="full-width">
          <mat-label>Rôle</mat-label>
          <mat-select formControlName="role">
            <mat-option value="COLLABORATEUR">Collaborateur</mat-option>
            <mat-option value="ADMIN">Administrateur (RH/Compta)</mat-option>
          </mat-select>
        </mat-form-field>

        <div *ngIf="!isEditMode" class="alert alert-info shadow-sm d-flex align-items-center">
          <mat-icon class="me-2">info</mat-icon>
          <span
            >Le compte sera créé comme <strong>"Désactivé"</strong>. Un email sera envoyé pour
            définir le mot de passe.</span
          >
        </div>
      </form>
    </mat-dialog-content>

    <mat-dialog-actions align="end">
      <button mat-button (click)="onCancel()">Annuler</button>
      <button mat-raised-button color="primary" [disabled]="userForm.invalid" (click)="onSave()">
        {{ isEditMode ? 'Enregistrer les modifications' : 'Créer le compte' }}
      </button>
    </mat-dialog-actions>
  `,
  styles: [
    `
      .dialog-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        position: relative;
      }
      .close-button {
        position: absolute;
        top: 10px;
        right: 10px;
      }
      .form-container {
        display: flex;
        flex-direction: column;
        gap: 10px;
        padding-top: 15px;
      }
      .full-width {
        width: 100%;
      }
      ::ng-deep .mat-mdc-dialog-content {
        max-height: 80vh !important;
      }
    `,
  ],
})
export class UserDialogComponent implements OnInit {
  userForm!: FormGroup;
  isEditMode: boolean = false;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<UserDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) {}

  ngOnInit(): void {
    this.isEditMode = this.data.mode === 'edit';

    this.userForm = this.fb.group({
      firstName: [this.data.user?.firstName || '', Validators.required],
      lastName: [this.data.user?.lastName || '', Validators.required],
      email: [
        { value: this.data.user?.email || '', disabled: this.isEditMode },
        [Validators.required, Validators.email],
      ],
      role: [this.data.user?.role || 'COLLABORATEUR', Validators.required],
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    if (this.userForm.valid) {
      this.dialogRef.close(this.userForm.getRawValue());
    }
  }
}
