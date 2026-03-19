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
  templateUrl: 'mission-dialog.html',
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
