import { Component, OnInit } from '@angular/core';
import { IUser } from 'src/app/interfaces/internalapi/iuser';
import { InternalApiService } from 'src/app/services/internal-api.service';

@Component({
  selector: 'internalapi-page',
  templateUrl: 'internalapi.component.html',
  styles: [
  ]
})
export class InternalapiComponent implements OnInit {
  public users: IUser[];
  constructor(private service: InternalApiService) {
    this.users = Array.of<IUser>();
  }

  ngOnInit() {
    this.service.getUsers().subscribe(u => this.users = u);
  }
}


