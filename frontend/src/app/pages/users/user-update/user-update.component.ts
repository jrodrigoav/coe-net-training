import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IUser } from 'src/app/interfaces/iuser';
import { UnicornRewardsApiService } from 'src/app/services/unicorn-rewards-api.service';
import { customNoSpecialCharactersValidator, customStartWithLetterValidator } from 'src/app/validators/user-validators';

@Component({
  selector: 'app-user-update',
  templateUrl: './user-update.component.html',
  styleUrls: ['./user-update.component.css']
})
export class UserUpdateComponent implements OnInit {
  paramId: number = 0;
  selectedUser!: IUser;

  editUser= new FormGroup({
    name: new FormControl(''),
    userName: new FormControl(''),
    email: new FormControl(''),
    webSite: new FormControl('')
  })

  constructor(private router: Router, private route: ActivatedRoute, private _unicornRewardService: UnicornRewardsApiService) { }

  ngOnInit(): void {
    this.selectedUser = { id: 0, name: "", username: "", email: "", website: "", checked: false};
    this.route.paramMap.subscribe((params) => {
      if (params.has('id')) {
        this.paramId = Number(params.get('id'));
        // this._unicornRewardService.getUserById(this.paramId).subscribe(
        //   (response) => {
        //     this.selectedUser = response;
        //     console.log(this.selectedUser);
        //   }
        // )
        this._unicornRewardService.getUserById(this.paramId).subscribe((result) => {
          // console.log(result);
          this.editUser= new FormGroup({
            name: new FormControl(result['name'], [Validators.required, Validators.maxLength(300)]),
            userName: new FormControl(result['username'], [Validators.required, customStartWithLetterValidator, customNoSpecialCharactersValidator]),
            email: new FormControl(result['email'], [Validators.email, Validators.required]),
            webSite: new FormControl(result['website'])
          })
        
        })
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
