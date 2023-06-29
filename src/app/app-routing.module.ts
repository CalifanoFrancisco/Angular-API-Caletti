import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CasoComponent } from './caso/caso.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { VirusComponent } from './virus/virus.component';

const routes: Routes = [
  {
    path: "",
    component: HomeComponent,
    title: "Home"
  },
  {
    path: "register",
    component: RegisterComponent,
    title:"Register"
  },
  {
    path: "login",
    component: LoginComponent,
    title:"Login"
  },
  {
    path: "infection/caso",
    component: CasoComponent,
    title: "Casos"
  },
  {
    path: "infection/virus",
    component: VirusComponent,
    title: "Virus"
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
