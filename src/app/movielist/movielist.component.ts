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
    this.getListService.getPage().subscribe((movies) => {
      this.movielist = movies;
      //console.log(this.loadedmovies);
    });
  }

}
