import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MsalGuard } from '@azure/msal-angular';
import { BrowserUtils } from '@azure/msal-browser';

import { AlbumsComponent } from './pages/albums/albums.component';
import { ContactListComponent } from './pages/contact-list/contact-list.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginFailedComponent } from './pages/login-failed/login-failed.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { QuestionAdminComponent } from './pages/tabs/question-admin/question-admin.component';
import { QuestionCreateComponent } from './pages/tabs/question-create/question-create.component';
import { TabAdminComponent } from './pages/tabs/tab-admin/tab-admin.component';
import { TabCreateComponent } from './pages/tabs/tab-create/tab-create.component';
import { TabsHomeComponent } from './pages/tabs/tabs-home/tabs-home.component';
import { TestUnicornApiComponent } from './pages/test-unicorn-api/test-unicorn-api.component';
import { FileImportComponent } from './pages/users/file-import/file-import.component';
import { UserCreateComponent } from './pages/users/user-create/user-create.component';
import { UserUpdateComponent } from './pages/users/user-update/user-update.component';
import { UsersListComponent } from './pages/users/users-list/users-list.component';
import { UsersComponent } from './pages/users/users.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'login-failed', component: LoginFailedComponent },
  { path: 'users', component: UsersComponent, canActivate: [MsalGuard] },
  { path: 'users-list', component: UsersListComponent, canActivate: [MsalGuard] },
  { path: 'file-import', component: FileImportComponent, canActivate: [MsalGuard] },
  { path: 'user-create', component: UserCreateComponent, canActivate: [MsalGuard] },
  { 
    path: 'user-update', 
    children: [
      { path: '', component: UserUpdateComponent, canActivate: [MsalGuard] },
      { path: ':id', component: UserUpdateComponent, canActivate: [MsalGuard] }
    ] 
  },
  { path: 'tabs', component: TabsHomeComponent, canActivate: [MsalGuard] },
  { path: 'tab-admin', component: TabAdminComponent, canActivate: [MsalGuard] },
  { path: 'tab-create', component: TabCreateComponent, canActivate: [MsalGuard] },
  { path: 'question-admin', component: QuestionAdminComponent, canActivate: [MsalGuard] },
  { path: 'question-create', component: QuestionCreateComponent, canActivate: [MsalGuard] },
  { path: 'albums', component: AlbumsComponent, canActivate: [MsalGuard] },
  { path: 'contact', component: ContactListComponent, canActivate: [MsalGuard] },
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
