import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Page } from './list.model';
import { Movie } from './movie.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GetlistService {
  listURL: string = "https://api.themoviedb.org/3/discover/movie?api_key=b45808cfc639faa44235410b835b0912&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false";
  movieURLprefix: string = "https://api.themoviedb.org/3/movie/";
  movieURLsuffix: string = "?api_key=b45808cfc639faa44235410b835b0912&language=en-US";
  relatedURLsuffix: string = "/similar?api_key=b45808cfc639faa44235410b835b0912&language=en-US&page=1";
  page: string = "&page="; //page 1 only for now should be component input as integer
  genre: string = "&with_genres=878";

  //listObservable: Observable;
  listResults: Observable<{ totalResults: number, results: Movie[] }>;

  constructor(private http: HttpClient) { }

  getPage(page: number) {
    this.listResults = this.getList(page);
  }

  getMoviePage(movieId: number) {
    return this.getMovie(movieId);
  }

  getRelatedMovies(movieId: number) {
    return this.getRelated(movieId);
  }

  private getList(pageNumber: number) {
    
    return this.http
    .get(this.listURL + this.page + pageNumber + this.genre)
    .pipe(map((responseData: Page ) => {
      console.log("called get list in getlistservice " + pageNumber);
      //if page item count < 20 add from next page
      console.log(responseData);
      return { totalResults: responseData.total_results, results: responseData.results };
      //console.log(this.listResults);
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
      .pipe(map(( responseData: {page: number; results: Movie[]} )  => {
        //console.log(responseData);
        return responseData.results;
      }));
  }

  removeMovie(id: number) {
    // if(localStorage.getItem('removed') === null) {
    //   localStorage.setItem('removed', JSON.stringify([id]));
    // }
    // else {
    //   let removedItems = JSON.parse(localStorage.getItem('removed'));
    //   removedItems.push(id); //TODO: this pushes duplicates
    //   localStorage.setItem('removed', JSON.stringify(removedItems));
    // }
    this.listResults = this.getList(5);
    
    //location.reload(); //TODO: this is no good because it requires calling the server again (not reactive or SPA), need to bind the event to parent
  }
}
