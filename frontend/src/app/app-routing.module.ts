import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MsalGuard } from '@azure/msal-angular';
import { BrowserUtils } from '@azure/msal-browser';

import { AlbumsComponent } from './pages/albums/albums.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginFailedComponent } from './pages/login-failed/login-failed.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { TestUnicornApiComponent } from './pages/test-unicorn-api/test-unicorn-api.component';
import { UsersComponent } from './pages/users/users.component';
import { UsersEditComponent } from './pages/users/users-edit/users-edit.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent, },
  { path: 'login-failed', component: LoginFailedComponent },
  { path: 'albums', component: AlbumsComponent, canActivate: [MsalGuard] },
  { path: 'users', component: UsersComponent, canActivate: [MsalGuard]},
  { path: 'users/edit', component: UsersEditComponent, canActivate: [MsalGuard] },
  { path: 'test', component: TestUnicornApiComponent, canActivate: [MsalGuard] },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent },
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
       // Don't perform initial navigation in iframes or popups
       // Set to enabledBlocking to use Angular Universal
      initialNavigation: !BrowserUtils.isInIframe() && !BrowserUtils.isInPopup() ? 'enabledNonBlocking' : 'disabled',
      enableTracing: true }) // <-- debugging purposes only)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
