import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MovieService } from '../service/movie.service';

@Component({
  selector: 'app-add-edit-movie',
  templateUrl: './add-edit-movie.component.html',
  styleUrls: ['./add-edit-movie.component.css']
})
export class AddEditMovieComponent implements OnInit {

  constructor(private _activateRoute :ActivatedRoute, private _movie : MovieService, private _router : Router) { }
  id:any = null
  addUpedate = 'Add'
  movie:any = {casts:[""]}
  ngOnInit(): void {
    this.id = this._activateRoute.snapshot.paramMap.get('id')
    console.log(this.id)
    if(this.id){
      this.addUpedate = 'Update'
      let movies = this._movie.getLocalMoive();
      if(Array.isArray(movies) && movies.length){
        this.movie =  movies.filter((i:any)=> i.id == this.id)[0]
      } else this._router.navigate(['/']);

    }
  }

  addOrUpdate(){
    if(this.id && this._movie.getLocalMoive().length){
      this._movie.updateMovie(this.movie)
    } else this._movie.addMovie(this.movie)
  }


  trackByFn(index:any, item:any) {
    return index;  }
}
