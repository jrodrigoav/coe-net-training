import { Component, OnInit } from '@angular/core';
import { Observable, Observer, Subscription } from 'rxjs';
import { IUser } from 'src/app/interfaces/iuser';
import { TypicodeService } from 'src/app/services/typicode.service';
import { UnicornRewardsApiService } from 'src/app/services/unicorn-rewards-api.service';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit {
  
  listUsers: IUser[] = [];
  listSelectedUsers: IUser[] = [];
  constructor(private typicodeService: TypicodeService, private _unicornRewardService: UnicornRewardsApiService) { }

  ngOnInit(): void {

    this.loadUsersFromService().subscribe(
      r => this.listUsers = r,
      error => { console.log(error) },
      () => {
        if (localStorage.getItem("UserListSelected") === null) this.saveSelectedUsers(this.listUsers.slice(0, 2));
        this.load_localstorage();
      }
    );
    
  }

  loadUsersFromService(): Observable<IUser[]> {
    return this.typicodeService.getAllUsers();
  }

  load_localstorage() {

    this.listSelectedUsers = this.loadSelectedUsers("UserListSelected");
  }

  putEvent(name: string){
    const putEvent$ = this._unicornRewardService.putRegister(name);

    putEvent$.subscribe(
			(response) => {
			}
		);
  }

  moveRightList() {
    
    const listauxusu = this.listUsers.filter(opt => opt.checked);
    const listauxsel = this.listSelectedUsers;
    for(let user of listauxusu){
      user.checked = false;

      //check if the item already exist on the right side, if exist do not add the item.
      if (this.existOnSelectedUsers(user.name)) continue;

      this.listUsers.splice(this.listUsers.indexOf(user), 1);
      this.putEvent(user.name);
      listauxsel.push(user);
    }
    this.listSelectedUsers = listauxsel;
    this.saveSelectedUsers(this.listSelectedUsers);
  }

  moveLeftList() {
    const listauxusu = this.listUsers;
    const listauxsel = this.listSelectedUsers.filter(opt => opt.checked);
    for(let userSel of listauxsel){
      userSel.checked = false;
      this.listSelectedUsers.splice(this.listSelectedUsers.indexOf(userSel), 1);

      //check if the item already exist on the left side, if exist do not add the item.
      if (this.existOnListUsers(userSel.name)) continue;

      listauxusu.push(userSel);
    }

    this.listUsers = listauxusu;
    this.saveSelectedUsers(this.listSelectedUsers);
  }

  moveAllRightList(){
    const listauxusu = this.listUsers;
    const listauxsel = this.listSelectedUsers;
    for(let user of listauxusu){
      user.checked = false;

      //check if the item already exist on the right side, if exist do not add the item.
      if (this.existOnSelectedUsers(user.name)) continue;

      listauxsel.push(user);
    }
    this.listUsers.splice(0, this.listUsers.length);
    this.listSelectedUsers = listauxsel;
    this.saveSelectedUsers(this.listSelectedUsers);
  }

  moveAllLeftList(){
    const listauxusu = this.listUsers;
    const listauxsel = this.listSelectedUsers;
    for(let userSel of listauxsel){
      userSel.checked = false;

      //check if the item already exist on the left side, if exist do not add the item.
      if (this.existOnListUsers(userSel.name)) continue;

      listauxusu.push(userSel);
    }
    this.listSelectedUsers.splice(0, this.listSelectedUsers.length);
    this.saveSelectedUsers(this.listSelectedUsers);
    this.listUsers = listauxusu;
  }

  saveSelectedUsers(listSelectedUsers: IUser[]) {
    localStorage.setItem('UserListSelected', JSON.stringify(listSelectedUsers));
    return;
  }

  loadSelectedUsers(item:string ): IUser[] {
    let content = "[]";
    content = (localStorage.getItem(item)) ?? "[]";
    return JSON.parse(content);
  }

  existOnSelectedUsers(name: string) {
    return  (this.listSelectedUsers.filter(item => item.name == name)[0]) ? true : false;
  }

  existOnListUsers(name: string): boolean {
    return (this.listUsers.filter(item => item.name == name)[0]) ? true : false;
  }
}
