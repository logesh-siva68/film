import { Component, OnInit } from '@angular/core';
import { any, number } from 'joi';
import { AuthService } from '../service/auth.service';
import { MovieService } from '../service/movie.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent implements OnInit {

  moives:any = [];
  constructor(private _auth : AuthService, private _movie : MovieService) { }

  ngOnInit(): void {
    this._movie.getMovie().subscribe(
      (res:any)=>{
        this.moives = res.result
        this._movie.movies.next(this.moives)
      }, err=>{
        alert(err.error.message ||err.error.error || 'something worong')
      })
  }
  delete(id:number){

    this._movie.deleteMovie(id).subscribe((res:any)=>{
      let inx = -1
    inx = this.moives.findIndex((i:any)=> i.id === id);
    console.log("inx---->",inx)
    this.moives.splice(inx,1)
    }, err=> console.log(err))
  }
  logout(){
    this._auth.logout()
  }
}
