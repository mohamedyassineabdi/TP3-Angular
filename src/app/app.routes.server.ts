import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  // Render movie detail pages on-demand on the server because they use a dynamic `:id` param
  {
    path: 'movie/:id',
    renderMode: RenderMode.Server
  },
  // Prerender other routes (catch-all)
  {
    path: '**',
    renderMode: RenderMode.Prerender
  }
];
