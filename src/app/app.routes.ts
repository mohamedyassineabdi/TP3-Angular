import { Routes } from '@angular/router';
import { MovieList } from './movie-list/movie-list';
import { MovieDetail } from './movie-detail/movie-detail';
import { WishList } from './wish-list/wish-list';

export const routes: Routes = [
  { path: '', redirectTo: 'movies', pathMatch: 'full' },
  { path: 'movies', component: MovieList },
  { path: 'movie/:id', component: MovieDetail},
  { path: 'wishlist', component: WishList },
  { path: '**', redirectTo: 'movies' } // route par défaut
];
