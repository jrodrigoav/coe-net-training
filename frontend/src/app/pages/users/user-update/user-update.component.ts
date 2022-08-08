import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IUser } from 'src/app/interfaces/iuser';
import { IUserSearched } from 'src/app/interfaces/iuser-list';
import { UnicornRewardsApiService } from 'src/app/services/unicorn-rewards-api.service';

@Component({
  selector: 'app-user-update',
  templateUrl: './user-update.component.html',
  styleUrls: ['./user-update.component.css']
})
export class UserUpdateComponent implements OnInit {
  paramId: number = 0;
  selectedUser!: IUser;
  constructor(private router: Router, private route: ActivatedRoute, private _unicornRewardService: UnicornRewardsApiService) { }

  ngOnInit(): void {
    this.selectedUser = { id: 0, name: "", userName: "", email: "", webSite: "", checked: false};
    this.route.paramMap.subscribe((params) => {
      if (params.has('id')) {
        this.paramId = Number(params.get('id'));
        this._unicornRewardService.getUserById(this.paramId).subscribe(
          (response) => {
            this.selectedUser = response;
            console.log(this.selectedUser);
            // this.emitUser(this.selectedUser);
          }
        )
      }
    });
  }

  updateUser(user: IUser, isValid: boolean | null)
  {
    if(isValid)
    {
      const updateuser$ = this._unicornRewardService.updateUser(this.paramId, user);
      updateuser$.subscribe(
        (response) => { 
          alert("Record updated successfully!!");
        }
      )
    }    
  }

  // @Input()
  // user!: IUser;

  // @Output()
  // userSelected: EventEmitter<IUser> = new EventEmitter<IUser>();

  // emitUser(user: IUser){
  //   console.log(user);
  //   this.userSelected.emit(user);
  // }
}
