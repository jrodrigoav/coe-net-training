import { Component, OnInit } from '@angular/core';
import { Itab, ITabsResponse } from 'src/app/interfaces/itabs';
import { UnicornRewardsApiService } from 'src/app/services/unicorn-rewards-api.service';

@Component({
  selector: 'app-tab-admin',
  templateUrl: './tab-admin.component.html',
  styleUrls: ['./tab-admin.component.css']
})
export class TabAdminComponent implements OnInit {
  tabsResponse!: ITabsResponse;
  listTabs: Itab[] = [];
  constructor(private _unicornRewardsService: UnicornRewardsApiService) { }

  ngOnInit(): void {
    this.getTabs();
  }

  getTabs(){
    const tabList$ = this._unicornRewardsService.getTabsList();
    tabList$.subscribe((response) => {
      this.tabsResponse = response;
      this.listTabs = response.responseResult;
      console.log(this.listTabs);
      
    })
  }

  deleteTab(id: number){
    const deleteTab$ = this._unicornRewardsService.deleteTab(id);
    deleteTab$.subscribe((response) => {
      if(response){
        this.listTabs = this.listTabs.filter((tab: Itab) =>{
          return tab.id !== id;
        })
        alert("Record deleted successfully");
      }
      else{
        alert("There is a problem deleting this record");
      }
    })
  }
}
