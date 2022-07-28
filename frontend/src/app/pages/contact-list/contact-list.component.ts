import { Component, OnInit } from '@angular/core';
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
    if (localStorage.getItem("usuarios") === null) {
      this.save_localstorage();
    }

    this.load_localstorage();

    this.typicodeService.getAllUsers().subscribe(r => this.listUsers = r);
  }

  save_localstorage(){
    let usuarios = [
      { "id": 11, "name": "Edson Ibañez", "username": "eibanez" , "email": "Sincere@april.biz", "website": "test.com" }, 
      { "id": 12, "name": "Adriana Monrroy", "username": "amonrroy" , "email": "Sincere@april.biz", "website": "test.com" }, 
      { "id": 13, "name": "Oscar Andrade", "username": "oandrade" , "email": "Sincere@april.biz", "website": "test.com" }, 
      { "id": 14, "name": "Lorena Herrera", "username": "lherrera" , "email": "Sincere@april.biz", "website": "test.com" }, 
    ];
    localStorage.setItem("usuarios", JSON.stringify(usuarios));
  }

  load_localstorage() {
    var usuarios = localStorage.getItem("usuarios");
    if(usuarios != null) {
      this.listSelectedUsers = JSON.parse(usuarios);
    }
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
      this.listUsers.splice(this.listUsers.indexOf(user), 1);
      this.putEvent(user.name);
      listauxsel.push(user);
    }
    this.listSelectedUsers = listauxsel;
  }

  moveLeftList() {
    const listauxusu = this.listUsers;
    const listauxsel = this.listSelectedUsers.filter(opt => opt.checked);
    for(let userSel of listauxsel){
      userSel.checked = false;
      this.listSelectedUsers.splice(this.listSelectedUsers.indexOf(userSel), 1);
      listauxusu.push(userSel);
    }
    this.listUsers = listauxusu;
  }

  moveAllRightList(){
    const listauxusu = this.listUsers;
    const listauxsel = this.listSelectedUsers;
    for(let user of listauxusu){
      user.checked = false;
      listauxsel.push(user);
    }
    this.listUsers.splice(0, this.listUsers.length);
    this.listSelectedUsers = listauxsel;
  }

  moveAllLeftList(){
    const listauxusu = this.listUsers;
    const listauxsel = this.listSelectedUsers;
    for(let userSel of listauxsel){
      userSel.checked = false;
      listauxusu.push(userSel);
    }
    this.listSelectedUsers.splice(0, this.listSelectedUsers.length);
    this.listUsers = listauxusu;
  }
}
