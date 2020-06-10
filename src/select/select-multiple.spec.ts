import {Component} from '@angular/core';
import {ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {By} from '@angular/platform-browser';

import {createGenericTestComponent, createKeyEvent} from '../test/common';
import {Key} from '../util/key';
import {NgbSelectModule, NgbSelectMultiple} from './select.module';


const createTestComponent = (html: string) =>
    createGenericTestComponent(html, TestComponent) as ComponentFixture<TestComponent>;

const toggleAndReturnSelect = (fixture) => {
  const compiled = fixture.nativeElement;
  const select = compiled.querySelector('ngb-select');
  select.click();
  fixture.detectChanges();
  return select;
};

function getValueAsText(element) {
  return Array.from(element.querySelectorAll('.value > div')).map((value: HTMLElement) => value.textContent.trim());
}

describe('ngb-select[multiple]', () => {

  beforeEach(() => {
    TestBed.configureTestingModule(
        {declarations: [TestComponent], imports: [NgbSelectModule, ReactiveFormsModule, FormsModule]});
  });

  it('should contains `mutliple` css classname when set as mutliple', () => {
    const html = `
      <ngb-select multiple>
        <ngb-select-option value="One"></ngb-select-option>
      </ngb-select>
    `;

    const fixture = createTestComponent(html);
    const compiled = fixture.nativeElement;

    const select = compiled.querySelector('ngb-select');
    expect(select).toHaveCssClass('multiple');
  });

  it('should not close the dropdown menu when clicks occur on the options list with multiple', () => {
    const html = `
      <ngb-select multiple>
        <ngb-select-option value="One"></ngb-select-option>
        <ngb-select-option value="Two"></ngb-select-option>
      </ngb-select>
    `;

    const fixture = createTestComponent(html);
    const select = toggleAndReturnSelect(fixture);

    const menu = select.querySelectorAll('.dropdown-item');
    expect(menu).toBeTruthy();

    menu.item(0).click();
    fixture.detectChanges();
    expect(select).toHaveCssClass('show');

    menu.item(1).click();
    fixture.detectChanges();
    expect(select).toHaveCssClass('show');
  });

  it('should toggle option when selected/unselected', () => {
    const html = `<ngb-select multiple>
      <ngb-select-option value="One"></ngb-select-option>
      <ngb-select-option value="Two"></ngb-select-option>
    </ngb-select>`;

    const fixture = createTestComponent(html);
    const select = toggleAndReturnSelect(fixture);

    expect(getValueAsText(select)).toEqual([]);

    const firstOption = select.querySelectorAll('.dropdown-item')[0];
    firstOption.click();
    fixture.detectChanges();
    expect(getValueAsText(select)).toEqual(['One ×']);

    firstOption.click();
    fixture.detectChanges();
    expect(getValueAsText(select)).toEqual([]);
  });


  describe('keyboard support', () => {
    it('should deselect option when not opened and BACKSPACE is pressed', () => {
      const html = `
      <form [formGroup]="form">
        <ngb-select multiple formControlName="select">
          <ngb-select-option value="One"></ngb-select-option>
          <ngb-select-option value="Two"></ngb-select-option>
          <ngb-select-option value="Three"></ngb-select-option>
        </ngb-select>
      </form>
    `;
      const fixture = createTestComponent(html);
      fixture.componentInstance.form.patchValue({select: ['One', 'Two', 'Three']});
      const selectDebug = fixture.debugElement.query(By.directive(NgbSelectMultiple));
      selectDebug.nativeElement.focus();
      fixture.detectChanges();

      expect(getValueAsText(selectDebug.nativeElement)).toEqual(['One ×', 'Two ×', 'Three ×']);

      const backspace = createKeyEvent(Key.Backspace, {type: 'keydown'});
      selectDebug.triggerEventHandler('keydown', backspace);

      fixture.detectChanges();

      expect(getValueAsText(selectDebug.nativeElement)).toEqual(['One ×', 'Two ×']);
    });
  });

  describe('forms', () => {
    it('should work with template-driven form validation', fakeAsync(() => {
         const html = `
        <form>
          <ngb-select multiple name="control" [(ngModel)]="model" required>
            <ngb-select-option value="One"></ngb-select-option>
            <ngb-select-option value="Two"></ngb-select-option>
            <ngb-select-option value="Three"></ngb-select-option>
            <ngb-select-option value="Four"></ngb-select-option>
            <ngb-select-option value="Five"></ngb-select-option>
            <ngb-select-option value="Six"></ngb-select-option>
          </ngb-select>
        </form>
      `;
         const fixture = createTestComponent(html);
         tick();
         fixture.detectChanges();
         const element = fixture.debugElement.query(By.directive(NgbSelectMultiple));

         expect(getValueAsText(element.nativeElement)).toEqual([]);
         expect(element.nativeElement).toHaveCssClass('ng-invalid');
         expect(element.nativeElement).toHaveCssClass('ng-untouched');

         fixture.componentInstance.model = ['Two'];
         fixture.detectChanges();
         tick();
         fixture.detectChanges();

         expect(getValueAsText(element.nativeElement)).toEqual(['Two ×']);
         expect(element.nativeElement).toHaveCssClass('ng-valid');
         expect(element.nativeElement).toHaveCssClass('ng-untouched');

         fixture.componentInstance.model = ['One', 'Five'];
         fixture.detectChanges();
         tick();
         fixture.detectChanges();

         expect(getValueAsText(element.nativeElement)).toEqual(['One ×', 'Five ×']);
       }));

    it('should work with reactive form controls', () => {
      const html = `
        <form [formGroup]="form">
          <ngb-select multiple formControlName="select">
            <ngb-select-option value="One"></ngb-select-option>
            <ngb-select-option value="Two"></ngb-select-option>
            <ngb-select-option value="Three"></ngb-select-option>
            <ngb-select-option value="For"></ngb-select-option>
            <ngb-select-option value="Five"></ngb-select-option>
            <ngb-select-option value="Six"></ngb-select-option>
          </ngb-select>
        </form>
      `;

      const fixture = createTestComponent(html);
      const element = fixture.debugElement.query(By.directive(NgbSelectMultiple));
      expect(getValueAsText(element.nativeElement)).toEqual([]);
      expect(element.nativeElement).toHaveCssClass('ng-invalid');
      expect(element.nativeElement).toHaveCssClass('ng-untouched');

      fixture.componentInstance.form.patchValue({select: ['One']});
      fixture.detectChanges();

      // console.log(element.nativeElement);
      expect(getValueAsText(element.nativeElement)).toEqual(['One ×']);
      expect(element.nativeElement).toHaveCssClass('ng-valid');
      expect(element.nativeElement).toHaveCssClass('ng-untouched');
    });

  });

});

@Component({template: ''})
class TestComponent {
  model = [];
  form = new FormGroup({select: new FormControl(null, Validators.required)});
}
