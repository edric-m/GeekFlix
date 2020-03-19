import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { MovielistComponent } from './movielist/movielist.component';
import { MovieitemComponent } from './movieitem/movieitem.component';
import { MoviepageComponent } from './moviepage/moviepage.component';
import { NgZorroAntdModule, NZ_I18N, en_US } from 'ng-zorro-antd';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { Routes, RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

const appRoutes: Routes = [
  { path: '', component : MovielistComponent }, //how to make default path with the right url?
  { path: 'movies/sci-fi', component: MovielistComponent },
  { path: 'movie/:id/:name', component: MoviepageComponent }
];

registerLocaleData(en);

@NgModule({
  declarations: [
    AppComponent,
    MovielistComponent,
    MovieitemComponent,
    MoviepageComponent
  ],
  imports: [
    BrowserModule,
    NgZorroAntdModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(appRoutes),
    FontAwesomeModule
  ],
  providers: [{ provide: NZ_I18N, useValue: en_US }],
  bootstrap: [AppComponent]
})
export class AppModule { }
