import { Component } from '@angular/core';

import { DEMO_SNIPPETS } from './demos';

@Component({
  template: `
    <ngbd-example-box demoTitle="Basic Alert" [snippets]="snippets" component="alert" demo="basic">
      <ngbd-alert-basic></ngbd-alert-basic>
    </ngbd-example-box>
    <ngbd-example-box demoTitle="Closeable Alert" [snippets]="snippets" component="alert" demo="closeable">
      <ngbd-alert-closeable></ngbd-alert-closeable>
    </ngbd-example-box>
    <ngbd-example-box demoTitle="Self-Closing Alert" [snippets]="snippets" component="alert" demo="selfclosing">
      <ngbd-alert-selfclosing></ngbd-alert-selfclosing>
    </ngbd-example-box>
    <ngbd-example-box demoTitle="Custom Alert" [snippets]="snippets" component="alert" demo="custom">
      <ngbd-alert-custom></ngbd-alert-custom>
    </ngbd-example-box>
    <ngbd-example-box demoTitle="Global configuration of alerts" [snippets]="snippets" component="alert" demo="config">
      <ngbd-alert-config></ngbd-alert-config>
    </ngbd-example-box>
  `
})
export class NgbdAlertExamples {
   snippets = DEMO_SNIPPETS;
}
