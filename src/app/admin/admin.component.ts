import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AngularMaterialModule } from '../../angular-material-module';
import { AuthService } from '../auth.service';
import { Club } from '../club';
import { ClubDialogComponent } from '../club-dialog/club-dialog.component';
import { ClubService } from '../club.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';


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

  
  displayedColumns: string[] = ['name', 'city', 'country', 'founded', 'stadium', 'actions'];
  dataSource = new MatTableDataSource<Club>([]);
  clubs: Club[]= [];
  filteredClubs: Club[] = [];
  searchText: string = '';

  @ViewChild(MatPaginator) paginator!: MatPaginator;


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
      this.filteredClubs = clubs;
      this.dataSource.data = this.filteredClubs;
      this.dataSource.paginator = this.paginator;
    });
  }

  filterClubs(): void {
    this.filteredClubs = this.clubs.filter(club => 
      club.name.toLowerCase().includes(this.searchText.toLowerCase()) ||
      club.city.toLowerCase().includes(this.searchText.toLowerCase()) ||
      club.country.toLowerCase().includes(this.searchText.toLowerCase()) ||
      club.founded.toString().includes(this.searchText) ||
      club.stadium.toLowerCase().includes(this.searchText.toLowerCase())
    );
    this.dataSource.data = this.filteredClubs;
    this.dataSource.paginator = this.paginator;
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
      Swal.fire({
        title: 'Success!',
        text: 'The club has been created successfully.',
        icon: 'success',
        confirmButtonText: 'OK'
      });
    });
  }

  updateClub(club: Club): void {
    this.clubService.updateClub(club.id, club).subscribe(updatedClub => {
      const index = this.clubs.findIndex(c => c.id === club.id);
      if (index !== -1) {
        this.clubs[index] = updatedClub;
        Swal.fire({
          title: 'Success!',
          text: 'The club has been updated successfully.',
          icon: 'success',
          confirmButtonText: 'OK'
        });
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
          this.updateDataSource();
          Swal.fire(
            'Deleted!',
            'Your club has been deleted.',
            'success'
          );
        });
      }
    });
  }

  updateDataSource(): void {
    this.filteredClubs = this.clubs;
    this.dataSource.data = this.filteredClubs;
    this.dataSource.paginator = this.paginator;
  }

}
