import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-movieitem',
  templateUrl: './movieitem.component.html',
  styleUrls: ['./movieitem.component.css']
})
export class MovieitemComponent implements OnInit {
  name: string = "";
  description: string = "";

  constructor() { }

  ngOnInit(): void {
  }

}
