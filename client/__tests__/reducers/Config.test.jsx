import Config from '../../src/reducers/Config';

describe('config reducer', () => {
  it('should return the initial state', () => {
    expect(Config(undefined, {})).toEqual({});
  });
});
