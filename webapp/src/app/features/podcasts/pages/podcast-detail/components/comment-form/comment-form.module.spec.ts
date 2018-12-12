import { CommentFormModule } from './comment-form.module';

describe('CommentFormModule', () => {
  let commentFormModule: CommentFormModule;

  beforeEach(() => {
    commentFormModule = new CommentFormModule();
  });

  it('should create an instance', () => {
    expect(commentFormModule).toBeTruthy();
  });
});
