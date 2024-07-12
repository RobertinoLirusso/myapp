import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AngularMaterialModule } from '../../angular-material-module';
import { Club } from '../club';

@Component({
  selector: 'app-club-dialog',
  standalone: true,
  imports: [
    CommonModule,
    AngularMaterialModule
  ],
  templateUrl: './club-dialog.component.html',
  styleUrl: './club-dialog.component.css'
})
export class ClubDialogComponent {

  club!: Club;

  constructor(
    public dialogRef: MatDialogRef<ClubDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Club
  ) {}

  onSaveClick(): void {
    this.dialogRef.close(this.data);
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }
}
