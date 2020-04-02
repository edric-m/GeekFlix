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
  hovered: boolean = false;
  
  @Output() itemDelete = new EventEmitter<number>();

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.description = this.description.replace('["','').replace('"]','').replace('[','').replace(']','').replace(/","/g,' ');
  }

  itemClick() {
    let linkName = this.name.replace(/ /g, '-');
    linkName = linkName.replace(/\//g, '-');
    //console.log(linkName);
    this.router.navigate(['/movie/' + this.id + '/' + linkName]);
  }

  removeItem() {
    this.itemDelete.emit(this.id);
  }

  hasMouseFocus(entered: boolean) {
    if (entered) {
      this.hovered = true;
    } else {
      this.hovered = false;
    }
  }
}
