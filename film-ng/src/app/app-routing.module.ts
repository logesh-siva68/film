import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddEditMovieComponent } from './add-edit-movie/add-edit-movie.component';
import { AuthGuard } from './guard/auth.guard';
import { LoginComponent } from './login/login.component';
import { MoviesComponent } from './movies/movies.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  {
    path:"",
    canActivate: [AuthGuard],
    component:MoviesComponent
  },
  {
    path:"login",
    component:LoginComponent
  },
  {
    path:'register',
    component:RegisterComponent
  },
  {
    path:"add-movie",
    component:AddEditMovieComponent
  },
  {
    path:"edit-movie/:id",
    component:AddEditMovieComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
