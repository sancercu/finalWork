import { Component, OnInit, Input } from '@angular/core';
import { Podcast } from 'src/app/features/podcasts/models/podcast';
import { AuthService } from 'src/app/services/auth.service';
import { PodcastsService } from 'src/app/features/podcasts/services/podcasts.service';

@Component({
  selector: 'app-podcast-card',
  templateUrl: './podcast-card.component.html',
  styleUrls: ['./podcast-card.component.scss']
})
export class PodcastCardComponent implements OnInit {

  @Input() public podcast: Podcast;
  public sessionStatus: boolean;

  constructor(
    private auth: AuthService,
    private podcastsService: PodcastsService
  ) { }

  ngOnInit() {
    this.sessionStatus = this.auth.isAuthenticated();
    // Escuchamos cambios del estado de la sesion
    this.observeSessionStatusChanges();
  }

  public showYouTube() {
    window.open(this.podcast.youtube_url, '_blank');
  }

  public doLike() {
    this.like();
    this.podcastsService.like(this.podcast).subscribe(
      () => {},
      () => {
        this.unlike();
      }
    );
  }

  public doUnlike() {
    this.unlike();
    this.podcastsService.unlike(this.podcast).subscribe(
      () => {},
      () => {
        this.like();
      }
    );
  }

  private like() {
    this.podcast.likes_amount++;
    this.podcast.likeme = true;
  }

  private unlike() {
    this.podcast.likes_amount--;
    this.podcast.likeme = false;
  }

  private observeSessionStatusChanges() {
    this.auth.observeSessionStatusChanges().subscribe(
      (value: boolean) => this.sessionStatus = value
    );
  }

}
