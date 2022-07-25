import { Component, OnInit } from '@angular/core';
import { IAlbum } from '../../interfaces/ialbum';
import { TypicodeService } from '../../services/typicode.service';

@Component({
  selector: 'app-albums',
  templateUrl: './albums.component.html',
  styleUrls: ['./albums.component.css']
})
export class AlbumsComponent implements OnInit {
  albums : IAlbum[]=[];
  constructor(private typicodeService:TypicodeService) { }

  ngOnInit(): void {
    this.typicodeService.getAllAlbums().subscribe(r => this.albums = r);
  }
}
