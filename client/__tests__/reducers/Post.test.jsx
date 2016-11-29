import Post from '../../src/reducers/Post';
import Constants from '../../src/constants/BlogConstants';

describe('post reducer', () => {
  it('should return the initial state', () => {
    expect(Post(undefined, {})).toEqual({});
  });

  it('should handle POST_RECEIVED', () => {
    const post = { title: 'title1', author: { name: 'testauthor' }, content: 'content' };
    expect(Post([], { type: Constants.POST_RECEIVED, post })).toEqual(post);
  });

  it('should handle POST_SAVED', () => {
    const post = { title: 'title1', author: { name: 'testauthor' }, content: 'content' };
    expect(Post([], { type: Constants.POST_SAVED, post })).toEqual(post);
  });
});
