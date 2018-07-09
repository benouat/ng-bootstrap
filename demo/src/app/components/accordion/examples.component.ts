import { Component } from '@angular/core';

import { DEMO_SNIPPETS } from './demos';

@Component({
  selector: 'ngbd-accordion-demo',
  template: `
    <ngbd-example-box demoTitle="Accordion" [snippets]="snippets" component="accordion" demo="basic">
      <ngbd-accordion-basic></ngbd-accordion-basic>
    </ngbd-example-box>
    <ngbd-example-box demoTitle="One open panel at a time" [snippets]="snippets" component="accordion" demo="static">
      <ngbd-accordion-static></ngbd-accordion-static>
    </ngbd-example-box>
    <ngbd-example-box demoTitle="Toggle panels" [snippets]="snippets" component="accordion" demo="toggle">
      <ngbd-accordion-toggle></ngbd-accordion-toggle>
    </ngbd-example-box>
    <ngbd-example-box demoTitle="Prevent panel toggle" [snippets]="snippets" component="accordion" demo="preventchange">
      <ngbd-accordion-preventchange></ngbd-accordion-preventchange>
    </ngbd-example-box>
    <ngbd-example-box demoTitle="Global configuration of accordions" [snippets]="snippets" component="accordion" demo="config">
      <ngbd-accordion-config></ngbd-accordion-config>
    </ngbd-example-box>
  `
})
export class NgbdAccordionExamples {
  snippets = DEMO_SNIPPETS;
}
