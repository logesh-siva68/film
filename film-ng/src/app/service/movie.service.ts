import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { environment as en } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  apiBaseUrl = en.api_url;

  movies = new BehaviorSubject([])

  constructor(private _http: HttpClient, private _router : Router) { }

  getLocalMoive(){
    return this.movies.value;
  }

  getMovie(){
    const token = localStorage.getItem('token') || ""
    let _params = new HttpParams()
    _params = _params.append('token', token)
    return this._http.get(this.apiBaseUrl+'/movies', { params: _params})
  }

  updateMovie(movie:any){
    const token = localStorage.getItem('token') || ""
    movie.token = token
   this._http.put(this.apiBaseUrl+'/update-movie', movie).subscribe(
      res=> this._router.navigate(['/']),
      err=> console.log(err)
      )

  }
  addMovie(movie:any){
    const token = localStorage.getItem('token') || ""
    movie.token = token
    this._http.post(this.apiBaseUrl+'/add-movie', movie).subscribe(
      res=> this._router.navigate(['/']),
      err=> console.log(err)
      )

  }



}
