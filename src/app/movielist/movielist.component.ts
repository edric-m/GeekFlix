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

  constructor(private getListService: GetlistService) { }

  ngOnInit(): void {
    this.getPage(this.currentPage);
  }

  getPage(page: number) {
    this.getListService.getPage(page).subscribe((movies) => {
      this.totalResults = movies.totalResults;
      this.movielist = movies.results;
      console.log(movies);
    });

    this.currentPage = page;
    window.scroll(0,0);
  }

}
