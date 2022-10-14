import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import {environment as en} from '../../environments/environment'


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  apiBaseUrl:string = en.api_url;

  isLogin = new BehaviorSubject('N');

  constructor(private _http : HttpClient, private _route : Router) {

  }

  isAuth(){
    const token = localStorage.getItem('token')
    if(token === 'null') this.isLogin.next('N')
    else this.isLogin.next('Y')
    return this.isLogin.value;
  }
  regisertUser(data:any){
    return this._http.post(this.apiBaseUrl+'register',data).subscribe(res=> {
      alert("user created, please login");
      this._route.navigate(['/login'])
    } );
  }
  setIsLogin(str:string){
    this.isLogin.next(str)
  }

  login(data:any){
    this._http.post(this.apiBaseUrl+'login',data)
    .subscribe(
      (res:any)=>{
        localStorage.setItem("token",res.result.token || null)
        this.isLogin.next('Y');
        this._route.navigate(['/'])
      },err=> alert(err.error.message || err.error.error || 'somethong not good'  )
    )
  }
  logout(){
    this.setIsLogin("N")
    localStorage.removeItem('token')
    this._route.navigate(['/login'])
  }
}
