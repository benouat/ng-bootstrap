import { Component } from '@angular/core';

import { DEMO_SNIPPETS } from './demos';

@Component({
  template: `
    <ngbd-example-box demoTitle="Checkbox buttons" [snippets]="snippets" component="buttons" demo="checkbox">
      <ngbd-buttons-checkbox></ngbd-buttons-checkbox>
    </ngbd-example-box>
    <ngbd-example-box demoTitle="Checkbox buttons (Reactive Forms)" [snippets]="snippets" component="buttons" demo="checkboxreactive">
      <ngbd-buttons-checkboxreactive></ngbd-buttons-checkboxreactive>
    </ngbd-example-box>
    <ngbd-example-box demoTitle="Radio buttons" [snippets]="snippets" component="buttons" demo="radio">
      <ngbd-buttons-radio></ngbd-buttons-radio>
    </ngbd-example-box>
    <ngbd-example-box demoTitle="Radio buttons (Reactive Forms)" [snippets]="snippets" component="buttons" demo="radioreactive">
      <ngbd-buttons-radioreactive></ngbd-buttons-radioreactive>
    </ngbd-example-box>
  `
})
export class NgbdButtonsExamples {
   snippets = DEMO_SNIPPETS;
}
