import { Component } from '@angular/core';

import { DEMO_SNIPPETS } from './demos';

@Component({
  template: `
    <ngbd-example-box demoTitle="Modal with default options" [snippets]="snippets" component="modal" demo="basic">
        <ngbd-modal-basic></ngbd-modal-basic>
    </ngbd-example-box>
    <ngbd-example-box demoTitle="Components as content" [snippets]="snippets" component="modal" demo="component">
        <ngbd-modal-component></ngbd-modal-component>
    </ngbd-example-box>
    <ngbd-example-box demoTitle="Modal with options" [snippets]="snippets" component="modal" demo="options">
        <ngbd-modal-options></ngbd-modal-options>
    </ngbd-example-box>
  `
})
export class NgbdModalExamples {
  snippets = DEMO_SNIPPETS;
}
