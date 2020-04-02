import { Component, OnInit } from '@angular/core';
import { GetlistService } from '../getlist.service';
import { Movie } from '../movie.model';

@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.css']
})
export class UserlistComponent implements OnInit {
  listOfOption = [];
  listOfSelectedValue = [];
  movieList: Movie[] = [];
  userName: string;
  list: number[] = [];
  hasData: boolean;

  constructor(private getListService: GetlistService) { }

  ngOnInit(): void {
    this.list = [324857,1726];
    this.userName = '_USER_';
    this.listOfOption = [
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
    this.hasData = false;
  }

  emotionAdded() {
    let emotions = [];
    
    for(let emotion of this.listOfSelectedValue) {
      emotions.push(emotion);

      this.hasData = true;
    }
    //TODO: if listOfSelectedValue is empty delete this movie from local storage
    //localStorage.setItem(this.route.snapshot.params['id'], JSON.stringify(emotions));

    //fill list
    this.findMoviesFromList(this.list);
  }

  findMoviesFromList(list: number[]) {
    for(let id of list) {
      this.getMovie(id);
    }
  }

  getMovie(movieId: number) {
    this.getListService.getMoviePage(movieId).subscribe((movie) => {
      this.movieList.push(movie);
    });
  }

  //TODO: this function is duplicate code
  deleteMovie(id: number) {
    if(localStorage.getItem('removed') === null) {
      localStorage.setItem('removed', JSON.stringify([id]));

      //this.removedMovies = [id];
    }
    else {
      let removedItems = JSON.parse(localStorage.getItem('removed'));
      removedItems.push(id); //TODO: this pushes duplicates when it shouldnt
      localStorage.setItem('removed', JSON.stringify(removedItems));

    }
    let newList = [];
    for(let movie of this.movieList) {
      if(movie.id != id) {
        newList.push(movie);
      }
    }

    //this.relatedMovies = newList;
    this.movieList = newList;//is this enough to redisplay the data?
  }
}
