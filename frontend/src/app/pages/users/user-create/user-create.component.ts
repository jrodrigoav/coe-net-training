import { Component, OnInit } from '@angular/core';
import { IUser } from 'src/app/interfaces/iuser';
import { UnicornRewardsApiService } from 'src/app/services/unicorn-rewards-api.service';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.css']
})
export class UserCreateComponent implements OnInit {
  createdId?: Number;
  newUser!: IUser;
  constructor(private _unicornRewardService: UnicornRewardsApiService) { }

  ngOnInit(): void {
  }

  // createUser(user: IUser, isValid: boolean | null)
  createUser(user: IUser) {
    console.log(JSON.stringify(user));

    const adduser$ = this._unicornRewardService.createUser(user);
    adduser$.subscribe(
      (response) => {
        this.createdId = response;
        alert("Record '" + this.createdId + "' created successfully!!");
        console.log(this.createdId);
      }
    )
  }
}
