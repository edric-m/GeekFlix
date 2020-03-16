import { Component, OnInit } from '@angular/core';
import { GetlistService } from '../getlist.service';
import { Movie } from '../movie.model';

@Component({
  selector: 'app-movielist',
  templateUrl: './movielist.component.html',
  styleUrls: ['./movielist.component.css'],
  providers: [GetlistService]
})
export class MovielistComponent implements OnInit {
  movielist: Movie[] = [];

  constructor(private getListService: GetlistService) { }

  ngOnInit(): void {
    this.getListService.getPage();

    setTimeout(() => {
      let x: Movie[] = this.getListService.loadedmovies;
      for (let movie of x) {
        this.movielist.push({ 
          poster_path: movie.poster_path, 
          id: movie.id, 
          original_title: movie.original_title, 
          overview: movie.overview 
        });
      }
    },1000);
  }

}
