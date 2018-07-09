import { Component } from '@angular/core';

import { DEMO_SNIPPETS } from './demos';

@Component({
  template: `
    <ngbd-example-box demoTitle="Tabset" [snippets]="snippets" component="tabset" demo="basic">
      <ngbd-tabset-basic></ngbd-tabset-basic>
    </ngbd-example-box>
    <ngbd-example-box demoTitle="Pills" [snippets]="snippets" component="tabset" demo="pills">
      <ngbd-tabset-pills></ngbd-tabset-pills>
    </ngbd-example-box>
    <ngbd-example-box demoTitle="Select an active tab by id" [snippets]="snippets" component="tabset" demo="selectbyid">
      <ngbd-tabset-selectbyid></ngbd-tabset-selectbyid>
    </ngbd-example-box>
    <ngbd-example-box demoTitle="Prevent tab change" [snippets]="snippets" component="tabset" demo="preventchange">
      <ngbd-tabset-preventchange></ngbd-tabset-preventchange>
    </ngbd-example-box>
    <ngbd-example-box demoTitle="Nav justification" [snippets]="snippets" component="tabset" demo="justify">
      <ngbd-tabset-justify></ngbd-tabset-justify>
    </ngbd-example-box>
    <ngbd-example-box demoTitle="Nav orientation" [snippets]="snippets" component="tabset" demo="orientation">
      <ngbd-tabset-orientation></ngbd-tabset-orientation>
    </ngbd-example-box>
    <ngbd-example-box demoTitle="Global configuration of tabs" [snippets]="snippets" component="tabset" demo="config">
      <ngbd-tabset-config></ngbd-tabset-config>
    </ngbd-example-box>
  `
})
export class NgbdTabsExamples {
  snippets = DEMO_SNIPPETS;
}
