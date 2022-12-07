import { Component, OnInit } from '@angular/core';
import { UsersAlbums } from 'src/app/interfaces/iusers-albums';
import { UnicornRewardsApiService } from 'src/app/services/unicorn-rewards-api.service';

@Component({
  selector: 'app-users-albums',
  templateUrl: './users-albums.component.html',
  styleUrls: ['./users-albums.component.css']
})
export class UsersAlbumsComponent implements OnInit {

  userAlbumsArray: Array<any> = [];
  constructor(private unicornApiService: UnicornRewardsApiService) {}

  ngOnInit(): void {
    const msg = 'Test';
    this.unicornApiService.getUsersAlbums(msg).subscribe(x => {
      if (x.id === undefined && x.name === undefined && x.albumName === undefined) {
        const userAlbum = { id: 0, name: "", albumName: ""};
        this.userAlbumsArray.push(userAlbum);
      } else {
        this.userAlbumsArray.push(x);
        this.userAlbumsArray = this.userAlbumsArray[0];
      }
    })
  }

  downloadPdf() {
    console.log('DownloadPdf');
    this.unicornApiService.getPdf().subscribe((result: any) => {
      const fileUrl = URL.createObjectURL(result);
      window.open(fileUrl);
    })
  }

}
