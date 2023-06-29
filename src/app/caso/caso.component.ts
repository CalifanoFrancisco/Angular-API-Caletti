import { Component } from '@angular/core';
import { URL } from '../../main'
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';


@Component({
  selector: 'app-caso',
  templateUrl: './caso.component.html',
  styleUrls: ['./caso.component.css'],
  template: `
    <div class="caso">
      cases[]
    </div>
  `
})

export class CasoComponent {
  id:        number = 0;
  sciName:   string = "";
  virusType: string = "";
  vaccine:   string = "";
  age:       number = 0;
  gender:    string = "";
  msg:       string = "";
  auth:      string = "";
  location:  string = "";
  state:     string = "";
  htmlToAdd: string = "";

  getSciName  (event: any) { this.sciName   = event.target.value; }
  getVirusType(event: any) { this.virusType = event.target.value; }
  getVaccine  (event: any) { this.vaccine   = event.target.value; }
  getAge      (event: any) { this.age       = event.target.value; }
  getGender   (event: any) { this.gender    = event.target.value; }
  getId       (event: any) { this.id        = event.target.value; }
  getLocation (event: any) { this.location  = event.target.value; }
  getState    (event: any) { this.state     = event.target.value; }

  getAuth() { 
    const token:string | null = localStorage.getItem('token-auth');
    if (token == null) 
      return 'invalid-token';
    else
      return this.auth = token;  
  }

