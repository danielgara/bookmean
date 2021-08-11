import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Movies, Movie } from 'src/app/models';

@Injectable()
export class MovieDataService{
    constructor(private _http: HttpClient){

    }
   
    find(query: String, by = "title", page = 0):Observable<Movies>{
      return this._http.get<Movies>(
 `https://guarded-savannah-47368.herokuapp.com/api/v1/movies?${by}=${query}&page=${page}`
)
}

    get(id: String):Observable<Movie>{ 
      return this._http.get<Movie>(
       `https://guarded-savannah-47368.herokuapp.com/api/v1/movies/id/${id}`
      )
    }        
   
    createReview(data: any){
      return this._http.post<any>(
        "https://guarded-savannah-47368.herokuapp.com/api/v1/movies/review", 
        data
      )
    }
    
    updateReview(data: any){
      return this._http.put(
        "https://guarded-savannah-47368.herokuapp.com/api/v1/movies/review", data
      )
    }
        
    deleteReview(review_id: string, user_id: string){       
        const options = {
          headers: new HttpHeaders({
            'Content-Type': 'application/json',
          }),
          body: {
            review_id: review_id,
            user_id: user_id,
          },
        };
        return this._http.delete(
          "https://guarded-savannah-47368.herokuapp.com/api/v1/movies/review", options
        )        
    }
    
    getRatings():Observable<String[]>{
      return this._http.get<String[]>(
        "https://guarded-savannah-47368.herokuapp.com/api/v1/movies/ratings"
      )
    }    
}
