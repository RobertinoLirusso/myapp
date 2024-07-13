import { Component, HostListener } from '@angular/core';
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

  @HostListener('window:scroll', []) 
  onWindowScroll() {
    const button = document.getElementById('backToTop');
    if (button) {
      if (window.scrollY > 300) {
        button.style.display = 'block';
      } else {
        button.style.display = 'none';
      }
    }
  }

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
