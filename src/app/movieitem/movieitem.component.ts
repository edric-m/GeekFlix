import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
//import { EventEmitter } from 'protractor';

@Component({
  selector: 'app-movieitem',
  templateUrl: './movieitem.component.html',
  styleUrls: ['./movieitem.component.css']
})
export class MovieitemComponent implements OnInit {
  @Input('name') name: string;
  @Input('description') description: string;
  imagePrefix: string = "https://image.tmdb.org/t/p/w1280";
  @Input('image') imageFile: string;// = "/iZf0KyrE25z1sage4SYFLCCrMi9.jpg"; //link
  @Input('id') id: number;
  
  @Output() itemDelete = new EventEmitter<number>();

  constructor(private router: Router) {}

  ngOnInit(): void {
  }

  itemClick() {
    let linkName = this.name.replace(/ /g, '_');
    linkName = linkName.replace(/\//g, '-');
    //console.log(linkName);
    this.router.navigate(['/movie/' + this.id + '/' + linkName]);
  }

  removeItem() {
    if (confirm("Delete '" + this.name + "' from the list?")) {
      //this.getListService.removeMovie(this.id);
      //this.getListService.getPage(5);
      this.itemDelete.emit(this.id);
    }
  }
}
