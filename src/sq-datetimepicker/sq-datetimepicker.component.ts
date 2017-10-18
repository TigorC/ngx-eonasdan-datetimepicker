import * as $ from 'jquery';
import * as moment from 'moment';
import 'eonasdan-bootstrap-datetimepicker';
import {
  Component, Input, forwardRef,
  OnInit, OnDestroy, OnChanges, SimpleChanges,
  ElementRef, Output, EventEmitter
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, NG_VALIDATORS, FormControl } from '@angular/forms';
import {
  SetOptions, Datetimepicker,
  HideEventObject, ChangeEventObject, ErrorEventObject, UpdateEventObject
} from 'eonasdan-bootstrap-datetimepicker';

export const SQ_DATETIMEPICKER_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => SqDatetimepickerComponent),
  multi: true,
}
export const SQ_DATETIMEPICKER_VALIDATOR: any = {
  provide: NG_VALIDATORS,
  useExisting: forwardRef(() => SqDatetimepickerComponent),
  multi: true,
};

@Component({
  selector: 'sq-datetimepicker',
  template: `
    <div [ngStyle]="style">
      <div class="sq-datetimepicker-input-group input-group date" [ngClass]="groupClass">
        <input type="text" [ngClass]="inputClass" [readOnly]="readOnly" [placeholder]="placeholder"/>
        <span class="input-group-addon">
          <span [ngClass]="groupIconClass"></span>
        </span>
      </div>
      <input type="text" class="sq-datetimepicker-input" [ngClass]="inputClass" [readOnly]="readOnly" [placeholder]="placeholder" />
      <div class="sq-datetimepicker-inline"></div>
    </div>`,
  providers: [SQ_DATETIMEPICKER_VALUE_ACCESSOR, SQ_DATETIMEPICKER_VALIDATOR]
})
export class SqDatetimepickerComponent implements OnInit, OnChanges, OnDestroy, ControlValueAccessor {
  @Input() options: SetOptions;
  @Input() mode: 'input-group' | 'input' | 'inline' = 'input-group';
  @Input() style: string;
  @Input() inputClass: string = 'form-control';
  @Input() groupClass: string = '';
  @Input() groupIconClass: string = 'glyphicon glyphicon-calendar';
  @Input() readOnly: boolean = false;
  @Input() placeholder: string = '';

  @Output() dpChange: EventEmitter<ChangeEventObject> = new EventEmitter<ChangeEventObject>();
  @Output() dpError: EventEmitter<ErrorEventObject> = new EventEmitter<ErrorEventObject>();
  @Output() dpHide: EventEmitter<HideEventObject> = new EventEmitter<HideEventObject>();
  @Output() dpShow: EventEmitter<any> = new EventEmitter<any>();
  @Output() dpUpdate: EventEmitter<UpdateEventObject> = new EventEmitter<UpdateEventObject>();

  private parseError: boolean;
  private dpElement: any;
  private dpObject: Datetimepicker;
  private validModes: string[] = ['input-group', 'input', 'inline'];

  constructor(private el: ElementRef) { }

  ngOnInit() {
    if (this.validModes.indexOf(this.mode) === -1) {
      let modes = this.validModes.map(m => `"${m}"`).join(', ');
      throw `${this.mode} is not valid mode, use one of following: ${modes}`;
    }
    this.initDatetimepicker();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.dpObject && changes && changes['options'] && JSON.stringify(changes['options'].currentValue) != JSON.stringify(changes['options'].previousValue)) {
      this.dpObject.options(this.options);
    }
  }

  ngOnDestroy() {
    this.dpObject.destroy();
  }

  // this is the initial value set to the component
  writeValue(obj: any) {
    if (typeof obj === 'string' || obj instanceof String) {
      obj = moment(obj);
    }
    this.dpObject.date(obj);
  }

  // registers 'fn' that will be fired when changes are made
  // this is how we emit the changes back to the form
  registerOnChange(fn: any) {
    this.propagateChange = fn;
  }

  // validates the form, returns null when valid else the validation object
  // in this case we're checking if the date parsing has passed or failed
  validate(c: FormControl) {
    return (!this.parseError) ? null : {
      dateParseError: {
        valid: false,
      },
    };
  }

  // not used, used for touch input
  registerOnTouched() { }

  private onChange(date) {
    // update the form
    this.propagateChange(date);
  }

  // the method set in registerOnChange to emit changes back to the form
  private propagateChange = (_: any) => { };

  private initDatetimepicker() {
    for (let m of this.validModes) {
      if (m !== this.mode) {
        $(this.el.nativeElement.querySelector(`.sq-datetimepicker-${m}`)).remove();
      }
    }
    this.dpElement = $(this.el.nativeElement.querySelector(`.sq-datetimepicker-${this.mode}`));
    let options = Object.assign({}, this.options);
    options.inline = this.mode === 'inline';
    this.dpElement.datetimepicker(options);
    this.dpObject = this.dpElement.data('DateTimePicker');
    this.bindEvents();
  }

  private bindEvents() {
    this.dpElement.on('dp.hide', (e: HideEventObject) => { this.dpHide.emit(e); });
    this.dpElement.on('dp.show', () => { this.dpShow.emit(); });
    this.dpElement.on('dp.change', (e: ChangeEventObject) => {
      this.parseError = false;
      this.onChange(e.date || null);
      this.dpChange.emit(e);
    });
    this.dpElement.on('dp.error', (e: ErrorEventObject) => {
      this.parseError = true;
      this.onChange(null);
      this.dpError.emit(e);
    });
    this.dpElement.on('dp.update', (e: UpdateEventObject) => { this.dpUpdate.emit(e); });
  }
}
