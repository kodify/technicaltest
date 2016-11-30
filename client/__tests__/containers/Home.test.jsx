import { mount } from 'enzyme';
import React from 'react';
import configureStore from 'redux-mock-store';
import Home from '../../src/containers/Home';

function setUp(state) {
  const mockStore = configureStore();
  const store = mockStore(state);
  const props = ({
    store,
  });

  const enzymeWrapper = mount(<Home {...props} />);
  return { enzymeWrapper, store };
}

describe('home container', () => {
  it('tests if component is displayed with default state', () => {
    const { enzymeWrapper } = setUp({
      config: {
        location: '/',
        baseUrl: '/',
      },
      posts: [
        { id: 1, title: 'title1', content: 'content 1', author: { id: 1, name: 'author 1' } },
        { id: 2, title: 'title2', content: 'content 2', author: { id: 1, name: 'author 1' } },
        { id: 3, title: 'title3', content: 'content 3', author: { id: 1, name: 'author 2' } },
        { id: 4, title: 'title4', content: 'content 4', author: { id: 1, name: 'author 2' } },
      ],
    });

    const postTitle = enzymeWrapper.find('.post-title');
    expect(postTitle.length).toBe(4);
    const postSubTitle = enzymeWrapper.find('.post-subtitle');
    expect(postSubTitle.length).toBe(4);
    const postMeta = enzymeWrapper.find('.post-meta');
    expect(postMeta.length).toBe(4);
    const pageTitle = enzymeWrapper.find('.site-heading h1');
    expect(pageTitle.text()).toBe('Kodify Blog');
    const pageSubTitle = enzymeWrapper.find('.subheading');
    expect(pageSubTitle.text()).toBe('The world famous kodify\'s technical test');
  });
});
