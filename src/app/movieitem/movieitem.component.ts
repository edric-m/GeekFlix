import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

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

  constructor(private router: Router) { }

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
      if(localStorage.getItem('removed') === null) {
        localStorage.setItem('removed', JSON.stringify([this.id]));
      }
      else {
        let removedItems = JSON.parse(localStorage.getItem('removed'));
        removedItems.push(this.id); //TODO: this pushes duplicates
        localStorage.setItem('removed', JSON.stringify(removedItems));
      }
      location.reload(); //TODO: this is no good because it requires calling the server again (not reactive or SPA), need to bind the event to parent
    }
     
  }
}
