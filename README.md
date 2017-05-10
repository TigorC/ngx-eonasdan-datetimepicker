## ngx-eonasdan-datetimepicker

ngx-eonasdan-datetimepicker - is a component wrapper for the [eonasdan-bootstrap-datetimepicker](https://www.npmjs.com/package/eonasdan-bootstrap-datetimepicker).

### Demo

Demo you can find [here](http://tigorc.ru/ngx-eonasdan-datetimepicker-demo/)

### Installation

Install package:

```bash
npm i ngx-eonasdan-datetimepicker --save-dev
```

Add module in your application:

```typescript
import { SqDatetimepickerModule } from 'ngx-eonasdan-datetimepicker';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    SqDatetimepickerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

### Usage

Reactive form:

```typescript
field1: Moment;

constructor(private fb: FormBuilder) {
  this.reactiveForm = this.fb.group({
    field1: [this.field1]
  });
  this.reactiveForm.valueChanges.subscribe((changes) => {
    this.field1 = changes.field1;
  });
}
```

```html
<form [formGroup]="reactiveForm">
  <div class="form-group">
    <sq-datetimepicker [options]="options" formControlName="field1"></sq-datetimepicker>
  </div>
</form>
```

ngModel control:
```html
<div class="form-group">
  <sq-datetimepicker [options]="options" [(ngModel)]="field1"></sq-datetimepicker>
</div>
```
