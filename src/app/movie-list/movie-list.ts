import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { SearchBar } from '../search-bar/search-bar';
import { MovieService } from '../movie';
import { WishListService } from '../wishlist.service';

@Component({
  selector: 'app-movie-list',
  standalone: true,
  imports: [CommonModule, SearchBar],
  templateUrl: './movie-list.html',
  styleUrl: './movie-list.css',
})
export class MovieList implements OnInit {
  movies: any[] = [];
  filteredMovies: any[] = [];
  loading = true;
  error: string | null = null;

  constructor(private movieService: MovieService, private wishList: WishListService) {}

  ngOnInit(): void {
    this.loading = true;
    this.movieService.getMovieList().subscribe({
      next: (res) => {
        this.movies = res && res.results ? res.results : [];
        this.filteredMovies = [...this.movies];
        this.loading = false;
      },
      error: (err) => {
        this.error = err?.message || 'Failed to load movies';
        this.loading = false;
      }
    });
  }

  onSearch(title: string) {
    const q = (title || '').trim();
    if (!q) {
      // restore initial list
      this.filteredMovies = [...this.movies];
      return;
    }

    // search via service
    this.movieService.getMovieByTitle(q).subscribe({
      next: (res) => {
        this.filteredMovies = res && res.results ? res.results : [];
      },
      error: () => {
        this.filteredMovies = [];
      }
    });
  }

  openMovieInNewTab(id: number) {
    try {
      const url = `/movie/${id}`;
      window.open(url, '_blank', 'noopener');
    } catch (e) {
      // fallback: navigate in same tab
      location.href = `/movie/${id}`;
    }
  }

  // Modal state for inline movie details
  selectedMovie: any | null = null; // will hold full details
  modalLoading = false;
  modalError: string | null = null;
  inWishlistModal = false;

  openModal(movie: any) {
    this.modalLoading = true;
    this.modalError = null;
    // lock scroll
    document.body.style.overflow = 'hidden';

    // fetch full details from service to ensure we have complete info
    this.movieService.getMovieById(movie.id).subscribe({
      next: (m) => {
        this.selectedMovie = m;
        this.inWishlistModal = this.wishList.contains(m.id);
        this.modalLoading = false;
        // add escape handler
        document.addEventListener('keydown', this._escapeHandler);
      },
      error: (err) => {
        this.modalError = err?.message || 'Failed to load details';
        this.modalLoading = false;
      }
    });
  }

  closeModal() {
    this.selectedMovie = null;
    this.modalLoading = false;
    this.modalError = null;
    this.inWishlistModal = false;
    document.body.style.overflow = '';
    document.removeEventListener('keydown', this._escapeHandler);
  }

  private _escapeHandler = (ev: KeyboardEvent) => {
    if (ev.key === 'Escape') {
      this.closeModal();
    }
  };

  toggleWishModal() {
    if (!this.selectedMovie) return;
    this.wishList.toggle(this.selectedMovie);
    this.inWishlistModal = this.wishList.contains(this.selectedMovie.id);
  }
}
