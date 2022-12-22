import { Component, EventEmitter, Input, Output } from '@angular/core';

export type ButtonType = ('primary' | 'secondary' | 'flat');

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent {
  @Input() type: ButtonType = 'primary';
  @Output() onPress = new EventEmitter();

  constructor() {}

  onClick() {
    this.onPress.emit();
  }
}
