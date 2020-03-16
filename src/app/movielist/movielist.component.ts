import { Component, OnInit } from '@angular/core';
import { GetlistService } from '../getlist.service';
import { Movie } from '../movie.model';

@Component({
  selector: 'app-movielist',
  templateUrl: './movielist.component.html',
  styleUrls: ['./movielist.component.css'],
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
    this.getListService.getPage(page).subscribe((movies) => {
      this.totalResults = movies.totalResults;
      this.movielist = movies.results;
      this.removedMovies = JSON.parse(localStorage.getItem('removed'));
      if (this.removedMovies === null) {
        this.removedMovies = [];
      }
      console.log(this.removedMovies);
    });

    this.currentPage = page;
    window.scroll(0,0); //return to the top of the page
  }

}
