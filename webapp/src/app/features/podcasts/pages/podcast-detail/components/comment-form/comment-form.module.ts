import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommentFormComponent } from './comment-form.component';
import { FormsModule } from '@angular/forms';
import { SpinnerModule } from 'src/app/components/spinner/spinner.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SpinnerModule
  ],
  declarations: [CommentFormComponent],
  exports: [CommentFormComponent]
})
export class CommentFormModule { }
