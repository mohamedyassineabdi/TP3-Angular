import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeadBar } from './head-bar/head-bar';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeadBar],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class AppComponent {
  protected readonly title = signal('movie-app');
}
