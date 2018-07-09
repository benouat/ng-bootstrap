import { Component } from '@angular/core';

@Component({
  template: `
    <ngbd-api-docs directive="NgbTypeahead"></ngbd-api-docs>
    <ngbd-api-docs-class type="NgbTypeaheadSelectItemEvent"></ngbd-api-docs-class>
    <ngbd-api-docs-class type="ResultTemplateContext"></ngbd-api-docs-class>
    <ngbd-api-docs-config type="NgbTypeaheadConfig"></ngbd-api-docs-config>
  `
})
export class NgbdTypeaheadApi {}
