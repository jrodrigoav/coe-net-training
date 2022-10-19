import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { UnicornRewardsApiService } from 'src/app/services/unicorn-rewards-api.service';

@Component({
  selector: 'app-test',
  templateUrl: './test-unicorn-api.component.html',
  styleUrls: ['./test-unicorn-api.component.css']
})
export class TestUnicornApiComponent implements OnInit {

  inputCtrl: FormControl = new FormControl('Hola Mundo !!!');
  response: any = "--- NOT RESPONSE YET ---";

  constructor(
    private unicornApiService: UnicornRewardsApiService
  ) { }


  ngOnInit(): void {
  }

  testAuth(): boolean {
    console.log('clicked');
    this.unicornApiService.test(this.inputCtrl.value).subscribe((resp) => {
      this.response = resp;
      console.log('returned');
    });
    return true;
  }

}
