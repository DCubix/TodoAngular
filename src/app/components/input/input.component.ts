import { Component, Input, Output, EventEmitter } from '@angular/core';
import { AbstractControl, ControlValueAccessor, NG_VALIDATORS, NG_VALUE_ACCESSOR, ValidationErrors, Validator } from '@angular/forms';

export type InputType =
  'button' | 'checkbox' | 'color' | 'date' |
  'datetime-local' | 'email' | 'file' | 'hidden' |
  'image' | 'month' | 'number' | 'password' |
  'radio' | 'range' | 'reset' | 'search' |
  'submit' | 'tel' | 'text' | 'time' | 'url' | 'week';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: InputComponent
    },
    {
      provide: NG_VALIDATORS,
      multi: true,
      useExisting: InputComponent
    }
  ]
})
export class InputComponent implements ControlValueAccessor, Validator {
  @Input() label?: string;
  @Input() placeholder?: string;
  @Input() error?: string;
  @Input() type: InputType = 'text';
  @Input() value: string = '';
  @Input() name!: string;
  @Input() validator?: (value: string) => ValidationErrors | null;
  @Output() valueChange: EventEmitter<string> = new EventEmitter<string>();

  touched: boolean = false;
  disabled: boolean = false;
  onTouched = () => {};

  onChange() {
    this.valueChange.emit(this.value);
    this.markAsTouched();
  }

  writeValue(obj: string): void {
    this.value = obj;
  }

  registerOnChange(fn: any): void {
    this.valueChange.subscribe(fn);
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  validate(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    return this.validator?.(value) || null;
  }

  private markAsTouched() {
    if (!this.touched) {
      this.onTouched();
      this.touched = true;
    }
  }

}
