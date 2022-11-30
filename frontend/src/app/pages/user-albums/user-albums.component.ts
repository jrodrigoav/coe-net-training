import { Component, OnInit } from '@angular/core';
import { IUserAlbums } from 'src/app/interfaces/iuser-albums';
import { TypicodeService } from 'src/app/services/typicode.service';

@Component({
  selector: 'app-user-albums',
  templateUrl: './user-albums.component.html',
  styleUrls: ['./user-albums.component.css']
})
export class UserAlbumsComponent implements OnInit{

  userAlbums: IUserAlbums[] = [];

  constructor(private typicodeService: TypicodeService) { }

  ngOnInit(): void {
    this.typicodeService.getUserAlbums().subscribe(r => this.userAlbums = r);
  }

}
