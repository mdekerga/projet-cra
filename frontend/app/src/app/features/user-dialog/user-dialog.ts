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
  templateUrl: './user-dialog.html',
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
