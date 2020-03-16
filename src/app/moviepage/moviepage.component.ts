import { Component, OnInit } from '@angular/core';
import { Movie } from '../movie.model';
import { GetlistService } from '../getlist.service';
import { ActivatedRoute, Params } from '@angular/router';

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

  constructor(private getListService: GetlistService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.getMovie(this.route.snapshot.params['id']);
    this.route.params
      .subscribe(
        (params: Params) => {
          this.getMovie(params['id']);
          window.scroll(0,0); //scroll to top of page
        }
      );
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
