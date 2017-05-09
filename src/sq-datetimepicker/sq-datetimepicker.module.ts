import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SqDatetimepickerComponent } from './sq-datetimepicker.component';

@NgModule({
    imports: [
        CommonModule,
    ],
    declarations: [
        SqDatetimepickerComponent
    ],
    exports: [ SqDatetimepickerComponent ]
})
export class SqDatetimepickerModule {
}
