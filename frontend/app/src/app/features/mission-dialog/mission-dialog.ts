import { Component, OnInit, ChangeDetectorRef, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { UserService } from '../../services/user.service';
import { User } from '../../shared/models/user.model';
import { MissionService } from '../../services/mission.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { provideNativeDateAdapter } from '@angular/material/core';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatButtonModule,
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './mission-dialog.html',
})
export class MissionDialogComponent implements OnInit {
  form: FormGroup;
  users: User[] = [];
  isEditMode = false;

  constructor(
    private fb: FormBuilder,
    public ref: MatDialogRef<MissionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private userService: UserService,
    private missionService: MissionService,
    private cdr: ChangeDetectorRef,
  ) {
    this.form = this.fb.group({
      client: ['', Validators.required],
      titre: ['', Validators.required],
      description: [''],
      dateDebut: ['', Validators.required],
      dateFin: ['', Validators.required],
      id: [null, Validators.required],
    });

    if (this.data && this.data.mission) {
      this.isEditMode = true;
      this.form.patchValue(this.data.mission);
    }
  }

  ngOnInit() {
    this.userService.getAllUsers().subscribe((data) => {
      this.users = data.filter((u) => u.active);

      this.cdr.detectChanges();
    });
  }

  save() {
    if (this.form.valid) {
      if (this.isEditMode) {
        const id = this.form.value.id;
        this.missionService.update(id, this.form.value).subscribe(() => this.ref.close(true));
      } else {
        this.missionService.create(this.form.value).subscribe(() => this.ref.close(true));
      }
    }
  }
}
