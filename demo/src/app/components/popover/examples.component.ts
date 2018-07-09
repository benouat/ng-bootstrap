import { Component } from '@angular/core';

import { DEMO_SNIPPETS } from './demos';

@Component({
  template: `
    <ngbd-example-box demoTitle="Quick and easy popovers" [snippets]="snippets" component="popover" demo="basic">
      <ngbd-popover-basic></ngbd-popover-basic>
    </ngbd-example-box>
    <ngbd-example-box
      demoTitle="HTML and bindings in popovers" [snippets]="snippets" component="popover" demo="tplcontent">
      <ngbd-popover-tplcontent></ngbd-popover-tplcontent>
    </ngbd-example-box>
    <ngbd-example-box
      demoTitle="Custom and manual triggers" [snippets]="snippets" component="popover" demo="triggers">
      <ngbd-popover-triggers></ngbd-popover-triggers>
    </ngbd-example-box>
    <ngbd-example-box
      demoTitle="Context and manual triggers" [snippets]="snippets" component="popover" demo="tplwithcontext">
      <ngbd-popover-tplwithcontext></ngbd-popover-tplwithcontext>
    </ngbd-example-box>
    <ngbd-example-box
      demoTitle="Popover visibility events" [snippets]="snippets" component="popover" demo="visibility">
      <ngbd-popover-visibility></ngbd-popover-visibility>
    </ngbd-example-box>
    <ngbd-example-box
      demoTitle="Append popover in the body" [snippets]="snippets" component="popover" demo="container">
      <ngbd-popover-container></ngbd-popover-container>
    </ngbd-example-box>
    <ngbd-example-box
      demoTitle="Popover with custom class" [snippets]="snippets" component="popover" demo="custom-class">
      <ngbd-popover-custom-class></ngbd-popover-custom-class>
    </ngbd-example-box>
    <ngbd-example-box
      demoTitle="Global configuration of popovers" [snippets]="snippets" component="popover" demo="config">
      <ngbd-popover-config></ngbd-popover-config>
    </ngbd-example-box>
  `
})
export class NgbdPopoverExamples {
  snippets = DEMO_SNIPPETS;
}
