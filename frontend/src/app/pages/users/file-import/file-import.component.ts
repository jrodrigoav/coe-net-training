import { Component, OnInit } from '@angular/core';
import { IScvResponse } from 'src/app/interfaces/iscvResponse';
import { UnicornRewardsApiService } from 'src/app/services/unicorn-rewards-api.service';

@Component({
  selector: 'app-file-import',
  templateUrl: './file-import.component.html',
  styleUrls: ['./file-import.component.css']
})
export class FileImportComponent implements OnInit {
  svcResult!: IScvResponse;
  constructor(private _unicornRewardService: UnicornRewardsApiService) { }

  ngOnInit(): void {
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
        // console.log(JSON.stringify(this.svcResult));
        alert("Registers created!!!");
    });
  }

}
