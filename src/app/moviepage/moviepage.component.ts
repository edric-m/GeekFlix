import { Component, OnInit } from '@angular/core';
import { Movie } from '../movie.model';
import { GetlistService } from '../getlist.service';
import { ActivatedRoute, Params } from '@angular/router';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';

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
  movieBackdropImage: string;
  movieReleaseDate: string;
  removedMovies: number[] = [];
  hasRelatedMovies: boolean;
 
  listOfOption = [
    'ಠ_ಠ','¯\_(ツ)_/¯','( ͡° ͜ʖ ͡°)','(╯°□°）╯︵ ┻━┻','ლ(ಠ益ಠ)ლ','(｡◕‿◕｡)','(ಥ﹏ಥ)','༼ つ ◕_◕ ༽つ',
    '(ง ͠° ͟ل͜ ͡°)ง','(づ￣ ³￣)づ','♥‿♥','(>ლ)','ヾ(⌐■_■)ノ♪','≧☉_☉≦'];
  listOfSelectedValue = [];
  //defaultOption = [...this.listOfSelectedValue];
  //selectedValue = 'Default';
  //faCoffee = faCoffee;
  //icon = "<fa-icon [icon]=\"faCoffee\"></fa-icon>";

  constructor(private getListService: GetlistService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    //this.listOfSelectedValue = JSON.parse(localStorage.getItem(this.route.snapshot.params['id']));
    //this.getMovie(this.route.snapshot.params['id']);
    // let temp = JSON.parse(localStorage.getItem('removed'));
    // if(temp === null) {
    //   this.removedMovies = [];
    // } else {
    //   this.removedMovies = temp;
    // }

    //TODO: issue when the 'removed' key has no value - doesn't load any related
    try{
      this.removedMovies = JSON.parse(localStorage.getItem('removed'));
      this.removedMovies.includes(0);
    } catch {
      this.removedMovies = [];
    }
    this.route.params
      .subscribe( //this is used when the user clicks on a related movie
        (params: Params) => {
          this.getMovie(params['id']);
          //this.listOfSelectedValue = JSON.parse(localStorage.getItem(this.route.snapshot.params['id']));
          this.listOfSelectedValue = JSON.parse(localStorage.getItem(params['id']));
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
      this.movieReleaseDate = ' (' + movie.release_date.substring(0,4) + ')';
      this.movieTitle = movie.original_title;
      this.movieDescription = movie.overview;
      this.movieImage = movie.poster_path;
      if(movie.backdrop_path === null) {
        this.movieBackdropImage = movie.poster_path;
      } else {
        this.movieBackdropImage = movie.backdrop_path;
      }
      console.log(movie);
      console.log(this.movieBackdropImage);
    });

    this.getListService.getRelatedMovies(movieId).subscribe((movies) => {
      let filteredMovies = [];
      if(this.removedMovies != null) {
        for(let movie of movies) {
          if(!this.removedMovies.includes(movie.id)) {
            filteredMovies.push(movie);
          }
        }
      }
      this.relatedMovies = filteredMovies;
      console.log(movies);
      console.log(this.removedMovies);
      if(filteredMovies.length > 0) {
        this.hasRelatedMovies = true;
      } else {
        this.hasRelatedMovies = false;
      }

      window.scroll(0,0); //scroll to top of page only after page is loaded
    });
  }

  //TODO: this function is duplicate code
  deleteMovie(id: number) {
    if(localStorage.getItem('removed') === null) {
      localStorage.setItem('removed', JSON.stringify([id]));

      this.removedMovies = [id];
    }
    else {
      let removedItems = JSON.parse(localStorage.getItem('removed'));
      removedItems.push(id); //TODO: this pushes duplicates when it shouldnt
      localStorage.setItem('removed', JSON.stringify(removedItems));

    }
    let newList = [];
    for(let movie of this.relatedMovies) {
      if(movie.id != id) {
        newList.push(movie);
      }
    }

    this.relatedMovies = newList;
  }
}
