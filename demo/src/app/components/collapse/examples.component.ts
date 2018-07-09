import {Component} from '@angular/core';
import {DEMO_SNIPPETS} from './demos';

@Component({
  template: `
    <ngbd-example-box demoTitle="Demo" [snippets]="snippets" component="collapse" demo="basic">
      <ngbd-collapse-basic></ngbd-collapse-basic>
    </ngbd-example-box>
  `
})
export class NgbdCollapseExamples {
  snippets = DEMO_SNIPPETS;
}
