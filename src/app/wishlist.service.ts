import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class WishListService {
  private storageKey = 'movie_app_wishlist_v1';

  getAll(): any[] {
    try {
      return JSON.parse(localStorage.getItem(this.storageKey) || '[]');
    } catch {
      return [];
    }
  }

  saveAll(items: any[]) {
    localStorage.setItem(this.storageKey, JSON.stringify(items || []));
  }

  add(movie: any) {
    const list = this.getAll();
    if (!list.find((m: any) => m.id === movie.id)) {
      list.push(movie);
      this.saveAll(list);
    }
  }

  remove(id: number) {
    const list = this.getAll().filter((m: any) => m.id !== id);
    this.saveAll(list);
  }

  toggle(movie: any) {
    if (this.contains(movie.id)) {
      this.remove(movie.id);
    } else {
      this.add(movie);
    }
  }

  contains(id: number) {
    return this.getAll().some((m: any) => m.id === id);
  }
}
