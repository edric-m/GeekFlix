import { Component, OnInit } from '@angular/core';
import { GetlistService } from '../getlist.service';
import { Movie } from '../movie.model';
//import { NzResultServerErrorComponent } from 'ng-zorro-antd/result/partial/server-error.component';
//import { Observable } from 'rxjs';
//import fakeListResponseData from '../fakeList.data';

@Component({
  selector: 'app-movielist',
  templateUrl: './movielist.component.html',
  styleUrls: ['./movielist.component.css']
  //providers: [GetlistService]
})
export class MovielistComponent implements OnInit {
  movielist: Movie[] = [];
  currentPage: number = 1;
  totalResults: number = 1;
  removedMovies: number[] = []; //not bounded

  constructor(private getListService: GetlistService) { }

  ngOnInit(): void {
    //load remove movies here
    this.removedMovies = JSON.parse(localStorage.getItem('removed'));

    //fill the movielist[]
    this.getPage(this.currentPage);

    window.scroll(0,0); //return to the top of the page
  }

  getPage(page: number) {
    this.getListService.getPage(page).subscribe((movies: { totalResults: number; results: Movie[] }) => {
      this.totalResults = movies.totalResults;
      //this.movielist = movies.results;

      // this.removedMovies = JSON.parse(localStorage.getItem('removed'));
      let filteredList = [];

      //this.removedMovies = JSON.parse(localStorage.getItem('removed'));
      //let removedItems = this.removedMovies;
      if(this.removedMovies != null) {
        for(let movie of movies.results) {
          if(!this.removedMovies.includes(movie.id)) {
            if(!this.movielist.includes(movie)) {
              filteredList.push(movie);
            }
          }
        }
      } else {
        filteredList = movies.results;
      }

      for(let item of filteredList) {
        this.movielist.push(item);
      }
      //this.movielist.push(filteredList); 
      //this.movielist = movies.results;
    });

    this.currentPage = page;
  }

  removeMovie(id:number) { //TODO: make this function a service or something
    if(localStorage.getItem('removed') === null) {
      localStorage.setItem('removed', JSON.stringify([id]));
    }
    else {
      let removedItems = JSON.parse(localStorage.getItem('removed'));
      removedItems.push(id); //TODO: this pushes duplicates when it shouldnt
      localStorage.setItem('removed', JSON.stringify(removedItems));

      let newList = [];
      for(let movie of this.movielist) {
        if(movie.id != id) {
          newList.push(movie);
        }
      }
      this.movielist = newList;
    }

    //this.getPage(this.currentPage);
    //this.ngOnInit();
    
    //location.reload(); //TODO: this is no good because it requires calling the server again (not reactive or SPA), need to bind the event to parent
  }

  loadMoreMovies() {
    this.getPage(this.currentPage + 1);
  }
}
