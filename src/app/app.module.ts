import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { VirusComponent } from './virus/virus.component';
import { InfectionComponent } from './infection/infection.component';
import { CasoComponent } from './caso/caso.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    VirusComponent,
    InfectionComponent,
    CasoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    //RouterModule.forRoot([
    //  { 'path': '', component: HomeComponent },
    //  { 'path': '', component}
    //])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
