import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../shared/models/user.model';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.html',
  imports: [CommonModule],
  standalone: true,
  styleUrls: ['./user-management.css'],
})
export class UserManagementComponent implements OnInit {
  users: User[] = [];
  loading: boolean = false;
  errorMessage: string = '';

  constructor(
    private userService: UserService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.loading = true;
    this.userService.getAllUsers().subscribe({
      next: (data) => {
        this.users = data;
        this.loading = false;
      },
      error: (err) => {
        this.errorMessage = 'Impossible de charger les utilisateurs.';
        this.loading = false;
      },
    });
  }

  toggleUserStatus(user: User): void {
    if (user.id) {
      const newStatus = !user.active;
      this.userService.toggleActivation(user.id, newStatus).subscribe({
        next: () => {
          user.active = newStatus;
        },
        error: () => alert('Erreur lors du changement de statut.'),
      });
    }
  }

  editUser(id: number): void {
    this.router.navigate(['/admin/users/edit', id]);
  }
}
