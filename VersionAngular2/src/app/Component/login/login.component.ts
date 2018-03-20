import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { Router } from '@angular/router';
//Servicio
import { GestionUserService } from '../../Services/gestion-user.service';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  mensaje:string; 
  loginForm : FormGroup; 
  items: FirebaseListObservable<any[]>;
  email : string;
  password: string;


  constructor(private db: AngularFire, private auth : GestionUserService, private router: Router) {
    if(this.auth.checkSession()){
       this.router.navigate(['catalogo'])
     }
  };

	ngOnInit() {
		this.email = "";
        this.password = "";
		this.loginForm = new FormGroup(
	      {
	        'email' : new FormControl('', Validators.required),
	        'password': new FormControl('', Validators.required), 
	      }
	    )
	}
	
  checkLogin(){
    if(this.loginForm.valid){ 
     
      this.email = this.loginForm.value.email.toLowerCase().replace(/[^a-zA-Z 0-9.]+/g,'').replace(/\./g,'');
      this.password = this.loginForm.value.password; 
      let loginUser = `/usuarios/${this.email}`

      const user = this.db.database.object(loginUser);
      user.subscribe(data => {
        if(data.$exists()){
          console.log ('Email correcto: ' + data.email + data.id + data.password)
          if (data.password == this.password){ 
            this.mensaje = "Iniciando Sesión"; 
            sessionStorage.setItem("Session", this.loginForm.value.email); 
            console.log(this.mensaje); 
            this.router.navigate(['catalogo']); 
          }else{
            this.mensaje = 'Contraseña incorrecta';
            console.log(this.mensaje); 
          }
        }else{
          this.mensaje = "El usuario " + this.loginForm.value.email + " no existe"; 
          console.log(this.mensaje)
        }
      });
    }
  }
}

