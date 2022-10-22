import { Component, OnInit } from '@angular/core';
import { tap } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';
import { IAlbum } from '../../interfaces/ialbum';

const PAGE_SIZE = 10;

@Component({
  selector: 'app-albums',
  templateUrl: './albums.component.html',
  styleUrls: ['./albums.component.css']
})
export class AlbumsComponent implements OnInit {

  albums: IAlbum[] = [];

  paginatedData: IAlbum[] = [];
  page: number = 1;
  pageSize: number = PAGE_SIZE;

  constructor(private apiSrv: ApiService) { }

  ngOnInit(): void {
    this.fetchData();

  }

  fetchData() {
    this.apiSrv.getAllAlbums()
      .pipe(
        tap((resp) => {
          this.albums = resp;
          this.onPageChange();
        })
      ).subscribe();
  }

  onPageChange(page: number = 1) {
    this.page = page;
    let firstIdx = (page - 1) * this.pageSize;
    let lastIdx = (page) * this.pageSize
    this.paginatedData = this.albums.slice(firstIdx, lastIdx);
  }

}
