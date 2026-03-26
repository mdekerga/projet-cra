import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ProgressSpinnerMode, MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { UserService } from '../../services/user.service';
import { User } from '../../shared/models/user.model';
import { UserDialogComponent } from '../user-dialog/user-dialog';

@Component({
  selector: 'app-user-management',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatTooltipModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './user-management.html',
  styleUrls: ['./user-management.css'],
})
export class UserManagementComponent implements OnInit {
  displayedColumns: string[] = ['name', 'email', 'role', 'status', 'actions'];

  dataSource: User[] = [];

  errorMessage: string = '';

  constructor(
    private userService: UserService,
    private dialog: MatDialog,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.errorMessage = '';

    this.userService.getAllUsers().subscribe({
      next: (data) => {
        this.dataSource = data;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Erreur lors du chargement des utilisateurs', err);
        this.errorMessage =
          'Impossible de charger les utilisateurs. Vérifiez la connexion au backend.';
      },
    });
  }

  openAddUserDialog(): void {
    const dialogRef = this.dialog.open(UserDialogComponent, {
      width: '450px',
      data: { mode: 'create' },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.userService.createUser(result).subscribe({
          next: () => {
            this.loadUsers();
          },
          error: (err) => console.error('Erreur de création', err),
        });
      }
    });
  }

  openEditUserDialog(user: User): void {
    const dialogRef = this.dialog.open(UserDialogComponent, {
      width: '450px',
      data: { mode: 'edit', user: user },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result && user.id) {
        this.userService.updateUser(user.id, result).subscribe({
          next: () => this.loadUsers(),
          error: (err) => console.error('Erreur de mise à jour', err),
        });
      }
    });
  }

  toggleStatus(user: User): void {
    if (user.id) {
      this.userService.toggleUserStatus(user.id).subscribe({
        next: () => this.loadUsers(),
        error: (err) => console.error('Erreur de changement de statut', err),
      });
    }
  }
}
