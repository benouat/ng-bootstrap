import {Directive, EventEmitter, forwardRef, Input, Output, StaticProvider} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';

import {NgbSelectBase} from './base-select';
import {NgbSelectOption} from './select-option';


const NGB_SELECT_VALUE_ACCESSOR: StaticProvider = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => NgbSelect),
  multi: true
};

/**
 * A lightweight directive implementing ControlValueAccessor for the select
 */
@Directive({
  selector: 'ngb-select:not([multiple])',
  providers: [NGB_SELECT_VALUE_ACCESSOR],
  host: {'(blur)': 'onTouched()', '(select)': 'onChange($event.value)'}
})
export class NgbSelect<T>
    implements ControlValueAccessor {
  // private _selected: NgbSelectOption<T>;
  private _deferredValue: T | null;

  // TODO: to be handled on top of control-value-accessor
  /**
   *
   */
  @Input() value: T;

  /**
   * An event emitted whenever value changes
   */
  @Output() valueChange = new EventEmitter<T>();

  onChange = (value: T) => {};
  onTouched = () => {};

  constructor(private _select: NgbSelectBase<T>) {}

  ngAfterContentInit() {
    if (this._deferredValue !== null) {
      this._selectFromValue(this._deferredValue);
      this._deferredValue = null;
    }
  }

  writeValue(value: T) {
    if (this._select.hasOptions) {
      this._selectFromValue(value);
    } else {
      this._deferredValue = value;
    }
  }

  registerOnChange(fn: (value: any) => any) { this.onChange = fn; }
  registerOnTouched(fn: () => any) { this.onTouched = fn; }
  setDisabledState(isDisabled: boolean) { this._select.disabled = isDisabled; }

  private _selectFromValue(value: T) {
    const option = this._select.findOption(value);
    if (option) {
      this._select.selectOption(option);
    }
  }
}
