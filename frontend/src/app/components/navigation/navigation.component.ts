import { Component, OnInit } from '@angular/core';
import { MsalBroadcastService, MsalService } from '@azure/msal-angular';
import { EventMessage, EventType, InteractionStatus } from '@azure/msal-browser';

import { AccountInfo } from '@azure/msal-common';
import { filter } from 'rxjs';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  account: AccountInfo | undefined | null;

  constructor(public msalSrv: MsalService,
    private msalBroadcastSrv: MsalBroadcastService) { }

  ngOnInit(): void {
    this.msalBroadcastSrv.msalSubject$.subscribe(msg => {
      setTimeout(() => {
        const accounts = this.msalSrv.instance?.getAllAccounts();
        this.account = accounts?.length > 0 ? accounts[0] : null;
      }, 0);
    });
  }

  login() {
    this.msalSrv.loginRedirect();
  }

  logout() {
    this.msalSrv.logout();
  }

}
