import { PodcastDetailModule } from './podcast-detail.module';

describe('PodcastDetailModule', () => {
  let podcastDetailModule: PodcastDetailModule;

  beforeEach(() => {
    podcastDetailModule = new PodcastDetailModule();
  });

  it('should create an instance', () => {
    expect(podcastDetailModule).toBeTruthy();
  });
});
