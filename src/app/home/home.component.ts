import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  login(){
    window.location.href = 'http://localhost:4200/login'
  }
  register() {
    window.location.href = 'http://localhost:4200/register'
  }

}
