import {NgbSelectConfig} from './select-config';

describe('ngb-select-config', () => {
  it('should have sensible default values', () => {
    const config = new NgbSelectConfig();

    expect(config.optionTemplate).toBeNull();
  });
});
