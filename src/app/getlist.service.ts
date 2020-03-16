import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Page } from './list.model';
import { Movie } from './movie.model'

@Injectable({
  providedIn: 'root'
})
export class GetlistService {
  listURL: string = "https://api.themoviedb.org/3/discover/movie?api_key=b45808cfc639faa44235410b835b0912&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false";
  page: string = "&page=1"; //page 1 only for now should be component input as integer
  genre: string = "&with_genres=878";
  loadedmovies: Movie[] = [];

  constructor(private http: HttpClient) { }

  getPage() {
    this.getList();
  }

  private getList() {
    this.http
      .get(this.listURL + this.page + this.genre)
      .pipe(map((responseData: Page )  => {
        //const dataArray = [];
        //for (const movie in responseData.results) {
        //  dataArray.push({ movie });
        //}
        //return dataArray;
        return responseData.results;
      }))
      .subscribe((movies) => {
        this.loadedmovies = movies;
        console.log(this.loadedmovies);
      });
  }
}
