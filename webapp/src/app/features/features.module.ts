import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PodcastsModule } from './podcasts/podcasts.module';
import { podcastsRoutes } from './podcasts/podcasts.module';

export const featuresRoutes = [
  ...podcastsRoutes
];

@NgModule({
  imports: [
    CommonModule,
    PodcastsModule
  ],
  declarations: []
})
export class FeaturesModule { }
