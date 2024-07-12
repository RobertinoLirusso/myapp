import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Club } from '../club';



@Component({
  selector: 'app-content',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './content.component.html',
  styleUrl: './content.component.css'
})
export class ContentComponent {
  @Input() clubList!: Club;

  constructor() {}
  
}
