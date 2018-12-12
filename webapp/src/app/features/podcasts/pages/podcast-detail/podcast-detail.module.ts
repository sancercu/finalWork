import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PodcastDetailComponent } from './podcast-detail.component';
import { RouterModule } from '@angular/router';
import { SpinnerModule } from 'src/app/components/spinner/spinner.module';
import { MomentModule } from 'angular2-moment';
import { CommentFormModule } from './components/comment-form/comment-form.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    SpinnerModule,
    MomentModule,
    CommentFormModule
  ],
  declarations: [PodcastDetailComponent]
})
export class PodcastDetailModule { }
