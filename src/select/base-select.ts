import {DOCUMENT} from '@angular/common';
import {
  AfterContentInit,
  Component,
  ContentChild,
  ContentChildren,
  Directive,
  ElementRef,
  EventEmitter,
  Inject,
  Input,
  Output,
  QueryList,
  TemplateRef,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import {fromEvent, race, Subject} from 'rxjs';
import {filter, takeUntil, tap} from 'rxjs/operators';

import {Key} from '../util/key';
import {NgbSelectConfig} from './select-config';
import {NgbSelectOption} from './select-option';


type NgbSelectValueType<T> = NgbSelectOption<T>| (NgbSelectOption<T>)[];

@Directive({selector: 'ng-template[ngbOption]'})
export class NgbOptionTemplate {
}

@Directive({selector: 'ng-template[ngbSelectedOption]'})
export class NgbSelectedOptionTemplate {
}

/**
 * Base class for NgbSelect.
 */
@Component({
  selector: 'ngb-select',
  exportAs: 'ngbSelect',
  template: `
    <ng-template #optionTpl let-option let-selected="selected" let-scope="scope">
      <span class="selected-mark" *ngIf="selected && scope === 'list'">&#10003;</span>
      {{option.label}}
    </ng-template>

    <div
      class="placeholder my-1 text-muted"
      *ngIf="selectedOptions.length === 0"
    >
      {{placeholder}}
      <ng-container *ngIf="!placeholder && !multiple" i18n="@@ngb.select.placeholder">Select an item</ng-container>
      <ng-container *ngIf="!placeholder && multiple" i18n="@@ngb.select.placeholder-multiple">Select items</ng-container>
    </div>
    <div class="value my-1">
      <div
        *ngFor="let option of selectedOptions"
        [class.bg-light]="multiple"
        [class.border]="multiple"
        [class.mr-2]="multiple"
        [class.pl-1]="multiple"
        [class.rounded]="multiple"
        (click)="selectActive($event, option)"
      >
        <ng-template
          [ngTemplateOutlet]="selectedOptionTemplate"
          [ngTemplateOutletContext]="optionContext(option, 'input')"
        ></ng-template>
        <button
          *ngIf="multiple"
          type="button"
          tabindex="-1"
          class="close px-1"
          aria-label="Unselect"
          (click)="selectOption(option); $event.stopPropagation()"
        >
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
    </div>
    <div class="dropdown-menu"
      *ngIf="opened"
      [class.show]="opened"
      (click)="multiple && $event.stopPropagation()">
      <div
        class="dropdown-item"
        [class.active]="activeOption === option"
        [class.disabled]="option.disabled"
        *ngFor="let option of filteredOptions"
        (click)="!option.disabled ? selectOption(option) : $event.stopPropagation()"
      >
        <ng-template
          [ngTemplateOutlet]="optionTemplate"
          [ngTemplateOutletContext]="optionContext(option, 'list')"
        ></ng-template>
      </div>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
  styles: [`
      ngb-select.custom-select {
        height: calc(2.25rem + 4px);
        padding-top: 0.175rem;
        padding-bottom: 0.175rem;
        cursor: pointer;
      }

      ngb-select.custom-select.multiple {
        min-height: calc(2.25rem + 4px);
        height: auto;
        padding-top: 0.14rem;
        padding-bottom: 0.14rem;
      }

      ngb-select.disabled {
        color: #6c757d;
        background-color: #e9ecef;
        pointer-events: none;
      }

      .value, .placeholder {
        display: flex;
        flex-wrap: wrap;
        -webkit-user-select: none;
        user-select: none;
      }

      button.close {
        font-size: 1.4rem;
      }

      ngb-select .dropdown-menu {
        width: 100%;
        -webkit-user-select: none;
        user-select: none;
        max-height: 40vh;
        overflow-y: auto;
      }

      .selected-mark {
        margin-left: -1.04em;
      }
    `],
  host: {
    '[attr.id]': 'id',
    '[attr.tabIndex]': 'disabled ? -1 : 0',
    '[class.dropdown]': 'true',
    '[class.custom-select]': 'true',
    '[class.show]': 'opened',
    '[class.disabled]': 'disabled',
    '(keydown)': 'onKeydown($event)',
    '(click)': 'toggle()'
  }
})
export class NgbSelectBase<T>
    implements AfterContentInit {
  private _closed$ = new Subject<void>();

  @ContentChildren(NgbSelectOption, {descendants: true}) private _options: QueryList<NgbSelectOption<T>>;

  @ContentChild(NgbOptionTemplate, {static: true, read: TemplateRef}) private _contentOptionTemplate: TemplateRef<any>;

  @ContentChild(NgbSelectedOptionTemplate, {static: true, read: TemplateRef})
  private _contentSelectedOptionTemplate: TemplateRef<any>;

  @ViewChild('optionTpl', {static: true, read: TemplateRef}) private _optionTemplate: TemplateRef<any>;

  /**
   * Unique select identifier. Must be unique for the entire document for proper accessibility support
   */
  @Input() id: string;

  private _disabled = false;

  /**
   * Allows disabling a the select
   */
  @Input()
  set disabled(value) {
    if (value === true && this.opened) {
      this.close();
    }
    this._disabled = value;
  }

  get disabled() { return this._disabled; }


  /** @internal */
  @Input() hideSelected = false;

  /**
   * Default help message to be displayed prior to any selection
   */
  @Input() placeholder: string;

  /** An event emitted when an option is selected. Mostly used in case of multiple selection allowed. */
  @Output() add = new EventEmitter<NgbSelectOption<T>>();

  /** An event emitted when an option is removed. Mostly used in case of multiple selection allowed. */
  @Output() remove = new EventEmitter<NgbSelectOption<T>>();

  /** An event emitted on selected value change */
  @Output() select = new EventEmitter<NgbSelectValueType<T>>();

  multiple = false;
  opened = false;

  activeOption: NgbSelectOption<T>;
  filteredOptions: NgbSelectOption<T>[] = [];
  selectedOptions: NgbSelectOption<T>[] = [];


  get hasOptions() { return !!this._options; }

  get optionTemplate(): TemplateRef<any> { return this._contentOptionTemplate || this._optionTemplate; }

  get selectedOptionTemplate(): TemplateRef<any> { return this._contentSelectedOptionTemplate || this._optionTemplate; }

  constructor(config: NgbSelectConfig, @Inject(DOCUMENT) private _document: any, private _elementRef: ElementRef) {
    if (config.optionTemplate) {
      this._optionTemplate = config.optionTemplate;
    }
  }

  ngAfterContentInit() {
    this._filterOptions();
    this.activeOption = this.filteredOptions[0];
  }

  open() {
    if (!this.opened && !this.disabled) {
      this.opened = true;

      const keyboard$ = fromEvent<KeyboardEvent>(this._document, 'keydown').pipe(takeUntil(this._closed$));

      const clickOutside$ =
          fromEvent<MouseEvent>(this._document, 'click')
              .pipe(takeUntil(this._closed$), filter(({target}) => !this._elementRef.nativeElement.contains(target)));

      race<Event>(keyboard$.pipe(filter(e => e.which === Key.Escape)), clickOutside$)
          .pipe(takeUntil(this._closed$))
          .subscribe(() => this.close());

      keyboard$.pipe(filter(e => !![Key.ArrowUp, Key.ArrowDown, Key.Enter, Key.Space].find(k => e.which === k)))
          .subscribe(event => {
            event.preventDefault();
            switch (event.which) {
              case Key.ArrowDown:
              case Key.ArrowUp:
                const list = this.filteredOptions.filter(o => !o.disabled);
                const index = list.findIndex(o => o === this.activeOption);
                const newIndex = event.keyCode === Key.ArrowUp ? index - 1 : index + 1;
                this.activeOption = list[newIndex] || this.activeOption;

                break;

              case Key.Enter:
              case Key.Space:
                this.selectOption(this.activeOption);
                if (!this.multiple) {
                  this.close();
                }
                break;

              default:
                break;
            }
          });
    }
  }

  close() {
    if (this.opened) {
      this.opened = false;
      this._closed$.next();
    }
  }

  toggle() {
    if (this.disabled) {
      return;
    }
    if (this.opened) {
      this.close();
    } else {
      this.open();
    }
  }

  onKeydown(event) {
    switch (event.which) {
      case Key.ArrowDown:
      case Key.Space:
      case Key.ArrowUp:
        if (!this.opened) {
          this.open();
          event.preventDefault();
          event.stopPropagation();
        }
        break;

      case Key.Backspace:
        if (this.multiple && !this.opened) {
          const option = this.selectedOptions[this.selectedOptions.length - 1];
          if (option) {
            this.selectOption(option);
          }
        }
    }
  }

  selectOption(option: NgbSelectOption<T>) {
    if (!this.multiple) {
      const previouslySelected = this.selectedOptions[0];
      if (previouslySelected) {
        this.remove.next(previouslySelected);
      }
      this.selectedOptions = [option];
      this.activeOption = option;
      this.add.next(option);
      this.select.next(option);
    } else {
      if (this.selectedOptions.includes(option)) {
        this.selectedOptions = this.selectedOptions.filter(o => {
          if (o !== option) {
            this.remove.next(o);
            return true;
          }
          return false;
        });
      } else {
        this.selectedOptions.push(option);
        this.activeOption = option;
        this.add.next(option);
      }
      this._filterOptions();
      this.select.next(this.selectedOptions);
    }
  }

  findOption(value: T): NgbSelectOption<T>| undefined { return this._options.find(option => value === option.value); }

  clearSelected() {
    this.selectedOptions = [];
    this._filterOptions();
  }

  selectActive(event, option: NgbSelectOption<T>) {
    if (this.multiple) {
      this.activeOption = option;
      if (!this.opened) {
        this.open();
      }
      event.stopPropagation();
    }
  }

  /** @internal */
  optionContext(option, scope) {
    return {$implicit: option, selected: this.multiple && this.selectedOptions.includes(option), scope};
  }

  private _filterOptions() {
    this.filteredOptions = (this.multiple && this.hideSelected) ?
        this._options.filter(option => !this.selectedOptions.includes(option)) :
        this._options.toArray();
  }
}
