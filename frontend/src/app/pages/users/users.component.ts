import { Component, OnInit } from '@angular/core';
import { IUser } from '../../interfaces/iuser';
import { TypicodeService } from '../../services/typicode.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  users: IUser[];
  constructor(private typicodeService: TypicodeService) {
    this.users = [];
  }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers() {
    this.typicodeService.getAllUsers().subscribe((r: IUser[]) => this.users = r);
  }
}
