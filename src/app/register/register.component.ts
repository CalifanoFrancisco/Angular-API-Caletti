import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { URL } from 'src/main';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent {
  name: string = "";
  pass: string = "";
  pas2: string = "";
  mail: string = "";
  msg:  string = "";

  
  constructor(private http:HttpClient) {}

  getName(event: any) { this.name = event.target.value; }
  getPass(event: any) { this.pass = event.target.value; }
  getPas2(event: any) { this.pas2 = event.target.value; }
  getMail(event: any) { this.mail = event.target.value; }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    }),
  }

  submitData() {
    if (this.name == "" || this.pass == "" || this.pas2 == "" || this.mail ==  "") {
      this.msg = "Falta rellenar alguna casilla";
      return;
    }

    if (this.pass != this.pas2) {
      this.msg = "Las contraseñas no coinciden";
      return;
    }    

    this.msg = "";
    const ipersona:IPersona = {
      username: this.name,
      password: this.pass,
      email:    this.mail
    }

    this.http.post<IPersona>(
      `${URL}/signup`,
      ipersona,
      this.httpOptions
    )
    .subscribe(data => {
      console.log(data)
      window.location.href = `http://localhost:4200/login`
    })


  }

  toJson() {
    return {
      name: this.name,
      pass: this.pass,
      pas2: this.pas2
    }
  }

}

interface IPersona {
  username: string,
  password: string,
  email: string
}
