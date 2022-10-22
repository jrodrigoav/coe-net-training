import { Component, OnInit } from '@angular/core';
import { tap } from 'rxjs/internal/operators/tap';
import { ApiService } from 'src/app/services/api.service';
import { IUser } from '../../interfaces/iuser';
import { TypicodeService } from '../../services/typicode.service';

const PAGE_SIZE = 1;

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  users: IUser[] = [];

  paginatedData: IUser[] = [];
  page: number = 1;
  pageSize: number = 10;

  constructor(
    private apiSrv: ApiService
  ) { }

  ngOnInit(): void {

    this.apiSrv.getAllUsers().subscribe((resp) => {
      this.users = resp;
      this.paginateData();
    });

  }
  paginateData(page: number = 1) {
    this.page = page;
    let firstIdx = (page - 1) * this.pageSize;
    let lastIdx = (page) * this.pageSize
    this.paginatedData = this.users.slice(firstIdx, lastIdx);
  }


}
