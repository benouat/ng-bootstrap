import {Component} from '@angular/core';
import {DEMO_SNIPPETS} from './demos';

@Component({
  template: `
    <ngbd-example-box demoTitle="Basic pagination" [snippets]="snippets" component="pagination" demo="basic">
      <ngbd-pagination-basic></ngbd-pagination-basic>
    </ngbd-example-box>
    <ngbd-example-box demoTitle="Advanced pagination" [snippets]="snippets" component="pagination" demo="advanced">
      <ngbd-pagination-advanced></ngbd-pagination-advanced>
    </ngbd-example-box>
    <ngbd-example-box demoTitle="Pagination size" [snippets]="snippets" component="pagination" demo="size">
      <ngbd-pagination-size></ngbd-pagination-size>
    </ngbd-example-box>
    <ngbd-example-box demoTitle="Pagination alignment" [snippets]="snippets" component="pagination" demo="justify">
      <ngbd-pagination-justify></ngbd-pagination-justify>
    </ngbd-example-box>
    <ngbd-example-box demoTitle="Disabled pagination" [snippets]="snippets" component="pagination" demo="disabled">
      <ngbd-pagination-disabled></ngbd-pagination-disabled>
    </ngbd-example-box>
    <ngbd-example-box demoTitle="Global configuration" [snippets]="snippets" component="pagination" demo="config">
      <ngbd-pagination-config></ngbd-pagination-config>
    </ngbd-example-box>
  `
})
export class NgbdPaginationExamples {
  snippets = DEMO_SNIPPETS;
}
