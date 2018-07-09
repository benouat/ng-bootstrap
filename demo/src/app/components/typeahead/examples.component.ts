import { Component } from '@angular/core';

import { DEMO_SNIPPETS } from './demos';

@Component({
  template: `
    <ngbd-example-box demoTitle="Simple Typeahead" [snippets]="snippets" component="typeahead" demo="basic">
      <ngbd-typeahead-basic></ngbd-typeahead-basic>
    </ngbd-example-box>
    <ngbd-example-box demoTitle="Open on focus" [snippets]="snippets" component="typeahead" demo="focus">
      <ngbd-typeahead-focus></ngbd-typeahead-focus>
    </ngbd-example-box>
    <ngbd-example-box demoTitle="Formatted results" [snippets]="snippets" component="typeahead" demo="format">
      <ngbd-typeahead-format></ngbd-typeahead-format>
    </ngbd-example-box>
    <ngbd-example-box demoTitle="Wikipedia search" [snippets]="snippets" component="typeahead" demo="http">
      <ngbd-typeahead-http></ngbd-typeahead-http>
    </ngbd-example-box>
    <ngbd-example-box demoTitle="Template for results" [snippets]="snippets" component="typeahead" demo="template">
      <ngbd-typeahead-template></ngbd-typeahead-template>
    </ngbd-example-box>
    <ngbd-example-box demoTitle="Global configuration of typeaheads" [snippets]="snippets" component="typeahead" demo="config">
      <ngbd-typeahead-config></ngbd-typeahead-config>
    </ngbd-example-box>
  `
})
export class NgbdTypeaheadExamples {
  snippets = DEMO_SNIPPETS;
}
