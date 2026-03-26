import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { User } from '../../shared/models/user.model';
import { UserService } from '../../services/user.service';

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
    MatSlideToggleModule,
  ],
  templateUrl: './user-dialog.html',
  styleUrl: './user-dialog.css',
})
export class UserDialogComponent implements OnInit {
  userForm!: FormGroup;
  isEditMode: boolean = false;
  userId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<UserDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router,
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
      active: [this.data.user?.active ?? false],
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

  onSubmit() {
    if (this.userForm.valid) {
      const userData = this.userForm.getRawValue();

      const request = this.isEditMode
        ? this.userService.updateUser(this.userId!, userData)
        : this.userService.createUser(userData);

      request.subscribe({
        next: () => {
          alert(this.isEditMode ? 'Utilisateur mis à jour' : 'Utilisateur créé');
          this.router.navigate(['/admin/users']);
        },
        error: (err) => alert(err.error.message || 'Une erreur est survenue'),
      });
    }
  }
}
