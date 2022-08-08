import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IUserResponse, IUserSearched } from 'src/app/interfaces/iuser-list';
import { UnicornRewardsApiService } from 'src/app/services/unicorn-rewards-api.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {
  searchedName!: string;
  userResponse!: IUserResponse;
  userList: IUserSearched[] = [];
  // userResponse.responseResult : IUser[] = [];
  constructor(private _unicornRewardService: UnicornRewardsApiService) {
    // this.userResponse.responseResult = []

  }

  ngOnInit(): void {
    // this.userResponse.responseResult = [{ id: "", name: "", userName: "", email: "", webSite: ""}]
    this.getUsers("");
  }

  getUsers(name: string){
    const getUsersList$ = this._unicornRewardService.getUserList(name);
    getUsersList$.subscribe(
      (response) => {
        this.userList = response.responseResult;
        this.userResponse = response;
        //this.userResponse.usersListResult = response.usersListResult;
        //console.log(JSON.stringify(this.userResponse.responseResult));
    });
  }
}
