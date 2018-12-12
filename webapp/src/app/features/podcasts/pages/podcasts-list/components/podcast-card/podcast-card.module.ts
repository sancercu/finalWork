import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PodcastCardComponent } from './podcast-card.component';
import { MomentModule } from 'angular2-moment';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    MomentModule,
    RouterModule
  ],
  declarations: [PodcastCardComponent],
  exports: [
    PodcastCardComponent
  ]
})
export class PodcastCardModule { }
