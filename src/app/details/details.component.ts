import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Club } from '../club';
import { ClubService } from '../club.service';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css'
})
export class DetailsComponent implements OnInit {
  route: ActivatedRoute = inject(ActivatedRoute);
  clubListService = inject(ClubService);
  clubList: Club | undefined;

  constructor(private clubService: ClubService) {}

  findClubDetails(id:number): void {
    this.clubService.getClubContentById(id).subscribe((data: Club) => {
      this.clubList = data;
    })
  }
  
  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id')!;
    this.findClubDetails(id);
  }
  
}
