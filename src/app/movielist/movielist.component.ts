import { Component, OnInit } from '@angular/core';
import { GetlistService } from '../getlist.service';
import { Movie } from '../movie.model';
import { NzResultServerErrorComponent } from 'ng-zorro-antd/result/partial/server-error.component';
//import { Observable } from 'rxjs';

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
  removedMovies: number[] = [];

  constructor(private getListService: GetlistService) { }

  ngOnInit(): void {
    this.getPage(this.currentPage);
  }

  getPage(page: number) {
    this.getListService.getPage(page).subscribe((movies: { totalResults: number; results: Movie[] }) => {
      this.totalResults = movies.totalResults;
      //this.movielist = movies.results;
      this.removedMovies = JSON.parse(localStorage.getItem('removed'));
      let filteredList = [];

      let removedItems: number[] = JSON.parse(localStorage.getItem('removed'));
      for(let movie of movies.results) {
        if(removedItems != null) {
          if(!removedItems.includes(movie.id)) {
            filteredList.push(movie);
          }
        } else {
          filteredList = movies.results;
        }
      }

      this.movielist = filteredList;
      
    });

    this.currentPage = page;
    window.scroll(0,0); //return to the top of the page
  }

  removeMovie(id:number) {
    if(localStorage.getItem('removed') === null) {
      localStorage.setItem('removed', JSON.stringify([id]));
    }
    else {
      let removedItems = JSON.parse(localStorage.getItem('removed'));
      removedItems.push(id); //TODO: this pushes duplicates when it shouldnt
      localStorage.setItem('removed', JSON.stringify(removedItems));
    }

    this.getPage(this.currentPage);
    
    //location.reload(); //TODO: this is no good because it requires calling the server again (not reactive or SPA), need to bind the event to parent
  
  }

}
