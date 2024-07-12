import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AngularMaterialModule } from '../../angular-material-module';
import { AuthService } from '../auth.service';
import { Club } from '../club';
import { ClubDialogComponent } from '../club-dialog/club-dialog.component';
import { ClubService } from '../club.service';


@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [
    CommonModule,
    AngularMaterialModule
  ],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})
export class AdminComponent implements OnInit {

  clubs: Club[]= []

  constructor(
    private dialog: MatDialog,
    private clubService: ClubService,
    private authService: AuthService, 
    private router: Router
    ) {}

  ngOnInit(): void {
    this.loadClubs();
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  loadClubs(): void {
    this.clubService.getAllClubs().subscribe(clubs => {
      this.clubs = clubs;
    });
  }

  openDialog(club?: Club): void {
    const dialogRef = this.dialog.open(ClubDialogComponent, {
      data: club || {}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (club) {
          this.updateClub(result);
        } else {
          this.createClub(result);
        }
      }
    });
  }

  createClub(club: Club): void {
    this.clubService.createClub(club).subscribe(newClub => {
      this.clubs.push(newClub);
    });
  }

  updateClub(club: Club): void {
    this.clubService.updateClub(club.id, club).subscribe(updatedClub => {
      const index = this.clubs.findIndex(c => c.id === club.id);
      if (index !== -1) {
        this.clubs[index] = updatedClub;
      }
    });
  }

  deleteClub(id: number): void {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You won\'t be able to revert this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.clubService.deleteClub(id).subscribe(() => {
          this.clubs = this.clubs.filter(club => club.id !== id);
          Swal.fire(
            'Deleted!',
            'Your club has been deleted.',
            'success'
          );
        });
      }
    });
  }

}
