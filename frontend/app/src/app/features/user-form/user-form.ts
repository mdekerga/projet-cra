import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { User } from '../../shared/models/user.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.html',
  imports: [CommonModule, ReactiveFormsModule],
})
export class UserFormComponent implements OnInit {
  userForm: FormGroup;
  isEditMode = false;
  userId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router,
  ) {
    this.userForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      role: ['COLLABORATEUR', Validators.required],
      statut: ['INTERCONTRAT'],
      active: [true],
    });
  }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.userId = +id;
      this.loadUser(this.userId);
    }
  }

  loadUser(id: number) {
    this.userService.getUserById(id).subscribe((user: User) => {
      this.userForm.patchValue(user);
      this.userForm.get('email')?.disable();
    });
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
