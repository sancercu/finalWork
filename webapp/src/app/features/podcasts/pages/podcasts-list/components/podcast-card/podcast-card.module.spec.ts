import { PodcastCardModule } from './podcast-card.module';

describe('PodcastCardModule', () => {
  let podcastCardModule: PodcastCardModule;

  beforeEach(() => {
    podcastCardModule = new PodcastCardModule();
  });

  it('should create an instance', () => {
    expect(podcastCardModule).toBeTruthy();
  });
});
