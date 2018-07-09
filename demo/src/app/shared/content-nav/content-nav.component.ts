import { DOCUMENT } from '@angular/common';
import { ChangeDetectorRef, Component, Inject, Input } from '@angular/core';

@Component({
  selector: 'ngbd-content-navigation',
  exportAs: 'ngbdContentNav',
  template: `
    <ul class="nav flex-column text-muted pt-4" *ngIf="!dropdown">
      <li *ngFor="let link of links" class="nav-item">
        <a class="nav-link" [routerLink]="['/components', component, activeTab]" [fragment]="link.fragment">{{link.title}}</a>
      </li>
    </ul>

    <ng-container *ngIf="dropdown">
      <a *ngFor="let link of links"
        class="dropdown-item" [routerLink]="['/components', component, activeTab]" [fragment]="link.fragment"
      >{{link.title}}</a>
    </ng-container>

  `
})
export class ContentNavigationComponent {

  @Input() activeTab: string;
  @Input() component: string;

  @Input() dropdown = false;


  links: any[] = [];

  constructor(private _changeDetector: ChangeDetectorRef, @Inject(DOCUMENT) private _document: any) {
    this._changeDetector.detach();
  }

  refresh() {
    setTimeout(() => {
      this.links = Array.from<HTMLElement>(
        this._document.querySelectorAll(
          'section.doc-content h2, section.doc-content h3'
        )
      ).map(title => {
        return {
          fragment: title.querySelector('a').getAttribute('id'),
          title: title.textContent.trim()
        };
      });
      this._changeDetector.detectChanges();
    }, 0);
  }
}
