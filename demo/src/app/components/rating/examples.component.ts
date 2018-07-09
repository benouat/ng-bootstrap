import { Component } from '@angular/core';

import { DEMO_SNIPPETS } from './demos';

@Component({
  template: `
    <ngbd-example-box demoTitle="Basic demo" [snippets]="snippets" component="rating" demo="basic">
      <ngbd-rating-basic></ngbd-rating-basic>
    </ngbd-example-box>
    <ngbd-example-box demoTitle="Events and readonly ratings" [snippets]="snippets" component="rating" demo="events">
      <ngbd-rating-events></ngbd-rating-events>
    </ngbd-example-box>
    <ngbd-example-box demoTitle="Custom star template" [snippets]="snippets" component="rating" demo="template">
      <ngbd-rating-template></ngbd-rating-template>
    </ngbd-example-box>
    <ngbd-example-box demoTitle="Custom decimal rating" [snippets]="snippets" component="rating" demo="decimal">
      <ngbd-rating-decimal></ngbd-rating-decimal>
    </ngbd-example-box>
    <ngbd-example-box demoTitle="Form integration" [snippets]="snippets" component="rating" demo="form">
      <ngbd-rating-form></ngbd-rating-form>
    </ngbd-example-box>
    <ngbd-example-box demoTitle="Global configuration of ratings" [snippets]="snippets" component="rating" demo="config">
      <ngbd-rating-config></ngbd-rating-config>
    </ngbd-example-box>
  `
})
export class NgbdRatingExamples {
  snippets = DEMO_SNIPPETS;
}
