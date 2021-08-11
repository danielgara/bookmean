import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { LoginService } from '../../services/login.service';	
import { MovieDataService } from '../../services/movie.service';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-add-review',
  templateUrl: './add-review.component.html',  
  providers: [MovieDataService]
})
export class AddReviewComponent implements OnInit, OnDestroy {
      
  editing: Boolean = false  
  id: String = '';
  subscriptionParams!: Subscription;
  subscriptionMovieService!: Subscription;
  submitted: Boolean = false;

  form = new FormGroup({
    review: new FormControl('')    
  });  

  constructor(private _route: ActivatedRoute, private _loginService: LoginService, private _movieDataService: MovieDataService){
    this.subscriptionParams = this._route.params.subscribe(params =>{
      this.id = params["id"]            
    })     
  }

  ngOnInit(): void {
    if(history.state.data){
      this.editing = true;      
      this.form.setValue({review: history.state.data.review.review})      
    }    
  }


  saveReview(){
    var data = {
      review: this.form.controls['review'].value,
      name: this._loginService.user.name,
      user_id: this._loginService.user.id,
      movie_id: this.id, // get movie id direct from url
      review_id: ''
    }
   
    if(this.editing){
      data.review_id = history.state.data.review._id;
      this.subscriptionMovieService = this._movieDataService.updateReview(data)
        .subscribe(response => {
          this.submitted = true;
        }) 
    }
    else{    
      this.subscriptionMovieService = this._movieDataService.createReview(data)
        .subscribe(response => {
          this.submitted = true;
        }) 
    }  
  }

  ngOnDestroy(){
    if (this.subscriptionParams) {
      this.subscriptionParams.unsubscribe();
    }
    
    if (this.subscriptionMovieService) {
      this.subscriptionMovieService.unsubscribe();
    }    
  }
}
