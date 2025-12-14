import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { WishListService } from '../wishlist.service';

@Component({
  selector: 'app-wish-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './wish-list.html',
  styleUrl: './wish-list.css',
})
export class WishList implements OnInit {
  items: any[] = [];

  constructor(private wish: WishListService) {}

  ngOnInit(): void {
    this.load();
  }

  load() {
    this.items = this.wish.getAll();
  }

  remove(id: number) {
    this.wish.remove(id);
    this.load();
  }

  openMovieInNewTab(id: number) {
    try {
      const url = `/movie/${id}`;
      window.open(url, '_blank', 'noopener');
    } catch (e) {
      location.href = `/movie/${id}`;
    }
  }
}
