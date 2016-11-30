import Posts from '../../src/reducers/Posts';
import Constants from '../../src/constants/BlogConstants';

describe('posts reducer', () => {
  it('should return the initial state', () => {
    expect(Posts(undefined, {})).toEqual([]);
  });

  it('should handle POSTS_RECEIVED', () => {
    const posts = [
      { title: 'title1', author: { name: 'testauthor' }, content: 'content' },
      { title: 'title2', author: { name: 'testauthor2' }, content: 'content2' },
    ];
    expect(Posts([], { type: Constants.POSTS_RECEIVED, posts })).toEqual(posts);
  });
});
