import {Directive, Input, ElementRef, OnChanges, SimpleChanges, forwardRef} from '@angular/core';
import {NgbTimeStruct} from './ngb-time-struct';
import {NG_VALUE_ACCESSOR, ControlValueAccessor, NG_VALIDATORS, Validator, AbstractControl} from '@angular/forms';

import {padNumber} from '../util/util';
import {NgbTimeAdapter} from './ngb-time-adapter';
import {NgbTimepickerI18n} from './timepicker-i18n';
import {NgbTimepickerInputConfig} from './timepicker-input-config';

const NGB_TIMEPICKER_VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => NgbTimepickerDirective),
  multi: true
};

const NGB_TIMEPICKER_VALIDATOR = {
  provide: NG_VALIDATORS,
  useExisting: forwardRef(() => NgbTimepickerDirective),
  multi: true
};

@Directive({
  selector: 'input[ngbTimepicker]',
  host: {
    '[disabled]': 'disabled',
    '[attr.maxlength]': 'maxlength',
    '[attr.pattern]': 'pattern',
    '(focus)': 'onFocus()',
    '(blur)': 'onBlur()',
    '(keydown.ArrowUp)': 'handleUpDown($event)',
    '(keydown.ArrowDown)': 'handleUpDown($event)',
    '(input)': 'handleInput($event)'
  },
  providers: [NGB_TIMEPICKER_VALUE_ACCESSOR, NGB_TIMEPICKER_VALIDATOR]
})
export class NgbTimepickerDirective implements ControlValueAccessor,
    Validator, OnChanges {
  maxlength: number;
  pattern: string;
  patternExtract: RegExp;

  @Input() disabled = false;

  @Input() time: NgbTimeStruct;

  @Input() hourStep = 1;

  @Input() minuteStep = 1;

  @Input() secondStep = 1;

  @Input() meridian = false;

  get complete() { return this.patternExtract.test(this._el.value); }

  get dayPeriod() {
    return this.meridian && this.time.hour < 12 ? this._i18n.getMorningPeriod() : this._i18n.getAfternoonPeriod();
  }

  get seconds() { return this.time && 'second' in this.time && this.time.second !== undefined; }

  private _el: HTMLInputElement;
  private _hasFocus = false;

  private _onChange = (_: any) => {};
  private _onTouched = () => {};
  private _validatorChange = () => {};

  constructor(
      el: ElementRef, private _ngbTimeAdapter: NgbTimeAdapter<any>, private _i18n: NgbTimepickerI18n,
      readonly config: NgbTimepickerInputConfig) {
    this._el = el.nativeElement;
    this.disabled = config.disabled;
    this.meridian = config.meridian;
    this.hourStep = config.hourStep;
    this.minuteStep = config.minuteStep;
    this.secondStep = config.secondStep;
  }

  registerOnChange(fn: (value: any) => any): void { this._onChange = fn; }
  registerOnTouched(fn: () => any): void { this._onTouched = fn; }
  setDisabledState(isDisabled: boolean) { this.disabled = isDisabled; }

  registerOnValidatorChange?(fn: () => void): void { this._validatorChange = fn; }

  ngOnChanges(changes: SimpleChanges) {
    this.setMaxLength();
    this.setPattern();
    if ('time' in changes) {
      this._validatorChange();
    }
    this.format();
  }

  onFocus() { this._hasFocus = true; }
  onBlur() {
    this._hasFocus = false;
    this._onTouched();
  }

  handleUpDown(event) {
    if (!this.complete) {
      return;
    }
    event.preventDefault();
    const {code, target} = event;
    const {selectionStart} = target;
    const incFactor = code === 'ArrowUp' ? 1 : -1;

    if (selectionStart >= 0 && selectionStart <= 2) {
      /* 13:37:00
       * ^^ handling hour updates
       */
      const hour = this.time.hour + incFactor * this.hourStep;
      this.time.hour = (hour < 0 ? (24 + hour) : hour) % 24;

    } else if (selectionStart >= 3 && selectionStart <= 5) {
      /* 13:37:00
       *    ^^ handling minutes updates
       */
      const minute = this.time.minute + incFactor * this.minuteStep;
      this.time.minute = minute < 0 ? 60 + minute % 60 : minute % 60;

    } else if (selectionStart >= 6 && selectionStart <= 8) {
      /* 13:37:00
       *       ^^ handling second updates if seconds enabled
       * 01:37 PM
       *       ^^ else handling dayPeriod if enabled
       */
      if (this.seconds) {
        const second = this.time.second + incFactor * this.secondStep;
        this.time.second = second < 0 ? 60 + second % 60 : second % 60;
      } else if (this.meridian) {
        this.time.hour = (this.time.hour + 12) % 24;
      }

    } else if (selectionStart >= 9) {
      /* 01:37:00 AM
       *          ^^ handling dayPeriod if enabled
       */
      if (this.meridian) {
        this.time.hour = (this.time.hour + 12) % 24;
      }
    }

    this.format();
    this._onTouched();
    this._onChange(this._ngbTimeAdapter.toModel(this.time));
  }

  handleInput(event) {
    if (!this.complete) {
      this._onTouched();
      this._onChange(this._el.value || null);
      return;
    }
    this.parse();
    this.format();
    this._onTouched();
    this._onChange(this._ngbTimeAdapter.toModel(this.time));
  }

  writeValue(value) {
    if (value) {
      this.time = this._ngbTimeAdapter.fromModel(value);
      this.setMaxLength();
      this.setPattern();
      this.format();
    }
  }

  validate(c: AbstractControl): {[key: string]: any} {
    const {value} = c;

    if (value === null || value === undefined) {
      return null;
    }

    if (!this.complete) {
      return {'ngbTime': {invalid: value}};
    }
  }

  private parse() {
    let [, hour, minute, second, dayPeriod] = this.patternExtract.exec(this._el.value);

    if (!this.seconds) {
      dayPeriod = second;
      second = undefined;
    }
    if (this.meridian) {
      if (+hour === 0) {  // invalid when AM/PM
        return;
      } else if (+hour === 12) {
        this.time = {hour: dayPeriod === this._i18n.getMorningPeriod() ? 0 : 12, minute: +minute % 60};
      } else {
        this.time = {
          hour: dayPeriod === this._i18n.getMorningPeriod() ? +hour : (+hour + 12) % 24,
          minute: +minute % 60
        };
      }
    } else {
      this.time = {hour: +hour % 24, minute: +minute % 60};
    }

    this.time.second = (+second % 60) || undefined;
  }

  private format() {
    if (!this.time) {
      return;
    }
    const {selectionStart} = this._el;
    this._el.value = [
      padNumber(this.meridian ? this.time.hour % 12 || 12 : this.time.hour),
      padNumber(this.time.minute),
      this.seconds && padNumber(this.time.second),
    ].filter(Boolean).join(':');

    if (this.meridian) {
      this._el.value += ` ${this.dayPeriod}`;
    }
    if (this._hasFocus) {
      this._el.selectionStart = this._el.selectionEnd = selectionStart;
    }
  }

  private setMaxLength() { this.maxlength = (this.seconds ? 8 : 5) + (this.meridian ? 3 : 0); }

  private setPattern() {
    const hour = this.meridian ? '(?:01|02|03|04|05|06|07|08|09|10|11|12)' : '\\d{2}';
    const minute = '\\d{2}';
    const second = this.seconds ? `:(\\d{2})` : '';
    const meridian = ` (${this._i18n.getMorningPeriod()}|${this._i18n.getAfternoonPeriod()})`;

    this.pattern = `(${hour}):(${minute})${second}${this.meridian ? meridian : ''}`;
    this.patternExtract = new RegExp(this.pattern);
  }
}
