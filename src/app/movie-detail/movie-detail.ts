import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MovieService } from '../movie';
import { WishListService } from '../wishlist.service';

@Component({
  selector: 'app-movie-detail',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './movie-detail.html',
  styleUrl: './movie-detail.css',
})
export class MovieDetail implements OnInit {
  movie: any | null = null;
  loading = true;
  error: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private movieService: MovieService,
    private wishList: WishListService
  ) {}

  ngOnInit(): void {
    this.loading = true;
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (!id) {
      this.error = 'Invalid movie id';
      this.loading = false;
      return;
    }

    this.movieService.getMovieById(id).subscribe({
      next: (m) => {
        this.movie = m;
        // initialize wishlist state
        try {
          this.inWishlist = this.wishList.contains(m.id);
        } catch {
          this.inWishlist = false;
        }
        this.loading = false;
      },
      error: (err) => {
        this.error = err?.message || 'Failed to load movie details';
        this.loading = false;
      }
    });
  }

  inWishlist = false;

  toggleWish() {
    if (!this.movie) return;
    this.wishList.toggle(this.movie);
    this.inWishlist = this.wishList.contains(this.movie.id);
  }
}
