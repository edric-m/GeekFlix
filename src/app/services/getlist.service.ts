import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Page } from '../models/list.model';
import { Movie } from '../models/movie.model';

@Injectable({
  providedIn: 'root'
})
export class GetlistService {
  private listURL: string = "https://api.themoviedb.org/3/discover/movie?api_key=b45808cfc639faa44235410b835b0912&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false";
  private movieURLprefix: string = "https://api.themoviedb.org/3/movie/";
  private movieURLsuffix: string = "?api_key=b45808cfc639faa44235410b835b0912&language=en-US";
  private relatedURLsuffix: string = "/similar?api_key=b45808cfc639faa44235410b835b0912&language=en-US&page=1";
  private page: string = "&page="; //page 1 only for now should be component input as integer
  genre: string = "&with_genres=878";
  loadedMoviesId: number[];
  private maxMoviesAllowedToLoad;

  constructor(private http: HttpClient) { }

  getPage(page: number) {
    //init component variables
    this.maxMoviesAllowedToLoad = 1000;
    //this.listResults = this.getList(page);
    return this.getList(page);

    //TODO: manage list here to make sure it is always 20 long. also change item count here
  }

  getMoviePage(movieId: number) {
    return this.getMovie(movieId);
  }

  getRelatedMovies(movieId: number) {
    return this.getRelated(movieId);
  }

  private addMovieId(id: number) {
    if(this.loadedMoviesId.length <= this.maxMoviesAllowedToLoad) {
      this.loadedMoviesId.push(id);

    } else {
      console.log("too many movies loaded");
    }
  }

  private getList(pageNumber: number) {
    return this.http
    .get(this.listURL + this.page + pageNumber + this.genre)
    .pipe(map((responseData: Page ) => {
      
      //add the loaded movies ids to a variable (loadedMoviesId)
      //BEGIN CHANGING HOW LIST IS FILLED
      // let movies = responseData.results;
      // for (let movie of movies) {
      //   this.addMovieId(movie.id);
      // }

      return { totalResults: responseData.total_results, results: responseData.results };
    }));
  }

  private getMovie(movieId: number) {
    return this.http
      .get(this.movieURLprefix + movieId + this.movieURLsuffix)
      .pipe(map(( responseData: Movie )  => {
        //console.log(responseData);
        return responseData;
      }));
  }

  private getRelated(movieId: number) {
    return this.http
      .get(this.movieURLprefix + movieId + this.relatedURLsuffix)
      .pipe(map(( responseData: {page: number; results: Movie[]}, key )  => {
        //console.log(responseData);

        for(let movie of responseData.results){
          let newDescription = '';
          newDescription = localStorage.getItem(movie.id+'');
          if(newDescription === null) {
            newDescription = '';
          }
          movie.overview = newDescription;
        }
        
        return responseData.results;
      }));
  }

  //removeMovie(id: number) { //better to do this here?
  //}
}
