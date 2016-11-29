import fetchMock from 'fetch-mock';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import Actions from '../../src/actions/BlogActions';
import Constants from '../../src/constants/BlogConstants';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('async actions', () => {
  afterEach(() => {
    fetchMock.restore();
  });

  it('create POSTS_RECEIVED when fetching posts has been done', () => {
    const posts = [
      { title: 'title1' },
      { title: 'title2' },
    ];

    fetchMock.get('/api/posts', posts);

    const expectedActions = [
      { type: Constants.POSTS_FETCHING },
      { type: Constants.POSTS_RECEIVED, posts },
    ];

    const store = mockStore({ posts: [], authors: [], config: { baseUrl: '', location: '' }, post: {} });

    return store.dispatch(Actions.fetchPosts())
      .then(() => {
        const actions = store.getActions();
        expect(actions).toEqual(expectedActions);
      });
  });

  it('create POST_RECEIVED when fetching post has been done', () => {
    const post = { title: 'title1', author: { name: 'testauthor' }, content: 'content' };

    fetchMock.get('/api/post/1', post);

    const expectedActions = [
      { type: Constants.POST_FETCHING },
      { type: Constants.POST_RECEIVED, post },
    ];

    const store = mockStore({ posts: [], authors: [], config: { baseUrl: '', location: '' }, post: {} });

    return store.dispatch(Actions.fetchPost(1))
      .then(() => {
        const actions = store.getActions();
        expect(actions).toEqual(expectedActions);
      });
  });

  it('create AUTHORS_RECEIVED when fetching authors has been done', () => {
    const authors = [
      { name: 'author1' },
      { name: 'author2' },
    ];

    fetchMock.get('/api/authors', authors);

    const expectedActions = [
      { type: Constants.AUTHORS_FETCHING },
      { type: Constants.AUTHORS_RECEIVED, authors },
    ];

    const store = mockStore({ posts: [], authors: [], config: { baseUrl: '', location: '' }, post: {} });

    return store.dispatch(Actions.fetchAuthors())
      .then(() => {
        const actions = store.getActions();
        expect(actions).toEqual(expectedActions);
      });
  });

  it('create AUTHOR_SAVED when saving author has been done', () => {
    const author = { name: 'author1' };

    fetchMock.post('/api/author/new', author);

    const expectedActions = [
      { type: Constants.AUTHOR_SAVING },
      { type: Constants.AUTHOR_SAVED, author },
    ];

    const store = mockStore({ posts: [], authors: [], config: { baseUrl: '', location: '' }, post: {} });

    return store.dispatch(Actions.createAuthor())
      .then(() => {
        const actions = store.getActions();
        expect(actions).toEqual(expectedActions);
      });
  });

  it('create AUTHOR_SAVED when saving author has been done', () => {
    const post = { title: 'title1', author: { name: 'testauthor' }, content: 'content' };

    fetchMock.post('/api/post/new', post);

    const expectedActions = [
      { type: Constants.POST_SAVING },
      { type: Constants.POST_SAVED, post },
      { type: '@@router/CALL_HISTORY_METHOD', payload: { args: ['/posts/undefined'], method: 'push' } },
    ];

    const store = mockStore({ posts: [], authors: [], config: { baseUrl: '', location: '' }, post: {} });

    return store.dispatch(Actions.createPost())
      .then(() => {
        const actions = store.getActions();
        expect(actions).toEqual(expectedActions);
      });
  });
});
