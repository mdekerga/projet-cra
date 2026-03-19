import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

import { AuthService } from '../../services/auth.service';
@Component({
  selector: 'app-activate',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatSnackBarModule,
  ],
  templateUrl: './activate.html',
  styleUrls: ['./activate.css'],
})
export class ActivateComponent implements OnInit {
  activateForm: FormGroup;
  hidePassword = true; 
  isLoading = false;

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar,
  ) {
    this.activateForm = this.fb.group(
      {
        email: [{ value: '', disabled: true }, [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', [Validators.required]],
      },
      { validator: this.passwordMatchValidator },
    );
  }

  ngOnInit(): void {
    const emailFromUrl = this.route.snapshot.queryParamMap.get('email');
    if (emailFromUrl) {
      this.activateForm.patchValue({ email: emailFromUrl });
    }
  }

  passwordMatchValidator(g: FormGroup) {
    return g.get('password')?.value === g.get('confirmPassword')?.value ? null : { mismatch: true };
  }

  onSubmit(): void {
    if (this.activateForm.valid) {
      this.isLoading = true;
      const payload = this.activateForm.getRawValue();

      this.authService.activate(payload).subscribe({
        next: () => {
          this.snackBar.open('Compte activé avec succès !', 'OK', { duration: 3000 });
          this.router.navigate(['/login']);
        },
        error: (err: any) => {
          this.isLoading = false;
          this.snackBar.open("Erreur lors de l'activation. Lien expiré ou invalide.", 'Fermer');
        },
      });
    }
  }
}
