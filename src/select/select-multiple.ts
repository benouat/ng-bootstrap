import {Directive, ElementRef, EventEmitter, forwardRef, Input, Output, Renderer2, StaticProvider} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';

import {NgbSelectBase} from './base-select';
import {NgbSelectOption} from './select-option';


const NGB_MULTI_SELECT_VALUE_ACCESSOR: StaticProvider = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => NgbSelectMultiple),
  multi: true
};

/**
 * A lightweight directive implementing ControlValueAccessor for the select with multiple
 */
@Directive({
  selector: 'ngb-select[multiple]',
  providers: [NGB_MULTI_SELECT_VALUE_ACCESSOR],
  host: {'[class.multiple]': 'true', '(blur)': 'onTouched()', '(select)': 'onSelected($event)'}
})
export class NgbSelectMultiple<T>
    implements ControlValueAccessor {
  private _deferredValues: T[] | null;

  // TODO: to be handled on top of control-value-accessor
  /**
   *
   */
  @Input() value: T[] = [];

  /**
  * An event emitted whenever value changes
  */
  @Output() valueChange = new EventEmitter<T[]>();

  onChange = (value: T[]) => {};
  onTouched = () => {};

  constructor(private _select: NgbSelectBase<T>, elRef: ElementRef, renderer: Renderer2) {
    this._select.multiple = true;

    // Hack related to CSS style .custom-select[multiple] that removes the caret icon on select
    // Have no way to revert it back with just CSS, except hardcoding/duplicating bootstrap background-image...
    renderer.removeAttribute(elRef.nativeElement, 'multiple');
  }

  ngAfterContentInit() {
    if (this._deferredValues !== null) {
      this._selectValues(this._deferredValues);
      this._deferredValues = null;
    }
  }

  onSelected(options: NgbSelectOption<T>[]) { this.onChange(options.map(o => o.value)); }

  writeValue(values: T[]) {
    if (this._select.hasOptions) {
      this._selectValues(values);
    } else {
      this._deferredValues = values;
    }
  }

  registerOnChange(fn: (value: any) => any) { this.onChange = fn; }
  registerOnTouched(fn: () => any) { this.onTouched = fn; }
  setDisabledState(isDisabled: boolean) { this._select.disabled = isDisabled; }

  private _selectValues(values: T[]) {
    if (values !== null) {
      this._select.clearSelected();
      values.forEach(value => {
        const option = this._select.findOption(value);
        if (option) {
          this._select.selectOption(option);
        }
      });
    }
  }
}
