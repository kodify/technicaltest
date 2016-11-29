import Authors from '../../src/reducers/Authors';
import Constants from '../../src/constants/BlogConstants';

describe('authors reducer', () => {
  it('should return the initial state', () => {
    expect(Authors(undefined, {})).toEqual([]);
  });

  it('should handle AUTHORS_RECEIVED', () => {
    const authors = [{ name: 'author1' }, { name: 'author2' }];
    expect(Authors([], { type: Constants.AUTHORS_RECEIVED, authors })).toEqual(authors);
  });

  it('should handle AUTHOR_SAVED', () => {
    const author = { name: 'author1' };
    expect(Authors([], { type: Constants.AUTHOR_SAVED, author })).toEqual([author]);
  });
});
