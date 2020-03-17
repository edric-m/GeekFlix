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

  listOfOption = [
    'angry','dizzy','flushed','frown','frown-open','grimace','grin',
    'grin-alt','grin-beam','grin-beam-sweat','grin-hearts','grin-squint','grin-squint-tears',
    'grin-stars','grin-tears','grin-tongue','grin-tongue-wink','grin-wink','kiss','kiss-heart',
    'kiss-wink-heart','laugh','laugh-beam','laugh-squint','laugh-wink','meh','meh-blank',
    'meh-rolling-eyes','sad-cry','sad-tear','smile','smile-beam','smile-wink','surprise','tired'];
  listOfSelectedValue = [];
  defaultOption = [...this.listOfSelectedValue];
  selectedValue = 'Default';

  constructor(private getListService: GetlistService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.listOfSelectedValue = JSON.parse(localStorage.getItem(this.route.snapshot.params['id']));
    this.getMovie(this.route.snapshot.params['id']);
    this.route.params
      .subscribe(
        (params: Params) => {
          this.getMovie(params['id']);
          this.listOfSelectedValue = JSON.parse(localStorage.getItem(this.route.snapshot.params['id']));
          window.scroll(0,0); //scroll to top of page
        }
      );
  }

  emotionAdded() {
    let emotions = [];
    for(let emotion of this.listOfSelectedValue) {
      emotions.push(emotion);
    }
    //console.log(JSON.parse(JSON.stringify(emotions)));

    //TODO: if listOfSelectedValue is empty delete this movie from local storage

    localStorage.setItem(this.route.snapshot.params['id'], JSON.stringify(emotions));
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
