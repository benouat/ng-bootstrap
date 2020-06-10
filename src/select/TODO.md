### Basic select

```html
<select>
  <option value="1">One</option>
  <option value="2">Two</option>
  <option value="3">Three</option>
</select>
```

---
### Basic ng-bootstrap select

```html
<ngb-select>
  <option value="1">One</option>
  <option value="2">Two</option>
  <option value="3">Three</option>
</ngb-select>
```

---
### Select with ngb-option

```html
<ngb-select>
  <ngb-option value="1">One</ngb-option>
  <ngb-option value="2">Two</ngb-option>
  <ngb-option value="3">Three</ngb-option>
</ngb-select>
```

---
### Select with ngFor for ngb-option

```typescript
const items = [1, 2, 3];
```

```html
<ngb-select>
  <ngb-option
    *ngFor="let option of items"
    [value]="option"
  >{{option}}</ngb-option>
</ngb-select>
```

---
### JSON object as value (with default getters for value & label)

With JSON objects as values, the widget will automatically use a template to render the options.

```typescript
const items = [
  {
    value: 1,
    label: 'One'
  }, {
    value: 2,
    label: 'Two'
  }, {
    value: 3,
    label: 'Three'
  }
];

const selected = items[1];
```

```html
<ngb-select [(ngModel)]="selected">
  <!-- ngb-option will be rendered with default internal ng-template -->
  <ngb-option
    *ngFor="let option of items"
    [value]="option"
  ></ngb-option>
</ngb-select>
```

---
### JSON object as value with custom getters

```typescript
const items = [
  {
    myValue: 1,
    theLabel: 'One'
  }, {
    myValue: 2,
    theLabel: 'Two'
  }, {
    myValue: 3,
    theLabel: 'Three'
  }
];

const selected = items[1];
```

```html
<ngb-select [(ngModel)]="selected" valueGetter="myValue" labelGetter="theLabel">
  <!-- ngb-option will be rendered with default internal ng-template -->
  <ngb-option
    *ngFor="let option of items"
    [value]="option"
  ></ngb-option>
</ngb-select>
```

---
### Custom template for options

```typescript
const items = [1, 2, 3];
```

```html
<ngb-select>
  <ng-template ngbOption let-option>{{option}}</ng-template>
  <ngb-option
    *ngFor="let option of items"
    [value]="option"
  ></ngb-option>
</ngb-select>
```
---
### Custom template for options with JSON object as value.

Here again, because of JSON objects used as values, options have to be rendered using a template.

```typescript
const items = [
  {
    value: 1,
    label: 'One'
  }, {
    value: 2,
    label: 'Two'
  }, {
    value: 3,
    label: 'Three'
  }
];

const selected = items[1];
```

```html
<ngb-select [(ngModel)]="selected">
  <!-- template used both inside the list and the input -->
  <ng-template ngbOption let-option>{{option.label}}</ng-template>
  <ngb-option
    *ngFor="let option of items"
    [value]="option"
  ></ngb-option>
</ngb-select>
```

---
### Custom templates for both selectedOption and options (in the list)

```typescript
const items = [
  {
    value: 1,
    label: 'One'
  }, {
    value: 2,
    label: 'Two'
  }, {
    value: 3,
    label: 'Three'
  }
];

const selected = items[1];
```

```html
<ngb-select [(ngModel)]="selected">
  <!-- template used inside the input -->
  <ng-template ngbSelectedOption let-option>
    {{option.label}}
  </ng-template>

  <!-- template used in the list -->
  <ng-template ngbOption let-option>{{option.label}}</ng-template>

  <ngb-option
    *ngFor="let option of items"
    [value]="option"
  ></ngb-option>
</ngb-select>
```

---
### Multiple selection with custom templates

If you don't provide an `ngbSelectedOption`, the widget will used the `ngbOption` or the default internal one.

```typescript
const items = [
  {
    value: 1,
    label: 'One',
    type: 'foo'
  }, {
    value: 2,
    label: 'Two',
    type: 'foo'
  }, {
    value: 3,
    label: 'Three',
    type: 'bar'
  }
];

const selected = items[1];
```

```html
<ngb-select multiple [(ngModel)]="selected">
  <!-- template used inside the input -->
  <ng-template ngbSelectedOption let-option>
    {{option.label}}
  </ng-template>

  <!-- template used in the list -->
  <ng-template ngbOption
    let-option
    let-selected="selected"
  >
    <ng-container *ngIf="selected">&#10003;</ng-container>
    {{option.label}}
  </ng-template>

  <ngb-option
    *ngFor="let option of items"
    [value]="option"
  ></ngb-option>
</ngb-select>
```