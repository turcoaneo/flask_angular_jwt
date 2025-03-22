import {Component, signal} from '@angular/core';
import {HomeChildComponent} from '../components/home-child/home-child.component';

@Component({
  selector: 'app-home',
  imports: [
    HomeChildComponent
  ],
  templateUrl: './home.component.html',
  standalone: true,
  styleUrl: './home.component.css'
})
export class HomeComponent {
  homeMessage = signal('Home parent message');
}
