import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
//import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-head-bar',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './head-bar.html',
  styleUrl: './head-bar.css'
})
export class HeadBar {
  faHeart = faHeart;
}