import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ContentComponent } from '../content/content.component';
import { Club } from '../club'
import { ClubService } from '../club.service';

@Component({
  selector: 'app-club',
  standalone: true,
  imports: [CommonModule, ContentComponent],
  templateUrl: './club.component.html',
  styleUrl: './club.component.css'
})
export class ClubComponent implements OnInit {

  clubList: Club[] = []
  filteredClubList: Club[] = [];
  clubListService: ClubService = inject(ClubService);

  filterResults(text: string) {
    if (!text) {
      this.filteredClubList = this.clubList;
      return;
    }
  
    this.filteredClubList = this.clubList.filter(
      clubContent => clubContent?.name.toLowerCase().includes(text.toLowerCase())
    );
  }

  onSubmit(event: Event) {
    event.preventDefault();
    const inputElement = (event.target as HTMLFormElement).elements.namedItem('filter') as HTMLInputElement;
    this.filterResults(inputElement?.value || '');
  }

  constructor(private clubService: ClubService) {}

  ngOnInit(): void {
    this.findAllClubs();
  }

  findAllClubs() {
    this.clubService.getAllClubs().subscribe((data: Club[]) => {
      this.clubList = data;
      this.filteredClubList = this.clubList;
    })
  }
  
}
