import { Component } from '@angular/core';

@Component({
  template: `
    <ngbd-api-docs directive="NgbDatepicker"></ngbd-api-docs>
    <ngbd-api-docs directive="NgbInputDatepicker"></ngbd-api-docs>
    <ngbd-api-docs directive="NgbDatepickerToggle"></ngbd-api-docs>
    <ngbd-api-docs-class type="NgbDateStruct"></ngbd-api-docs-class>
    <ngbd-api-docs-class type="DayTemplateContext"></ngbd-api-docs-class>
    <ngbd-api-docs-class type="NgbDatepickerNavigateEvent"></ngbd-api-docs-class>
    <ngbd-api-docs-class type="NgbDatepickerI18n"></ngbd-api-docs-class>
    <ngbd-api-docs-class type="NgbDateParserFormatter"></ngbd-api-docs-class>
    <ngbd-api-docs-class type="NgbDateAdapter"></ngbd-api-docs-class>
    <ngbd-api-docs-config type="NgbDatepickerConfig"></ngbd-api-docs-config>
`
})
export class NgbdDatepickerApi {}
