import { Component } from '@angular/core';
import { GetlistService } from './getlist.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'GeekFlix';

  constructor(private getListService: GetlistService) { }
}
