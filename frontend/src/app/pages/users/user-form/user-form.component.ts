import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IUser } from 'src/app/interfaces/iuser';
import { UnicornRewardsApiService } from 'src/app/services/unicorn-rewards-api.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {
  constructor(private _unicornRewardService: UnicornRewardsApiService) { }

  ngOnInit(): void {
  }

  @Input() user!: IUser;

  @Output()
	create: EventEmitter<IUser> = new EventEmitter<IUser>();

  getSubmit(user: IUser, isValid: boolean | null) {
		if (isValid) {
			this.create.emit(user);
		}
	}

  // update(event: IUser){
  //   console.log(event);
  //   this.selectedUserForm = event;
  // }
}
