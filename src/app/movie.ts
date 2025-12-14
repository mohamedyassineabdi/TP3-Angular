import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({ providedIn: 'root' })
export class MovieService {
  private httpClient = inject(HttpClient);
  private apiKey = environment.tmdbApiKey;
  private base = 'https://api.themoviedb.org/3';

  getMovieList(): Observable<any> {
    const url = `${this.base}/movie/now_playing?api_key=${this.apiKey}`;
    return this.httpClient.get(url);
  }

  getMovieById(id: number): Observable<any> {
    const url = `${this.base}/movie/${id}?api_key=${this.apiKey}`;
    return this.httpClient.get(url);
  }

  getMovieByTitle(title: string): Observable<any> {
    const url = `${this.base}/search/movie?query=${encodeURIComponent(title)}&api_key=${this.apiKey}`;
    return this.httpClient.get(url);
  }
}
