import {NgbTimepickerInputConfig} from './timepicker-input-config';

describe('input[ngbTimepicker] config', () => {
  it('should have sensible default values', () => {
    const config = new NgbTimepickerInputConfig();
    expect(config.disabled).toBe(false);
    expect(config.meridian).toBe(false);
    expect(config.hourStep).toBe(1);
    expect(config.minuteStep).toBe(1);
    expect(config.secondStep).toBe(1);
  });
});
