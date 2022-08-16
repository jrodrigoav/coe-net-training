import { Component, OnInit } from '@angular/core';
import { IUser } from '../../interfaces/iuser';
import { TypicodeService } from '../../services/typicode.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  users: IUser[];
  constructor(private typicodeService: TypicodeService,private router: Router) {
    this.users = [];
  }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers() {
    this.typicodeService.getAllUsers().subscribe((r: IUser[]) => this.users = r);
  }

  editUser(userSeleced: IUser) {
    this.router.navigate(['/users/edit'], {
      state: {
        userSeleced: userSeleced
      }
    });
  }
}
