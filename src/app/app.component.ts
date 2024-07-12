import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { AngularMaterialModule } from '../angular-material-module';
import { ClubComponent } from './club/club.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ClubComponent, RouterModule,AngularMaterialModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'myapp';
}
