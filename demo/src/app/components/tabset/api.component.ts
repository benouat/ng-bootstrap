import { Component } from '@angular/core';

@Component({
  template: `
    <ngbd-api-docs directive="NgbTabset"></ngbd-api-docs>
    <ngbd-api-docs directive="NgbTab"></ngbd-api-docs>
    <ngbd-api-docs directive="NgbTabTitle"></ngbd-api-docs>
    <ngbd-api-docs directive="NgbTabContent"></ngbd-api-docs>
    <ngbd-api-docs-class type="NgbTabChangeEvent"></ngbd-api-docs-class>
    <ngbd-api-docs-config type="NgbTabsetConfig"></ngbd-api-docs-config>
  `
})
export class NgbdTabsApi {}