  constructor(private http:HttpClient){}

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'authorization': this.getAuth()
    }),
  }


  renderArray(list:ICaso[]) {
    console.log(list);
    this.htmlToAdd = "";
    this.htmlToAdd += "<br>";

    for (let i = 0; i < list.length; i++) {
      const element = list[i];
      this.htmlToAdd += `
      <div class="singleCaseContainer">
        <h4> ${i} --------------------------------------------------------------------------------------- </h4>
        <h5> Nombre: ${element.caseVirus.sciName} | Tipo: ${element.caseVirus.virusType} | Tiene vacuna: ${element.caseVirus.hasVaccine} </h5>
        <h5> ID: ${element.id} | Edad: ${element.age} | Ubicación: ${element.location} | Estado: ${element.subjectState} </h5>
      </div>
      `
    }
    this.htmlToAdd += "<br>"
  }

  renderSingle(element:ICaso) {
    let elements:ICaso[] = [];
    elements.push(element);
    this.renderArray(elements);
  }

  renderSingleICV(element:ICaseVirus) {
    this.htmlToAdd = "";
    this.htmlToAdd += "<br>"
    this.htmlToAdd += `
    <div class="singleCaseContainer">
    <h5> Nombre: ${element.sciName} | Tipo: ${element.virusType} | Tiene vacuna: ${element.hasVaccine} </h5>
    </div>
    `;
    this.htmlToAdd += "<br>"
  }

  getCases() { 
    this.clear()
    this.http.get<ICaso[]>(
      `${URL}/infection`,
       this.httpOptions
    )
    .subscribe(data => {
      this.renderArray(data)
    })
  }

  getCaseById() {
    this.clear()

    if (this.id == 0) {
      this.msg = "Falta completar el campo de id"
      return;
    } else this.msg = "";

    this.http.get<ICaso>(
      `${URL}/infection/${this.id}`,
      this.httpOptions
    )
    .subscribe(data => this.renderSingle(data))
  }

  getCasesByAge() { 
    this.clear()
    if (this.age == 0) {
      this.msg = "Falta completar el campo de edad"
      return;
    }
    this.http.get<ICaso[]>(
      `${URL}/infection/case/${this.age}`,
      this.httpOptions
    )
    .subscribe(data => this.renderArray(data))
  }

  addNewCase() {
    this.clear()
    //-------------------------------------------------------------
    // check all required inputs are filled
    if (
      this.sciName   == ""   ||
      this.virusType == ""   ||
      this.vaccine   == null ||
      this.age       == null ||
      this.gender    == ""   || 
      this.location  == ""   || 
      this.state     == ""
    ) {
      this.msg = "Falta completar algun campo";
      return;
    } else this.msg = "";
    //-------------------------------------------------------------
    // Depuracion de informacion
    let auxVacc:boolean = false;
    if      (this.vaccine == "s" || this.vaccine == "S") auxVacc = true;
    else if (this.vaccine == "n" || this.vaccine == "N") auxVacc = false;
    else {
      this.msg = "Caracter invalido en Tiene vacuna? s/n";
      return;
    }
    //-------------------------------------------------------------
    const caso:ICaso = {
      caseVirus: {
        sciName:    this.sciName,
        virusType:  this.virusType,
        hasVaccine: auxVacc
      },
      id:           this.id,
      caseDate:     Date.now().toString(),
      age:          this.age,
      gender:       this.gender,
      location:     this.location,
      subjectState: this.state
    }

    this.http.post<ICaso>(
      `${URL}/infection`, 
      caso, 
      this.httpOptions
    )
    .subscribe(data => this.renderSingle(data))
  }

  deleteCaseById() {
    this.clear()
    if (this.id == 0) {
      this.msg = "Inserte ID para eliminar un elemento"
      return;
    }
    this.http.delete<ICaso>(
      `${URL}/infection/${this.id}`, 
      this.httpOptions
    )
    .subscribe(data => this.renderSingle(data))
  }

  updateCase()  {
    this.clear()
    if (this.id == 0) {
      this.msg = "La id es necesaria para modificar un elemento"
      return;
    } else {
      this.msg = ""
    }


    let caso:ICaso = {
      caseVirus: {
        sciName:    this.sciName,
        virusType:  this.virusType,
        hasVaccine: (this.vaccine == "s" || this.vaccine == "S")
      },
      id:           this.id,
      caseDate:     Date.now().toString(),
      age:          this.age,
      gender:       this.gender,
      location:     this.location,
      subjectState: this.state
    }

    this.http.put<ICaso>(
      `${URL}/infection/${this.id}`,
      caso,
      this.httpOptions
    ).subscribe(data => this.renderSingle(data))

  }

  updateVirus() {
    this.clear()
    if (this.id = 0) {
      this.msg = "La id es necesaria para modificar un elemento"
      return;
    } else this.msg = "";

    if (this.sciName == "" || this.virusType == "" || this.vaccine == "") {
      this.msg = "Los elementos 'Nombre cientifico', 'Tipo de virus' y 'Tiene vacuna? s/n' son necesarios";
      return;
    } else this.msg = "";

    let virus:ICaseVirus = {
      sciName:    this.sciName,
      virusType:  this.virusType,
      hasVaccine: (this.vaccine == "s" || this.vaccine == "S")
    }

    this.http.patch<ICaseVirus>(
      `${URL}/infection/${this.id}`,
      virus,
      this.httpOptions
    ).subscribe(data => this.renderSingleICV(data))
  }

  getCasesByVirus() {
    this.clear()
    if (this.sciName == "") {
      this.msg = "Falta completar el campo de 'Nombre cientifico'"
      return;
    } else this.msg = "";
    this.http.get<ICaso[]>(
      `${URL}/infection/virus/${this.sciName}`,
      this.httpOptions
    ).subscribe(data => this.renderArray(data))
  }

  getVirusHasVaccine() {
    if (this.sciName == "") {
      this.msg = "Falta completar el campo de 'Nombre cientifico'"
      return;
    } else this.msg = "";
    this.http.get<boolean>(
      `${URL}/infection/virus/${this.sciName}/vaccine`,
      this.httpOptions
    ).subscribe(data => {
      this.htmlToAdd = "";
      this.htmlToAdd += "<br>  <h5>"
      if (data) this.htmlToAdd += "Tiene vacuna"; else this.htmlToAdd = "No tiene vacuna";
      this.htmlToAdd += "</h5> <br>"
    })
  }

  logout() {
    window.location.href = `http://localhost:4200`
    localStorage.clear();
  }

  clear() {
    this.htmlToAdd = "";
  }

}

interface ICaso {
  caseVirus: {
    sciName: string,
    virusType: string,
    hasVaccine: boolean
  },
  id:number,
  caseDate: string,
  age: number,
  gender: string,
  location: string,
  subjectState: string
}

interface ICaseVirus {
  sciName:    string,
  virusType:  string,
  hasVaccine: boolean
}




/*
git push https://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@github.com/CalifanoFrancisco/Angular-API-Caletti.git

*/