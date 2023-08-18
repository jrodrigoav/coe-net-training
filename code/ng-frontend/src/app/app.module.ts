import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { FooterComponent } from './components/footer/footer.component';
import { JsonplaceholderComponent } from './pages/jsonplaceholder/jsonplaceholder.component';
import { InternalapiComponent } from './pages/internalapi/internalapi.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavigationComponent,
    PageNotFoundComponent,
    FooterComponent,
    JsonplaceholderComponent,
    InternalapiComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
