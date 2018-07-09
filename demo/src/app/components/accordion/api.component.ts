import { Component } from '@angular/core';

@Component({
  selector: 'ngbd-accordion-api',
  template: `
    <ngbd-api-docs directive="NgbAccordion"></ngbd-api-docs>
    <ngbd-api-docs directive="NgbPanel"></ngbd-api-docs>
    <ngbd-api-docs directive="NgbPanelTitle"></ngbd-api-docs>
    <ngbd-api-docs directive="NgbPanelContent"></ngbd-api-docs>
    <ngbd-api-docs-class type="NgbPanelChangeEvent"></ngbd-api-docs-class>
    <ngbd-api-docs-config type="NgbAccordionConfig"></ngbd-api-docs-config>
  `
})
export class NgbdAccordionApi {}
