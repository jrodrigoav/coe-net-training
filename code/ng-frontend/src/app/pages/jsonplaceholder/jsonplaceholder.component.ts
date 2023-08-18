import { Component, OnInit } from '@angular/core';
import { IUser } from 'src/app/interfaces/typicode/iuser';
import { InternalApiService } from 'src/app/services/internal-api.service';

@Component({
  selector: 'app-jsonplaceholder',
  templateUrl: 'jsonplaceholder.component.html',
  styles: []
})
export class JsonplaceholderComponent implements OnInit {
  public users: IUser[];
  constructor(private service: InternalApiService) {
    this.users = Array.of<IUser>();
  }

  ngOnInit() {
    this.service.getUsers().subscribe(u => this.users = u);
  }
}
