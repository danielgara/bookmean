import { Component, OnDestroy, OnInit } from '@angular/core';
import { MovieDataService } from '../../services/movie.service';
import { Movie } from '../../models';
import { FormControl } from '@angular/forms';
import { filter,debounceTime,distinctUntilChanged } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-movies-list',
  templateUrl: './movies-list.component.html',
  providers: [MovieDataService]
})
export class MoviesListComponent implements OnInit, OnDestroy {
  title = new FormControl('');  
  ratingsDropdown = new FormControl();    
  
  movies: Array<Movie> = [];
  ratings: Array<String> = [];

  currentPage: number = 0;
  currentSearchTitle: String = ''
  currentSearchRating: String = ''
  entriesPerPage: number = 20

  subscriptionRatings!: Subscription;
  subscriptionMovies!: Subscription;

  constructor(private _movieDataService: MovieDataService){
  }

  ngOnInit() {
    this.subscriptionRatings = this._movieDataService.getRatings()
      .subscribe(data => {        
        this.ratings = data;        
      })                              

    this.title.valueChanges.pipe(filter(text => text.length >= 3), 
      debounceTime(400),distinctUntilChanged())                
            .subscribe(value => {  

              this.currentPage = 0 
              this.currentSearchTitle = value;
              this.currentSearchRating = ''
    
              this.subscriptionMovies = this._movieDataService.find(value,"title")
              .subscribe(data => {        
                this.movies = data.movies;
              })                              
            }
          );        
    }

    getNextPage(){
      this.currentPage++;   
      if(this.currentSearchTitle.length > 0) {
        this.subscriptionMovies = this._movieDataService.find(this.currentSearchTitle, "title",  this.currentPage)
          .subscribe(data => {        
                this.movies = data.movies;      
        })       
      }
      else if(this.currentSearchRating.length > 0){
        this.subscriptionMovies = this._movieDataService.find(this.currentSearchRating,"rated", this.currentPage)
          .subscribe(data => {        
            this.movies = data.movies;      
        })      
      }
    }
  
  changeRating(value: String){
    this.currentPage = 0 
    this.currentSearchRating = value; 
    this.currentSearchTitle = '';   

    this.subscriptionMovies = this._movieDataService.find(value,"rated")
      .subscribe(data => {        
        this.movies = data.movies;
        console.log("ratingsDropdown",this.movies)
      })                          
  }  
  
  ngOnDestroy(): void{    
    if (this.subscriptionRatings) {
      this.subscriptionRatings.unsubscribe();      
    }
    if (this.subscriptionMovies) {
      this.subscriptionMovies.unsubscribe();
    }
  }
}

