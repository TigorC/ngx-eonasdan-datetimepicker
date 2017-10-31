import { InjectionToken } from '@angular/core';
import { OptionsBase } from 'eonasdan-bootstrap-datetimepicker';

export interface SqDateTimePickerOptions extends OptionsBase {
}

export const SQ_DATETIME_PICKER_OPTIONS = new InjectionToken<SqDateTimePickerOptions>('SqDateTimePickerOptions');
