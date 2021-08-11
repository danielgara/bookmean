import { Component, OnInit, OnDestroy } from '@angular/core';
import { MovieDataService } from '../../services/movie.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Movie, User } from '../../models';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  providers: [MovieDataService]
})
export class MovieComponent implements OnInit, OnDestroy {

  id: String = '';
  subscription!: Subscription;
  movie: Movie = {
    poster: '',
    title: '',
    rated: '',
    plot: '',
    _id: '',
    reviews: []
  };

  constructor(private _movieDataService: MovieDataService, private _route: ActivatedRoute, private _router: Router, private _loginService: LoginService){
  }

  ngOnInit(): void {   
   this.subscription = this._route.params.subscribe(params =>{
    this.id = params["id"]      
    this._movieDataService.get(this.id)
      .subscribe(data => {        
        this.movie = data
      }) 
    })   
  }  

  get userInfo(): User{
    return this._loginService.user;
  }  

  deleteReview(reviewId: string){
    this._movieDataService.deleteReview(
    reviewId, 
    this._loginService.user.id)      
          .subscribe(response => {
            this.movie.reviews = this.movie.reviews.filter(
                ({ _id }) => _id !== reviewId
            );                
          }) 
  }
    

  ngOnDestroy(): void{    
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }  
}
