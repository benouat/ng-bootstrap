import { Component } from '@angular/core';

import { DEMO_SNIPPETS } from './demos';

@Component({
  template: `
    <ngbd-example-box demoTitle="Carousel" [snippets]="snippets" component="carousel" demo="basic">
      <ngbd-carousel-basic></ngbd-carousel-basic>
    </ngbd-example-box>
    <ngbd-example-box demoTitle="Navigation arrows and indicators" [snippets]="snippets" component="carousel" demo="navigation">
      <ngbd-carousel-navigation></ngbd-carousel-navigation>
    </ngbd-example-box>
    <ngbd-example-box demoTitle="Global configuration of carousels" [snippets]="snippets" component="carousel" demo="config">
      <ngbd-carousel-config></ngbd-carousel-config>
    </ngbd-example-box>
  `
})
export class NgbdCarouselExamples {
  snippets = DEMO_SNIPPETS;
}
