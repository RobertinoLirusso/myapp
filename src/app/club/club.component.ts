import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ContentComponent } from '../content/content.component';
import { Club } from '../club'
import { ClubService } from '../club.service';
import { countryList } from './countries';

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
  letters: string[] = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
  countries = countryList;
  clubListService: ClubService = inject(ClubService);

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

  filterResults(text: string) {
    let filtered = this.clubList;

    if (text) {
      filtered = filtered.filter(
        clubContent => clubContent?.name.toLowerCase().includes(text.toLowerCase())
      );
    }

    this.filteredClubList = filtered;
  }

  filterByLetter(event: Event) {
    const selectedLetter = (event.target as HTMLSelectElement).value;

    if (!selectedLetter) {
      this.filteredClubList = this.clubList;
      return;
    }

    this.filteredClubList = this.clubList.filter(
      clubContent => clubContent?.name.startsWith(selectedLetter)
    );
  }

  filterByCountry(event: Event) {
    const selectedCountry = (event.target as HTMLSelectElement).value;

    if (!selectedCountry) {
      this.filteredClubList = this.clubList;
      return;
    }

    this.filteredClubList = this.clubList.filter(
      clubContent => clubContent?.country === selectedCountry
    );
  }


  onSubmit(event: Event) {
    event.preventDefault();
    const inputElement = (event.target as HTMLFormElement).elements.namedItem('filter') as HTMLInputElement;
    this.filterResults(inputElement?.value || '');
  }

  
}
