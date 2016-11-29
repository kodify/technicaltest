import { mount } from 'enzyme';
import React from 'react';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import NewAuthor from '../../src/containers/NewAuthor';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

function setUp(state) {
  const store = mockStore(state);
  const props = ({
    store,
  });

  const enzymeWrapper = mount(<NewAuthor {...props} />);
  return { enzymeWrapper, store };
}

describe('new author container', () => {
  it('tests if component is displayed with default state', () => {
    const { enzymeWrapper } = setUp({
      config: {
        location: '/',
        baseUrl: '/',
      },
    });

    const pageTitle = enzymeWrapper.find('.site-heading h1');
    expect(pageTitle.text()).toBe('New Author');
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
    }, [action]);

    const hasError = enzymeWrapper.find('.has-error');
    expect(hasError.length).toBe(1);
    const formAuthor = enzymeWrapper.find('#formAuthor');
    formAuthor.simulate('change', { target: { value: 'test author' } });
    const hasError2 = enzymeWrapper.find('.has-error');
    expect(hasError2.length).toBe(0);
    const saveBtn = enzymeWrapper.find('.form-horizontal');
    expect(saveBtn.length).toBe(1);
    saveBtn.simulate('submit');
    expect(store.getActions()).toEqual([{ type: 'AUTHOR_SAVING' }]);
  });
});
