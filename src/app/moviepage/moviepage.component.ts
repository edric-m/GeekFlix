import { Component, OnInit } from '@angular/core';
import { Movie } from '../models/movie.model';
import { GetlistService } from '../services/getlist.service';
import { ActivatedRoute, Params } from '@angular/router';
import { faCoffee } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-moviepage',
  templateUrl: './moviepage.component.html',
  styleUrls: ['./moviepage.component.css']
})
export class MoviepageComponent implements OnInit {
  movieId: number;
  movieTitle: string;
  movieDescription: string;
  movieImage: string;
  relatedMovies: Movie[];
  imagePrefix: string = "https://image.tmdb.org/t/p/w1280";
  movieBackdropImage: string;
  movieReleaseDate: string;
  removedMovies: number[] = [];
  hasRelatedMovies: boolean;
  pageLoading: boolean = true;
  relatedMoviesPage: Movie[];
  currentPage: number;
 
  // listOfOption = [
  //   '(｡◕‿◕｡)',
  //   '(ಥ﹏ಥ)',
  //   '♥‿♥',
  //   'ლ(ಠ益ಠ)ლ',
  //   '༼ つ◕_◕ ༽つ',
  //   'ಠ_ಠ',
  //   '¯\\_(ツ)_/¯',
  //   '(╯°□°）╯︵┻━┻',
  //   '(づ￣ ³￣)づ',
  //   '(>ლ)',
  //   'ヾ(⌐■_■)ノ♪'];
    listOfOption = [
      '😀',
      '🤣',
      '😍',
      '🍕',
      '😔',
      '🤔',
      '😴',
      '🧠',
      '💩',
      '🤯',
      '😱',
      '💀',
      '🤬',
      '😭'];
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

    //TODO: create a service for localStorage
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

      let emoId = this.listOfOption.indexOf(emotion);
      let emoList = localStorage.getItem('emoji'+emoId);
      if(emoList === null) {
        localStorage.setItem('emoji'+emoId, JSON.stringify([this.movieId]));
      } else {
        let x = localStorage.getItem('emoji'+emoId);
        let x2 = JSON.parse(x);
        x2.push(this.movieId);
        console.log(x2);
        localStorage.setItem('emoji'+emoId, JSON.stringify(x2));
      }

    }
    //console.log(JSON.parse(JSON.stringify(emotions)));

    //TODO: if listOfSelectedValue is empty delete this movie from local storage

    localStorage.setItem(this.route.snapshot.params['id'], JSON.stringify(emotions));
  }

  getMovie(movieId: number) {
    this.getListService.getMoviePage(movieId).subscribe((movie) => {
      this.movieReleaseDate = ' (' + movie.release_date.substring(0,4) + ')';
      this.movieId = movie.id;
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
      this.pageLoading = false;
      window.scroll(0,0); //scroll to top of page only after movie is loaded
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
      this.currentPage = 1;
      this.relatedMoviesPage = [...this.relatedMovies];
    });
  }

  getPage() {
    let tempList = [...this.relatedMoviesPage]; //clone array by value. [] = [] is by refrence
    
      let temp = tempList.shift();
      tempList.push(temp);
    
    this.relatedMoviesPage = [...tempList];
  }

  getPrevPage() {
    let tempList = [...this.relatedMoviesPage]; //clone array by value. [] = [] is by refrence
    
      let temp = tempList.pop();
      tempList.unshift(temp);
    
    this.relatedMoviesPage = [...tempList];
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
    for(let movie of this.relatedMoviesPage) {
      if(movie.id != id) {
        newList.push(movie);
      }
    }

    //this.relatedMovies = newList;
    this.relatedMoviesPage = newList;//[...this.relatedMovies];
  }
}
