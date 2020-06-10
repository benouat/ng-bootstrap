import {Directive, Input} from '@angular/core';

import {isObject} from '../util/util';

/**
 * Directive providing a set of @Input to decorate select options
 */
@Directive({selector: 'ngb-select-option'})
export class NgbSelectOption<U extends any> {
  /**
   * Allows disabling a given option. Once disabled, option can not be selected.
   */
  @Input() disabled = false;

  /**
   * Value of the option. Could be a primitive type, or any object reference.
   * In case of object reference, `labelGetter` could be used to specify a property to be used as `label`
   */
  @Input() value: U;

  private _label: string;
  /**
   * Label of the option
   */
  @Input()
  get label(): string {
    if (isObject(this.value)) {
      return this.labelGetter ? this.value[this.labelGetter] : this.value.toString();
    } else {
      return this._label || (this.value as Object).toString();
    }
  }
  set label(value: string) { this._label = value; }

  /**
   * Specifies a property key to be used to extract a label for the given option.
   */
  @Input() labelGetter: string;
}
