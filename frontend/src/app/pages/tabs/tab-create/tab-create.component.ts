import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Itab } from 'src/app/interfaces/itabs';
import { UnicornRewardsApiService } from 'src/app/services/unicorn-rewards-api.service';

@Component({
  selector: 'app-tab-create',
  templateUrl: './tab-create.component.html',
  styleUrls: ['./tab-create.component.css']
})
export class TabCreateComponent implements OnInit {
  createdId!: number;
  constructor(private _unicornRewardsService: UnicornRewardsApiService) { }

  ngOnInit(): void {
  }

  createtab = new FormGroup({
    name: new FormControl('', [Validators.required]),
    label: new FormControl('', [Validators.required]),
  })

  createTabPost(tab: Itab, isValid: boolean | null){
    if(isValid){
      const createTab$ = this._unicornRewardsService.createTab(tab);
      createTab$.subscribe((response) => {
        this.createdId = response;
        alert("Register created successfully with ID: " + this.createdId);
      })
    }
    
  }
}
