import { Component, OnInit } from '@angular/core';
import { concat } from 'rxjs';
import { IScvResponse } from 'src/app/interfaces/iscvResponse';
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
  svcResult!: IScvResponse;
  constructor(private typicodeService: TypicodeService, private _unicornRewardService: UnicornRewardsApiService) { }

  ngOnInit(): void {
    if (localStorage.getItem("usuarios") === null) {
      this.save_localstorage();
    }

    this.load_localstorage();

    this.typicodeService.getAllUsers().subscribe(r => this.listUsers = r);

    //this.svcResult.total_rows_parsed = 0;
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

  file!: File;

  changeListener(files : any) {
    let fileList = (<HTMLInputElement>files.target).files;
    console.log(fileList?.length);
    if (fileList && fileList.length > 0) {
      this.file = fileList[0];
      console.log(this.file.name);
      console.log(this.file.size);
      console.log(this.file.type);
      if((this.file.size / 1024) > 10240)
      {
        alert('The selected file is greater than 10 MB');
        return;      
      }
      // else
      // {
      //   let formData = new FormData();
      //   formData.append('file', this.file);
      //   this.sendScv(formData);
      // }
    }
  }

  // sendScv(file : FormData){
    sendScv(){
    let formData = new FormData();
    formData.append('file', this.file);

    const readScv$ = this._unicornRewardService.readScv(formData);
    readScv$.subscribe(
			(response) => {
        this.svcResult = response;
        console.log(JSON.stringify(this.svcResult));
        //this.svcResult.errors.splice(this.svcResult.invalid_rows, this.svcResult.total_rows_parsed - this.svcResult.invalid_rows);
    });
  }
}

