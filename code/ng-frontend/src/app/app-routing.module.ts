import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { JsonplaceholderComponent } from './pages/jsonplaceholder/jsonplaceholder.component';
import { InternalapiComponent } from './pages/internalapi/internalapi.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'internalapi', component:InternalapiComponent},
  { path: 'jsonplaceholder', component: JsonplaceholderComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' }, // redirect to `first-component`
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
