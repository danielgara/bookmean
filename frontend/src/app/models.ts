export interface User{
    name: string;
    id: string;    
}

export interface Movie{
    poster: string;
    title: string;
    rated: string;
    plot: string;
    _id: string;
    reviews: Array<Review>;
}

export interface Movies{
    movies: Array<Movie>;       
}

export interface Review{
    name: string;
    date: Date;    
    review: string;   
    user_id: string; 
    _id: string
}
