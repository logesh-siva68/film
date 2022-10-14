import { Component, OnInit } from '@angular/core';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  user:any = {address:{}}
  constructor(private _auth : AuthService) { }

  ngOnInit(): void {
  }
  register(){
    this._auth.regisertUser(this.user)
  }

}
