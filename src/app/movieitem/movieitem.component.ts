import { Component, OnInit, Input } from '@angular/core';

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

  constructor() { }

  ngOnInit(): void {
  }

  itemClick() {
    console.log("item clicked");
  }

}
