import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Task } from 'src/app/model/task';

@Component({
  selector: '[app-task]',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent {
  @Input() task!: Task;
  @Output() onDelete: EventEmitter<Task> = new EventEmitter();
  @Output() onToggle: EventEmitter<Task> = new EventEmitter();

  constructor() {}

  toggleTask() {
    this.onToggle.emit(this.task);
  }

  deleteTask() {
    this.onDelete.emit(this.task);
  }

}
