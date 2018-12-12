import { NgModule } from '@angular/core';
import { PodcastsListModule } from './pages/podcasts-list/podcasts-list.module';
import { PodcastsListComponent } from './pages/podcasts-list/podcasts-list.component';
import { PodcastDetailModule } from './pages/podcast-detail/podcast-detail.module';
import { PodcastDetailComponent } from './pages/podcast-detail/podcast-detail.component';

export const podcastsRoutes = [
  // Ruta para el listado de podcasts
  { path: 'podcasts', component: PodcastsListComponent },
  // Ruta para el detalle de un podcast
  { path: 'podcasts/:id', component: PodcastDetailComponent }
];

@NgModule({
  imports: [
    PodcastsListModule,
    PodcastDetailModule
  ],
  declarations: []
})
export class PodcastsModule { }
