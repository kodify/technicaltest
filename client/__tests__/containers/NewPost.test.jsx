import { mount } from 'enzyme';
import React from 'react';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import NewPost from '../../src/containers/NewPost';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

function setUp(state) {
  const store = mockStore(state);
  const props = ({
    store,
  });

  const enzymeWrapper = mount(<NewPost {...props} />);
  return { enzymeWrapper, store };
}

describe('new post container', () => {
  it('tests if component is displayed with default state', () => {
    const { enzymeWrapper } = setUp({
      config: {
        location: '/',
        baseUrl: '/',
      },
      authors: [
        { id: 1, name: 'author1', posts: [], updatedAt: {}, createAt: {} },
        { id: 2, name: 'author2', posts: [], updatedAt: {}, createAt: {} },
        { id: 3, name: 'author3', posts: [], updatedAt: {}, createAt: {} },
        { id: 4, name: 'author4', posts: [], updatedAt: {}, createAt: {} },
      ],
    });

    const pageTitle = enzymeWrapper.find('.site-heading h1');
    expect(pageTitle.text()).toBe('New Post');
    const pageSubTitle = enzymeWrapper.find('.subheading');
    expect(pageSubTitle.text()).toBe('');
  });

  it('tests if save is triggered', () => {
    const action = {};
    const { enzymeWrapper, store } = setUp({
      config: {
        location: '/',
        baseUrl: '/',
      },
      authors: [
        { id: 1, name: 'author1', posts: [], updatedAt: {}, createAt: {} },
        { id: 2, name: 'author2', posts: [], updatedAt: {}, createAt: {} },
        { id: 3, name: 'author3', posts: [], updatedAt: {}, createAt: {} },
        { id: 4, name: 'author4', posts: [], updatedAt: {}, createAt: {} },
      ],
    }, [action]);

    const saveBtn = enzymeWrapper.find('.form-horizontal');
    expect(saveBtn.length).toBe(1);

    const hasError = enzymeWrapper.find('.has-error');
    expect(hasError.length).toBe(3);

    saveBtn.simulate('submit');
    expect(store.getActions()).toEqual([]);

    const formTitle = enzymeWrapper.find('#title');
    formTitle.simulate('change', { target: { value: 'test title' } });
    const hasError2 = enzymeWrapper.find('.has-error');
    expect(hasError2.length).toBe(2);

    saveBtn.simulate('submit');
    expect(store.getActions()).toEqual([]);

    const formContent = enzymeWrapper.find('#content');
    formContent.simulate('change', { target: { value: 'really useful test content that has to be long because if not it may fail' } });
    const hasError3 = enzymeWrapper.find('.has-error');
    expect(hasError3.length).toBe(1);

    saveBtn.simulate('submit');
    expect(store.getActions()).toEqual([]);

    const formAuthor = enzymeWrapper.find('#formControlsSelect');
    formAuthor.simulate('change', { target: { value: 1 } });
    const hasError4 = enzymeWrapper.find('.has-error');
    expect(hasError4.length).toBe(0);

    saveBtn.simulate('submit');
    expect(store.getActions()).toEqual([{ type: 'POST_SAVING' }]);
  });
});
