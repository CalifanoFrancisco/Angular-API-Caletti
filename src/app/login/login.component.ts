import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { URL } from 'src/main';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {
  name: string = "";
  pass: string = "";
  mail: string = "";
  msg:  string = "";

  constructor(private http:HttpClient) {}

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    }),
  }

  getName(event: any) { this.name = event.target.value; }
  getPass(event: any) { this.pass = event.target.value; }
  getEmail(event:any) { this.mail = event.target.value;   }

  login() {

    if (this.name == "" || this.pass == ""){ this.msg = "Falta rellenar algun campo"; return; }
    this.msg = "";

    const persona:IPersona = {
      username: this.name,
      password: this.pass,
      email:    this.mail
    }

    //login
    this.http.post<string>(
      `${URL}/signin`,
      persona,
      this.httpOptions
    ).subscribe(token => {
      console.log(token)
      localStorage.setItem('token-auth', token)
      //console.log(localStorage.getItem('token-auth'))
      window.location.href = `http://localhost:4200/infection/caso`
    })


    //return token;

    //REDIRECT TO http://localhost:4200/infection/caso
  }

}

interface IPersona {
  username:string,
  password:string,
  email:string
}
