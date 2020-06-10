import {Component} from '@angular/core';
import {ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {By} from '@angular/platform-browser';

import {createGenericTestComponent, createKeyEvent} from '../test/common';
import {Key} from '../util/key';
import {NgbSelect, NgbSelectBase, NgbSelectModule} from './select.module';

const createTestComponent = (html: string) =>
    createGenericTestComponent(html, TestComponent) as ComponentFixture<TestComponent>;

const clickAndReturnSelect = (fixture) => {
  const compiled = fixture.nativeElement;
  const select = compiled.querySelector('ngb-select');
  select.click();
  fixture.detectChanges();
  return select;
};

const focusAndReturnSelect = (fixture) => {
  const compiled = fixture.nativeElement;
  const select = compiled.querySelector('ngb-select');
  select.focus();
  fixture.detectChanges();
  return select;
};

describe('ngb-select', () => {

  beforeEach(() => {
    TestBed.configureTestingModule(
        {declarations: [TestComponent], imports: [NgbSelectModule, FormsModule, ReactiveFormsModule]});
  });

  it('should be closed initially', () => {
    const html = `
      <ngb-select>
        <ngb-select-option value="1">One</ngb-select-option>
      </ngb-select>
    `;

    const fixture = createTestComponent(html);
    const compiled = fixture.nativeElement;

    const select = compiled.querySelector('ngb-select');
    const menu = select.querySelector('.dropdown-menu');

    expect(select).not.toHaveCssClass('show');
    expect(menu).toBeNull();
  });

  it('should toggle dropdown menu when clicked', () => {
    const html = `
      <ngb-select>
        <ngb-select-option value="1">One</ngb-select-option>
      </ngb-select>
    `;

    const fixture = createTestComponent(html);
    const compiled = fixture.nativeElement;

    const select = clickAndReturnSelect(fixture);

    const menu = select.querySelector('.dropdown-menu');
    expect(select).toHaveCssClass('show');

    expect(menu).toBeTruthy();
    expect(menu).toHaveCssClass('show');

    clickAndReturnSelect(fixture);
    expect(select).not.toHaveCssClass('show');
  });

  it('should close dropdown menu when clicked from outside', () => {
    const html = `
      <button>Oustide</button>
      <ngb-select>
        <ngb-select-option value="1">One</ngb-select-option>
      </ngb-select>
    `;

    const fixture = createTestComponent(html);
    const compiled = fixture.nativeElement;

    const select = clickAndReturnSelect(fixture);

    const button = compiled.querySelector('button');
    let menu = select.querySelector('.dropdown-menu');
    expect(menu).toBeTruthy();

    button.click();
    fixture.detectChanges();

    menu = select.querySelector('.dropdown-menu');
    expect(menu).toBeNull();
  });

  it('should allow custom template for options in the list', () => {
    const html = `
      <ngb-select>
        <ng-template ngbOption let-option>## {{option.label}} ##</ng-template>
        <ngb-select-option value="1"></ngb-select-option>
        <ngb-select-option value="2"></ngb-select-option>
      </ngb-select>
    `;

    const fixture = createTestComponent(html);
    const select = clickAndReturnSelect(fixture);

    const options = select.querySelectorAll('.dropdown-item');
    expect(options.length).toEqual(2);

    expect(Array.from(options).map(o => (o as HTMLElement).textContent)).toEqual(['## 1 ##', '## 2 ##']);

    options[1].click();
    fixture.detectChanges();

    expect(select.querySelector('.value').textContent.trim()).toEqual('2');
  });

  it('should allow custom template for selected option', () => {
    const html = `
      <ngb-select>
        <ng-template ngbSelectedOption let-option>## {{option.label}} ##</ng-template>
        <ngb-select-option value="1"></ngb-select-option>
        <ngb-select-option value="2"></ngb-select-option>
      </ngb-select>
    `;

    const fixture = createTestComponent(html);
    const select = clickAndReturnSelect(fixture);

    const options = select.querySelectorAll('.dropdown-item');
    expect(options.length).toEqual(2);

    expect(Array.from(options).map(o => (o as HTMLElement).textContent.trim())).toEqual(['1', '2']);

    options[1].click();
    fixture.detectChanges();

    expect(select.querySelector('.value').textContent.trim()).toEqual('## 2 ##');
  });

  it('should close the dropdown menu on selection', () => {
    const html = `
      <ngb-select>
        <ngb-select-option value="1">One</ngb-select-option>
        <ngb-select-option value="2">Two</ngb-select-option>
      </ngb-select>
    `;

    const fixture = createTestComponent(html);
    const select = clickAndReturnSelect(fixture);

    const menu = select.querySelectorAll('.dropdown-item');
    expect(menu).toBeTruthy();

    menu.item(0).click();
    fixture.detectChanges();

    expect(select).not.toHaveCssClass('show');
  });

  it('can\'t be opened when `disabled`', () => {
    const html = `
      <ngb-select [disabled]="true">
        <ngb-select-option value="1">One</ngb-select-option>
        <ngb-select-option value="2">Two</ngb-select-option>
      </ngb-select>
    `;

    const fixture = createTestComponent(html);
    const select = clickAndReturnSelect(fixture);

    expect(select).not.toHaveCssClass('show');
  });

  it('should prevent clicking on a `disabled` option', () => {
    const html = `
      <ngb-select>
        <ngb-select-option value="One"></ngb-select-option>
        <ngb-select-option [disabled]="true" value="Two"></ngb-select-option>
      </ngb-select>
    `;

    const fixture = createTestComponent(html);
    const select = clickAndReturnSelect(fixture);

    select.querySelector('.dropdown-item.disabled').click();

    // dropdown should still be opened
    expect(select).toHaveCssClass('show');
  });

  describe('keyboard support', () => {
    it('should open on UP_ARROW, DOWN_ARROW and SPACE when focused', () => {
      const html = `
        <ngb-select>
          <ngb-select-option value="1">One</ngb-select-option>
          <ngb-select-option value="2">Two</ngb-select-option>
        </ngb-select>
      `;
      const fixture = createTestComponent(html);
      const selectDebug = fixture.debugElement.query(By.directive(NgbSelectBase));

      let event = createKeyEvent(Key.ArrowUp, {type: 'keydown'});
      spyOn(event, 'preventDefault');
      spyOn(event, 'stopPropagation');
      selectDebug.triggerEventHandler('keydown', event);
      fixture.detectChanges();

      expect(selectDebug.nativeElement).toHaveCssClass('show');
      expect(event.preventDefault).toHaveBeenCalled();
      expect(event.stopPropagation).toHaveBeenCalled();

      // Closing
      document.body.click();
      fixture.detectChanges();

      event = createKeyEvent(Key.ArrowDown, {type: 'keydown'});
      spyOn(event, 'preventDefault');
      spyOn(event, 'stopPropagation');
      selectDebug.triggerEventHandler('keydown', event);
      fixture.detectChanges();

      expect(selectDebug.nativeElement).toHaveCssClass('show');
      expect(event.preventDefault).toHaveBeenCalled();
      expect(event.stopPropagation).toHaveBeenCalled();

      // Closing
      document.body.click();
      fixture.detectChanges();

      event = createKeyEvent(Key.Space, {type: 'keydown'});
      spyOn(event, 'preventDefault');
      spyOn(event, 'stopPropagation');
      selectDebug.triggerEventHandler('keydown', event);
      fixture.detectChanges();

      expect(selectDebug.nativeElement).toHaveCssClass('show');
      expect(event.preventDefault).toHaveBeenCalled();
      expect(event.stopPropagation).toHaveBeenCalled();
    });

    it('should close on ESC when opened', () => {
      const html = `
        <ngb-select>
          <ngb-select-option value="1">One</ngb-select-option>
          <ngb-select-option value="2">Two</ngb-select-option>
        </ngb-select>
      `;
      const fixture = createTestComponent(html);
      const select = clickAndReturnSelect(fixture);

      expect(select).toHaveCssClass('show');
      const escape = createKeyEvent(Key.Escape, {type: 'keydown'});
      document.dispatchEvent(escape);
      fixture.detectChanges();

      expect(select).not.toHaveCssClass('show');
    });

    it('should skip `disabled` items', () => {
      const html = `
      <form>
        <ngb-select>
          <ngb-select-option value="One"></ngb-select-option>
          <ngb-select-option value="Two"></ngb-select-option>
          <ngb-select-option value="Three" [disabled]="true"></ngb-select-option>
          <ngb-select-option value="Four"></ngb-select-option>
        </ngb-select>
      </form>
      `;
      const fixture = createTestComponent(html);
      const selectDebug = fixture.debugElement.query(By.directive(NgbSelectBase));

      selectDebug.triggerEventHandler('keydown', createKeyEvent(Key.ArrowDown, {type: 'keydown'}));
      fixture.detectChanges();

      ['Two', 'Four'].forEach(itemSelected => {
        const down = createKeyEvent(Key.ArrowDown, {type: 'keydown'});
        document.dispatchEvent(down);
        fixture.detectChanges();
        const selected = selectDebug.query(By.css('.dropdown-item.active'));
        expect(selected.nativeElement.textContent.trim()).toEqual(itemSelected);
      });
    });
  });

  describe('forms', () => {
    it('should work with template-driven form validation', fakeAsync(() => {
         const html = `
        <form>
          <ngb-select name="control" [(ngModel)]="model" required>
            <ngb-select-option value="1" label="One"></ngb-select-option>
            <ngb-select-option value="2" label="Two"></ngb-select-option>
          </ngb-select>
        </form>
      `;
         const fixture = createTestComponent(html);
         tick();
         fixture.detectChanges();

         const element = fixture.debugElement.query(By.directive(NgbSelect));

         expect(element.nativeElement.querySelector('.value').textContent.trim()).toEqual('');
         expect(element.nativeElement).toHaveCssClass('ng-invalid');
         expect(element.nativeElement).toHaveCssClass('ng-untouched');

         fixture.componentInstance.model = '2';
         fixture.detectChanges();
         tick();
         fixture.detectChanges();

         expect(element.nativeElement.querySelector('.value').textContent.trim()).toEqual('Two');
         expect(element.nativeElement).toHaveCssClass('ng-valid');
         expect(element.nativeElement).toHaveCssClass('ng-untouched');
       }));


    it('should work with reactive form controls', () => {
      const html = `
        <form [formGroup]="form">
          <ngb-select formControlName="select">
            <ngb-select-option value="1" label="One"></ngb-select-option>
            <ngb-select-option value="2" label="Two"></ngb-select-option>
          </ngb-select>
        </form>
      `;

      const fixture = createTestComponent(html);
      const element = fixture.debugElement.query(By.directive(NgbSelect));

      expect(element.nativeElement.querySelector('.value').textContent.trim()).toEqual('');
      expect(element.nativeElement).toHaveCssClass('ng-invalid');
      expect(element.nativeElement).toHaveCssClass('ng-untouched');

      fixture.componentInstance.form.patchValue({select: '1'});
      fixture.detectChanges();

      expect(element.nativeElement.querySelector('.value').textContent.trim()).toEqual('One');
      expect(element.nativeElement).toHaveCssClass('ng-valid');
      expect(element.nativeElement).toHaveCssClass('ng-untouched');
    });

    it('should mark control as touched on blur', () => {
      const html = `
        <form [formGroup]="form">
          <ngb-select formControlName="select">
            <ngb-select-option value="1"></ngb-select-option>
            <ngb-select-option value="2"></ngb-select-option>
          </ngb-select>
        </form>
       `;

      const fixture = createTestComponent(html);
      const selectDebug = fixture.debugElement.query(By.directive(NgbSelect));

      expect(selectDebug.nativeElement).toHaveCssClass('ng-untouched');

      selectDebug.triggerEventHandler('blur', {});
      fixture.detectChanges();

      expect(selectDebug.nativeElement).toHaveCssClass('ng-touched');
    });

    it('should be disabled when the control is disabled', () => {
      const html = `
        <form [formGroup]="form">
          <ngb-select formControlName="select">
            <ngb-select-option value="1"></ngb-select-option>
            <ngb-select-option value="2"></ngb-select-option>
          </ngb-select>
        </form>
       `;

      const fixture = createTestComponent(html);
      const selectForm = fixture.componentInstance.form.get('select');
      const selectDebug = fixture.debugElement.query(By.directive(NgbSelect));
      selectDebug.nativeElement.click();

      expect(selectForm.disabled).toBeFalsy();

      selectForm.disable();
      fixture.detectChanges();

      expect(selectForm.disabled).toBeTruthy();
      expect(selectDebug.nativeElement).not.toHaveCssClass('show');
      expect(selectDebug.nativeElement).toHaveCssClass('disabled');

    });
  });

});

@Component({template: ''})
class TestComponent {
  model;
  form = new FormGroup({select: new FormControl(null, Validators.required)});
}
