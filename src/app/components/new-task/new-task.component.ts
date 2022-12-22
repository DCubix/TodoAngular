import { Component, Output, EventEmitter } from '@angular/core';
import { Task } from 'src/app/model/task';

@Component({
  selector: 'app-new-task',
  templateUrl: './new-task.component.html',
  styleUrls: ['./new-task.component.scss']
})
export class NewTaskComponent {
  description: string = '';
  dueDate: string = '';

  @Output() onTaskSaved: EventEmitter<Task> = new EventEmitter();
  @Output() onClosed: EventEmitter<any> = new EventEmitter();

  onClose() {
    this.onClosed.emit();
  }

  onSave() {
    if (this.description.trim().length == 0) {
      alert('The "Description" field is required.');
      return;
    }

    if (this.dueDate.trim().length == 0) {
      alert('The "Due Date" field is required.');
      return;
    }

    let task: Task = {
      completed: false,
      dateCreated: new Date(),
      dueDate: new Date(this.dueDate),
      description: this.description
    };
    this.onTaskSaved.emit(task);

    this.description = '';
    this.dueDate = '';
  }

}
