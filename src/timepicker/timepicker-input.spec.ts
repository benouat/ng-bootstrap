import {Component, Injectable, DebugElement} from '@angular/core';
import {FormGroup, FormControl, Validators, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {TestBed, ComponentFixture, async, inject} from '@angular/core/testing';
import {NgbTimepickerModule} from './timepicker.module';
import {NgbTimepickerInputConfig} from './timepicker-input-config';
import {NgbTimepickerDirective} from './timepicker-input';
import {NgbTimeStructAdapter} from './ngb-time-adapter';
import {NgbTimepickerI18n} from './timepicker-i18n';
import {createGenericTestComponent} from '../test/common';
import {By} from '@angular/platform-browser';

const createTestComponent = (html: string) =>
    createGenericTestComponent(html, TestComponent) as ComponentFixture<TestComponent>;

const getInput = (el: HTMLElement) => el.querySelector('input');
const getDebugInput = (fixture: ComponentFixture<TestComponent>): DebugElement =>
    fixture.debugElement.query(By.css('input'));

const setInputCursor = (input: HTMLInputElement, pos: number) => {
  input.selectionStart = input.selectionEnd = pos;
};

const setInputValue = (input: HTMLInputElement, value: string) => {
  input.value = value;
};

function expectToDisplayTime(el: HTMLElement, time: string) {
  const input = getInput(el);
  expect(input.value).toBe(time);
}

function expectToHaveAttribute(el: HTMLElement, name: string, value: string) {
  const input = getInput(el);
  const attr = input.getAttribute(name);
  expect(attr).toBe(value);
}

describe('input[ngbTimepicker]', () => {
  beforeEach(() => {
    TestBed.configureTestingModule(
        {declarations: [TestComponent], imports: [NgbTimepickerModule, FormsModule, ReactiveFormsModule]});
  });

  describe('initialization', () => {
    it('should initialize inputs with provided config', () => {
      const defaultConfig = new NgbTimepickerInputConfig();
      const timepicker = new NgbTimepickerDirective(
          {nativeElement: null}, new NgbTimeStructAdapter(), new TestI18n(), new NgbTimepickerInputConfig());
      expect(timepicker.meridian).toBe(defaultConfig.meridian);
      expect(timepicker.hourStep).toBe(defaultConfig.hourStep);
      expect(timepicker.minuteStep).toBe(defaultConfig.minuteStep);
      expect(timepicker.secondStep).toBe(defaultConfig.secondStep);
      expect(timepicker.disabled).toBe(defaultConfig.disabled);
    });

    describe('of maxlength', () => {
      function expectMaxLength(markup, model, length) {
        return async(async() => {
          const fixture = createTestComponent(markup);
          fixture.componentInstance.model = model;
          fixture.detectChanges();
          await fixture.whenStable();
          fixture.detectChanges();

          expectToHaveAttribute(fixture.nativeElement, 'maxlength', length);
        });
      }

      it('should be done with hour and minute',
         expectMaxLength(`<input type="text" ngbTimepicker [ngModel]="model" />`, {hour: 13, minute: 37}, '5'));

      it('should be done with hour, minute and second',
         expectMaxLength(
             `<input type="text" ngbTimepicker [ngModel]="model" />`, {hour: 13, minute: 37, second: 10}, '8'));

      it('should be done with hour, minute and meridian',
         expectMaxLength(
             `<input type="text" ngbTimepicker [ngModel]="model" [meridian]="true" />`, {hour: 13, minute: 37}, '8'));

      it('should be done with hour, minute, second and meridian',
         expectMaxLength(
             `<input type="text" ngbTimepicker [ngModel]="model" [meridian]="true"/>`,
             {hour: 13, minute: 37, second: 10}, '11'));
    });

  });

  describe('rendering based on model', () => {
    it('should render hour and minute (and second)', async(async() => {
         const html = `<input type="text" ngbTimepicker [ngModel]="model" />`;
         const fixture = createTestComponent(html);
         fixture.componentInstance.model = {hour: 13, minute: 37};

         fixture.detectChanges();
         await fixture.whenStable();

         expectToDisplayTime(fixture.nativeElement, '13:37');

         fixture.componentInstance.model = {hour: 13, minute: 37, second: 10};
         fixture.detectChanges();
         await fixture.whenStable();

         expectToDisplayTime(fixture.nativeElement, '13:37:10');
       }));
  });

  describe('model update from input changes', () => {
    it('should update hour', async(async() => {
         const html = `<input type="text" ngbTimepicker [(ngModel)]="model" />`;
         const fixture = createTestComponent(html);
         fixture.componentInstance.model = {hour: 13, minute: 37};

         fixture.detectChanges();
         await fixture.whenStable();

         expectToDisplayTime(fixture.nativeElement, '13:37');

         const input = getDebugInput(fixture);
         setInputValue(input.nativeElement, '01:37');
         input.triggerEventHandler(
             'input', {target: input.nativeElement});  // target is needed here for [(ngModel)] to work

         fixture.detectChanges();
         expect(fixture.componentInstance.model).toEqual({hour: 1, minute: 37});
       }));

    it('should update minute', async(async() => {
         const html = `<input type="text" ngbTimepicker [(ngModel)]="model" />`;
         const fixture = createTestComponent(html);
         fixture.componentInstance.model = {hour: 13, minute: 37};

         fixture.detectChanges();
         await fixture.whenStable();

         expectToDisplayTime(fixture.nativeElement, '13:37');

         const input = getDebugInput(fixture);
         setInputValue(input.nativeElement, '13:27');
         input.triggerEventHandler(
             'input', {target: input.nativeElement});  // target is needed here for [(ngModel)] to work

         fixture.detectChanges();
         expect(fixture.componentInstance.model).toEqual({hour: 13, minute: 27});
       }));

    it('should update second', async(async() => {
         const html = `<input type="text" ngbTimepicker [(ngModel)]="model" />`;
         const fixture = createTestComponent(html);
         fixture.componentInstance.model = {hour: 13, minute: 37, second: 10};

         fixture.detectChanges();
         await fixture.whenStable();

         expectToDisplayTime(fixture.nativeElement, '13:37:10');

         const input = getDebugInput(fixture);
         setInputValue(input.nativeElement, '13:37:37');
         input.triggerEventHandler(
             'input', {target: input.nativeElement});  // target is needed here for [(ngModel)] to work

         fixture.detectChanges();
         expect(fixture.componentInstance.model).toEqual({hour: 13, minute: 37, second: 37});
       }));

    describe('with meridian', () => {
      it('should update dayPeriod', async(async() => {
           const html = `<input type="text" ngbTimepicker [(ngModel)]="model" [meridian]="true"/>`;
           const fixture = createTestComponent(html);
           fixture.componentInstance.model = {hour: 13, minute: 37};

           fixture.detectChanges();
           await fixture.whenStable();

           expectToDisplayTime(fixture.nativeElement, '01:37 PM');

           const input = getDebugInput(fixture);
           setInputValue(input.nativeElement, '01:37 AM');
           input.triggerEventHandler(
               'input', {target: input.nativeElement});  // target is needed here for [(ngModel)] to work

           fixture.detectChanges();

           expect(fixture.componentInstance.model).toEqual({hour: 1, minute: 37});
         }));

      it('should update dayPeriod with second', async(async() => {
           const html = `<input type="text" ngbTimepicker [(ngModel)]="model" [meridian]="true"/>`;
           const fixture = createTestComponent(html);
           fixture.componentInstance.model = {hour: 13, minute: 37, second: 10};

           fixture.detectChanges();
           await fixture.whenStable();

           expectToDisplayTime(fixture.nativeElement, '01:37:10 PM');

           const input = getDebugInput(fixture);
           setInputValue(input.nativeElement, '01:37:10 AM');
           input.triggerEventHandler(
               'input', {target: input.nativeElement});  // target is needed here for [(ngModel)] to work

           fixture.detectChanges();

           expect(fixture.componentInstance.model).toEqual({hour: 1, minute: 37, second: 10});
         }));
    });

  });

  describe('keyboard bindings', () => {
    it('should increment/decrement hour when arrows are pressed (both visual and model)', async(async() => {
         const html = `<input type="text" ngbTimepicker [(ngModel)]="model" />`;
         const fixture = createTestComponent(html);
         fixture.componentInstance.model = {hour: 13, minute: 37};

         fixture.detectChanges();
         await fixture.whenStable();

         expectToDisplayTime(fixture.nativeElement, '13:37');
         expect(fixture.componentInstance.model).toEqual({hour: 13, minute: 37});

         const input = getDebugInput(fixture);

         // Hour increment, cursor positions => |13 , 1|4 , 15|
         const positions = [0, 1, 2];
         for (const index of positions) {
           const hour = fixture.componentInstance.model.hour + 1;
           setInputCursor(input.nativeElement, index);
           input.triggerEventHandler(
               'keydown.ArrowUp', {code: 'ArrowUp', target: input.nativeElement, preventDefault: () => {}});
           fixture.detectChanges();
           expectToDisplayTime(fixture.nativeElement, `${hour}:37`);
           expect(fixture.componentInstance.model).toEqual({hour, minute: 37});
         }

         // Hour decrement, cursor positions => |16 , 1|5 , 14|
         for (const index of positions) {
           const hour = fixture.componentInstance.model.hour - 1;
           setInputCursor(input.nativeElement, index);
           input.triggerEventHandler(
               'keydown.ArrowDown', {code: 'ArrowDown', target: input.nativeElement, preventDefault: () => {}});
           fixture.detectChanges();
           expectToDisplayTime(fixture.nativeElement, `${hour}:37`);
           expect(fixture.componentInstance.model).toEqual({hour, minute: 37});
         }
       }));

    it('should increment/decrement minute when arrows are pressed (both visual and model)', async(async() => {
         const html = `<input type="text" ngbTimepicker [(ngModel)]="model" />`;
         const fixture = createTestComponent(html);
         fixture.componentInstance.model = {hour: 13, minute: 37};

         fixture.detectChanges();
         await fixture.whenStable();

         const input = getDebugInput(fixture);

         // Minute increment, cursor positions => |37 , 3|8 , 39|
         const positions = [3, 4, 5];
         for (const index of positions) {
           const minute = fixture.componentInstance.model.minute + 1;
           setInputCursor(input.nativeElement, index);
           input.triggerEventHandler(
               'keydown.ArrowUp', {code: 'ArrowUp', target: input.nativeElement, preventDefault: () => {}});
           fixture.detectChanges();
           expectToDisplayTime(fixture.nativeElement, `13:${minute}`);
           expect(fixture.componentInstance.model).toEqual({hour: 13, minute});
         }

         // Minute decrement, cursor positions => |39 , 3|8 , 37|
         for (const index of positions) {
           const minute = fixture.componentInstance.model.minute - 1;
           setInputCursor(input.nativeElement, index);
           input.triggerEventHandler(
               'keydown.ArrowDown', {code: 'ArrowDown', target: input.nativeElement, preventDefault: () => {}});
           fixture.detectChanges();
           expectToDisplayTime(fixture.nativeElement, `13:${minute}`);
           expect(fixture.componentInstance.model).toEqual({hour: 13, minute});
         }
       }));

    it('should increment/decrement second when arrows are pressed (both visual and model)', async(async() => {
         const html = `<input type="text" ngbTimepicker [(ngModel)]="model" />`;
         const fixture = createTestComponent(html);
         fixture.componentInstance.model = {hour: 13, minute: 37, second: 10};

         fixture.detectChanges();
         await fixture.whenStable();

         const input = getDebugInput(fixture);

         // Second increment, cursor positions => |10 , 1|1 , 12|
         const positions = [6, 7, 8];
         for (const index of positions) {
           const second = fixture.componentInstance.model.second + 1;
           setInputCursor(input.nativeElement, index);
           input.triggerEventHandler(
               'keydown.ArrowUp', {code: 'ArrowUp', target: input.nativeElement, preventDefault: () => {}});
           fixture.detectChanges();
           expectToDisplayTime(fixture.nativeElement, `13:37:${second}`);
           expect(fixture.componentInstance.model).toEqual({hour: 13, minute: 37, second});
         }

         // Second decrement, cursor positions => |12 , 1|1 , 10|
         for (const index of positions) {
           const second = fixture.componentInstance.model.second - 1;
           setInputCursor(input.nativeElement, index);
           input.triggerEventHandler(
               'keydown.ArrowDown', {code: 'ArrowDown', target: input.nativeElement, preventDefault: () => {}});
           fixture.detectChanges();
           expectToDisplayTime(fixture.nativeElement, `13:37:${second}`);
           expect(fixture.componentInstance.model).toEqual({hour: 13, minute: 37, second});
         }
       }));

    describe('with custom steps', () => {
      const step = 2;
      it('should increment/decrement hour when arrows are pressed (both visual and model)', async(async() => {
           const html = `<input type="text" ngbTimepicker [(ngModel)]="model" [hourStep]="${step}"/>`;
           const fixture = createTestComponent(html);
           fixture.componentInstance.model = {hour: 13, minute: 37};

           fixture.detectChanges();
           await fixture.whenStable();

           const input = getDebugInput(fixture);

           // Hour increment, cursor positions => |13 , 1|5 , 17|
           const positions = [0, 1, 2];
           for (const index of positions) {
             const hour = fixture.componentInstance.model.hour + step;
             setInputCursor(input.nativeElement, index);
             input.triggerEventHandler(
                 'keydown.ArrowUp', {code: 'ArrowUp', target: input.nativeElement, preventDefault: () => {}});
             fixture.detectChanges();
             expectToDisplayTime(fixture.nativeElement, `${hour}:37`);
             expect(fixture.componentInstance.model).toEqual({hour, minute: 37});
           }

           // Hour decrement, cursor positions => |19 , 1|7 , 15|
           for (const index of positions) {
             const hour = fixture.componentInstance.model.hour - step;
             setInputCursor(input.nativeElement, index);
             input.triggerEventHandler(
                 'keydown.ArrowDown', {code: 'ArrowDown', target: input.nativeElement, preventDefault: () => {}});
             fixture.detectChanges();
             expectToDisplayTime(fixture.nativeElement, `${hour}:37`);
             expect(fixture.componentInstance.model).toEqual({hour, minute: 37});
           }
         }));

      it('should increment/decrement minute when arrows are pressed (both visual and model)', async(async() => {
           const html = `<input type="text" ngbTimepicker [(ngModel)]="model" [minuteStep]="${step}"/>`;
           const fixture = createTestComponent(html);
           fixture.componentInstance.model = {hour: 13, minute: 37};

           fixture.detectChanges();
           await fixture.whenStable();

           const input = getDebugInput(fixture);

           // Minute increment, cursor positions => |37 , 3|9 , 41|
           const positions = [3, 4, 5];
           for (const index of positions) {
             const minute = fixture.componentInstance.model.minute + step;
             setInputCursor(input.nativeElement, index);
             input.triggerEventHandler(
                 'keydown.ArrowUp', {code: 'ArrowUp', target: input.nativeElement, preventDefault: () => {}});
             fixture.detectChanges();
             expectToDisplayTime(fixture.nativeElement, `13:${minute}`);
             expect(fixture.componentInstance.model).toEqual({hour: 13, minute});
           }

           // Minute decrement, cursor positions => |43 , 4|1 , 39|
           for (const index of positions) {
             const minute = fixture.componentInstance.model.minute - step;
             setInputCursor(input.nativeElement, index);
             input.triggerEventHandler(
                 'keydown.ArrowDown', {code: 'ArrowDown', target: input.nativeElement, preventDefault: () => {}});
             fixture.detectChanges();
             expectToDisplayTime(fixture.nativeElement, `13:${minute}`);
             expect(fixture.componentInstance.model).toEqual({hour: 13, minute});
           }
         }));

      it('should increment/decrement second when arrows are pressed (both visual and model)', async(async() => {
           const html = `<input type="text" ngbTimepicker [(ngModel)]="model" [secondStep]="${step}"/>`;
           const fixture = createTestComponent(html);
           fixture.componentInstance.model = {hour: 13, minute: 37, second: 10};

           fixture.detectChanges();
           await fixture.whenStable();

           const input = getDebugInput(fixture);

           // Second increment, cursor positions => |10 , 1|2 , 14|
           const positions = [6, 7, 8];
           for (const index of positions) {
             const second = fixture.componentInstance.model.second + step;
             setInputCursor(input.nativeElement, index);
             input.triggerEventHandler(
                 'keydown.ArrowUp', {code: 'ArrowUp', target: input.nativeElement, preventDefault: () => {}});
             fixture.detectChanges();
             expectToDisplayTime(fixture.nativeElement, `13:37:${second}`);
             expect(fixture.componentInstance.model).toEqual({hour: 13, minute: 37, second});
           }

           // Second decrement, cursor positions => |16 , 1|4 , 12|
           for (const index of positions) {
             const second = fixture.componentInstance.model.second - step;
             setInputCursor(input.nativeElement, index);
             input.triggerEventHandler(
                 'keydown.ArrowDown', {code: 'ArrowDown', target: input.nativeElement, preventDefault: () => {}});
             fixture.detectChanges();
             expectToDisplayTime(fixture.nativeElement, `13:37:${second}`);
             expect(fixture.componentInstance.model).toEqual({hour: 13, minute: 37, second});
           }
         }));
    });
  });

  describe('meridian', () => {
    it('should display morning period time w/ and w/o second', async(async() => {
         const html = `<input type="text" ngbTimepicker [ngModel]="model" [meridian]="true" />`;
         const fixture = createTestComponent(html);
         fixture.componentInstance.model = {hour: 1, minute: 37};

         fixture.detectChanges();
         await fixture.whenStable();

         expectToDisplayTime(fixture.nativeElement, '01:37 AM');

         fixture.componentInstance.model = {hour: 1, minute: 37, second: 10};

         fixture.detectChanges();
         await fixture.whenStable();

         expectToDisplayTime(fixture.nativeElement, '01:37:10 AM');
       }));

    it('should display afternoon period time w/ and w/o second', async(async() => {
         const html = `<input type="text" ngbTimepicker [ngModel]="model" [meridian]="true" />`;
         const fixture = createTestComponent(html);
         fixture.componentInstance.model = {hour: 13, minute: 37};

         fixture.detectChanges();
         await fixture.whenStable();

         expectToDisplayTime(fixture.nativeElement, '01:37 PM');

         fixture.componentInstance.model = {hour: 13, minute: 37, second: 10};

         fixture.detectChanges();
         await fixture.whenStable();

         expectToDisplayTime(fixture.nativeElement, '01:37:10 PM');
       }));

    describe('keyboard', () => {
      it('should increment/decrement seconds when arrows are pressed', async(async() => {
           const html = `<input type="text" ngbTimepicker [(ngModel)]="model" [meridian]="true" />`;
           const fixture = createTestComponent(html);
           fixture.componentInstance.model = {hour: 13, minute: 37, second: 10};

           fixture.detectChanges();
           await fixture.whenStable();

           const input = getDebugInput(fixture);

           // Second increment, cursor positions => |10 , 1|1 , 12|
           const positions = [6, 7, 8];
           for (const index of positions) {
             const second = fixture.componentInstance.model.second + 1;
             setInputCursor(input.nativeElement, index);
             input.triggerEventHandler(
                 'keydown.ArrowUp', {code: 'ArrowUp', target: input.nativeElement, preventDefault: () => {}});
             fixture.detectChanges();
             expectToDisplayTime(fixture.nativeElement, `01:37:${second} PM`);
             expect(fixture.componentInstance.model).toEqual({hour: 13, minute: 37, second});
           }

         }));

      it('should toggle dayperiod when arrows are pressed', async(async() => {
           const html = `<input type="text" ngbTimepicker [(ngModel)]="model" [meridian]="true" />`;
           const fixture = createTestComponent(html);

           // First testing without second, dayPeriod position is 6
           fixture.componentInstance.model = {hour: 13, minute: 37};

           fixture.detectChanges();
           await fixture.whenStable();

           const input = getDebugInput(fixture);

           function expectProperDayPeriod(position, value, model) {
             setInputCursor(input.nativeElement, position);
             input.triggerEventHandler(
                 'keydown.ArrowDown', {code: 'ArrowDown', target: input.nativeElement, preventDefault: () => {}});
             fixture.detectChanges();
             expectToDisplayTime(fixture.nativeElement, value);
             expect(fixture.componentInstance.model).toEqual(model);
           }

           // First testing without second, dayPeriod positions are starting from index 6
           expectProperDayPeriod(6, `01:37 AM`, {hour: 1, minute: 37});
           expectProperDayPeriod(7, `01:37 PM`, {hour: 13, minute: 37});

         }));
    });
  });
});

@Component({selector: 'test-cmp', template: ''})
class TestComponent {
  model;
}

@Injectable()
class TestI18n extends NgbTimepickerI18n {
  getMorningPeriod(): string { return 'am'; }
  getAfternoonPeriod(): string { return 'pm'; }
}
