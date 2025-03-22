import {Component, Input, input} from '@angular/core';

@Component({
  selector: 'app-home-child',
  imports: [],
  templateUrl: './home-child.component.html',
  standalone: true,
  styleUrl: './home-child.component.css'
})
export class HomeChildComponent {
  childMessage = input("Child message");
}
