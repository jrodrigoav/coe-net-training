import { Component, OnInit } from '@angular/core';
import { UnicornRewardsApiService } from 'src/app/services/unicorn-rewards-api.service';

@Component({
  selector: 'app-test',
  templateUrl: './test-unicorn-api.component.html',
  styleUrls: ['./test-unicorn-api.component.css']
})
export class TestUnicornApiComponent implements OnInit {

  constructor(private unicornApiService: UnicornRewardsApiService) { }

  ngOnInit(): void {
  }

  testAuth(): boolean {
    console.log('clicked');
    this.unicornApiService.test("Hola Mundo").subscribe(() =>
      console.log('returned'));
    return true;
  }

}
