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
  userByName!: UserDTO;
  parentMessage = input("External message");
  childMessage = input("Child message");
  users = signal<User[]>([
    {email: 'q1@email.ro', alias: 'Alias-q1'},
    {email: 'user@email.ro', alias: 'User'},
  ]);

  constructor() {
    this.getUsers();
  }

  getUsers(){
    this.userService.getUsers().subscribe(
      result => {
        this.userList = result;
      }
    )
  }

  getUserByAlias(alias: string){
    this.userService.getUserByAlias(alias).subscribe(
      result => {
        this.userByName = new UserDTO(result.email, result.alias);
      }
    )
  }
}
