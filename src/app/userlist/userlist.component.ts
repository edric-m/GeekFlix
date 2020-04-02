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
    this.list = [];//[324857,1726];
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
    //let emotions = [];
    let filteredList: number[] = [];
    
    for(let emotion of this.listOfSelectedValue) { //TODO: cant get this to work but is ideally the functionality wanted
      //emotions.push(emotion);
      let emoId = this.listOfOption.indexOf(emotion);
      //let emoId = 8;
      let emoList = localStorage.getItem('emoji'+emoId);
      if(emoList === null) {
        //do nothing
      } else {
        let x = emoList; //localStorage.getItem('emoji'+emoId);
        let x2: number[] = JSON.parse(x);
        //this.list = [...this.list,...x2]; //concat two arrays

        //filteredList = x2; //closest answer so far
        for(let id of x2) {
          if(!filteredList.includes(id)) {  //TODO: 2-4-20 almost but i want to only show movies that share all emojis
            filteredList.push(id);
          }
        }
        
        //x2.push(this.movieId);
        //console.log(x2);
        //localStorage.setItem('emoji'+emoId, JSON.stringify(x2));
      }
    }

    //this.list;
    this.list = [...filteredList];
    //TODO: if listOfSelectedValue is empty delete this movie from local storage
    //localStorage.setItem(this.route.snapshot.params['id'], JSON.stringify(emotions));

    //fill list
    this.findMoviesFromList(this.list); //does this not work because its async?
  }

  findMoviesFromList(list: number[]) {
    this.movieList = [];
    this.hasData = false;
    for(let id of list) {
      this.hasData = true;
      this.getMovie(id);
    }
  }

  getMovie(movieId: number) {
    this.getListService.getMoviePage(movieId).subscribe((movie) => {
      //modify description to be emojis
      this.movieList.push(movie);
    });
  }

  //TODO: this function is duplicate code, twice now
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
