import { Component, OnInit } from '@angular/core';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  logingData:any ={
    email:"",
    password:""
  }
  constructor(private _auth: AuthService) { }

  ngOnInit(): void {
  }

  login(){
    this._auth.login(this.logingData)
  }

}
