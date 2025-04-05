import {Component, inject, input, signal} from '@angular/core';
import {User, UserDTO} from '../../model/user.model';
import {UserService} from '../../service/user.service';

@Component({
  selector: 'app-home-child',
  imports: [],
  templateUrl: './home-child.component.html',
  standalone: true,
  styleUrl: './home-child.component.css',
})

export class HomeChildComponent {
  userService = inject(UserService);
  userList!: UserDTO[];
  alias!: string;
  email!: string;
  clicked: boolean = false;
  parentMessage = input("External message");
  childMessage = input("Child message");
  users = signal<User[]>([
    {email: 'q1@email.ro', alias: 'Alias-q1'},
    {email: 'admin@email.ro', alias: 'Admin'},
  ]);

  constructor() {
    this.getUsers();
  }

  getUsers() {
    this.userService.getUsers().subscribe(
      result => {
        this.userList = result;
      }
    )
  }

  getUserByAlias(alias: string) {
    if (this.clicked) {
      let index = Math.floor(Math.random() * 2);
      this.alias = this.users()[index].alias;
      this.email = this.users()[index].email;
    } else {
      this.userService.getUserByAlias(alias).subscribe(
        result => {
          this.alias = result.alias;
          this.email = result.email;
        }
      )
    }
    this.clicked = !this.clicked;
  }
}
