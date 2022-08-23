import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IAlbum } from '../../interfaces/ialbum';
import { TypicodeService } from '../../services/typicode.service';

@Component({
  selector: 'app-albums',
  templateUrl: './albums.component.html',
  styleUrls: ['./albums.component.css']
})
export class AlbumsComponent implements OnInit {
  albums : IAlbum[]=[];
  constructor(private typicodeService:TypicodeService,private router: Router) { }

  ngOnInit(): void {
    this.typicodeService.getAllAlbums().subscribe((r: IAlbum[]) => this.albums = r);
  }

  uploadAlbum() {
    this.router.navigateByUrl('/albums/upload');
  }
}
