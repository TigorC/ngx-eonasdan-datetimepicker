## ngx-eonasdan-datetimepicker

ngx-eonasdan-datetimepicker - is a component wrapper for the [eonasdan-bootstrap-datetimepicker](https://www.npmjs.com/package/eonasdan-bootstrap-datetimepicker).

### Demo

Demo you can find [here](http://tigorc.ru/ngx-eonasdan-datetimepicker-demo/)

### Requirements
eonasdan-bootstrap-datetimepicker >=4.17.22 <5.0.0

### Installation
Include necessary scripts and styles to .angular-cli.json,
```
"scripts": [
  "../node_modules/jquery/dist/jquery.min.js",
  "../node_modules/moment/min/moment.min.js",
  "../node_modules/bootstrap/dist/js/bootstrap.min.js",
  "../node_modules/eonasdan-bootstrap-datetimepicker/build/js/bootstrap-datetimepicker.min.js"
],
"styles": [
  "../node_modules/bootstrap/dist/css/bootstrap.min.css",
  "../node_modules/eonasdan-bootstrap-datetimepicker/build/css/bootstrap-datetimepicker.min.css"
],
```

Install package:

```bash
npm i ngx-eonasdan-datetimepicker --save
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
