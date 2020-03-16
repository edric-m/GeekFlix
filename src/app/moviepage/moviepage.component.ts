import { Component, OnInit } from '@angular/core';
import { Movie } from '../movie.model';
import { GetlistService } from '../getlist.service';

@Component({
  selector: 'app-moviepage',
  templateUrl: './moviepage.component.html',
  styleUrls: ['./moviepage.component.css']
})
export class MoviepageComponent implements OnInit {
  movieTitle: string;
  movieDescription: string;
  movieImage: string;
  relatedMovies: Movie[];
  imagePrefix: string = "https://image.tmdb.org/t/p/w1280";

  constructor(private getListService: GetlistService) { }

  ngOnInit(): void {
    this.getMovie(299536);
  }

  getMovie(movieId: number) {
    this.getListService.getMoviePage(movieId).subscribe((movie) => {
      this.movieTitle = movie.original_title;
      this.movieDescription = movie.overview;
      this.movieImage = movie.poster_path;
      console.log(movie);
    });

    this.getListService.getRelatedMovies(movieId).subscribe((movies) => {
      this.relatedMovies = movies;
      console.log(movies);
    });
  }
}
