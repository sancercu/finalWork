import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { CommentsService } from 'src/app/features/podcasts/services/comments.service';
import { Comment } from 'src/app/features/podcasts/models/comment';
import { Podcast } from 'src/app/features/podcasts/models/podcast';

@Component({
  selector: 'app-comment-form',
  templateUrl: './comment-form.component.html',
  styleUrls: ['./comment-form.component.scss']
})
export class CommentFormComponent implements OnInit {

  @Output() public addComment: EventEmitter<Comment> = new EventEmitter<Comment>();
  @Input() public podcast: Podcast;
  public comment = new Comment();
  public sessionStatus: boolean;
  public addingComment = false;
  public block = false;

  constructor(
    private auth: AuthService,
    private commentsService: CommentsService
  ) {
    // Escuchamos cambios del estado de la sesion
    this.observeSessionStatusChanges();
  }

  ngOnInit() {
    this.sessionStatus = this.auth.isAuthenticated();
  }

  public add() {
    this.block = true;
    const user = this.getUser();
    this.addingComment = true;
    this.comment.user = user.id;
    this.comment.podcast = this.podcast.id;
    this.commentsService.create(this.comment).subscribe(
      (comment: Comment) => {
        this.addComment.emit(comment);
        this.comment = new Comment();
        this.addingComment = false;
        this.block = false;
      },
      () => {
        this.block = false;
      }
    );
  }

  private observeSessionStatusChanges() {
    this.auth.observeSessionStatusChanges().subscribe(
      (value: boolean) => {
        this.sessionStatus = value;
      }
    );
  }

  private getUser() {
    return {
      id: (localStorage.userId) ? parseInt(localStorage.userId, 10) : null,
      username: localStorage.username
    };
  }

}
