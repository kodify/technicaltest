import { mount } from 'enzyme';
import React from 'react';
import configureStore from 'redux-mock-store';
import Post from '../../src/containers/Post';

function setUp(state) {
  const mockStore = configureStore();
  const store = mockStore(state);
  const props = ({
    store,
  });

  const enzymeWrapper = mount(<Post {...props} />);
  return { enzymeWrapper, store };
}

describe('home container', () => {
  it('tests if component is displayed with default state', () => {
    const { enzymeWrapper } = setUp({
      config: {
        location: '/',
        baseUrl: '/',
      },
      params: { id: 1 },
      post: { id: 1, title: 'title1', content: 'content 1', author: { id: 1, name: 'author 1' }, createdAt: {}, updatedAt: {} },
    });

    const pageTitle = enzymeWrapper.find('.site-heading h1');
    expect(pageTitle.text()).toBe('title1');
    const pageSubTitle = enzymeWrapper.find('.subheading');
    expect(pageSubTitle.text()).toBe('Posted by author 1');
    const pageContent = enzymeWrapper.find('#content');
    expect(pageContent.text()).toBe('content 1');
  });
});
