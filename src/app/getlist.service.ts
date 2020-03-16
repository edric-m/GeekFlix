import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Page } from './list.model';
import { Movie } from './movie.model';

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
  //loadedmovies: Movie[] = [];

  constructor(private http: HttpClient) { }

  getPage(page: number) {
    return this.getList(page);
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
      .pipe(map((responseData: Page )  => {
        //console.log(responseData);
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
      .pipe(map(( responseData: {page: number; results: Movie[]} )  => {
        //console.log(responseData);
        return responseData.results;
      }));
  }
}
