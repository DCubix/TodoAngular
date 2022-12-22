import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { Task } from 'src/app/model/task';
import { UiService } from 'src/app/services/ui.service';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit {
  tasks: Task[] = [];

  showNewTask: boolean = false;
  subscription!: Subscription;

  constructor(private taskService: TaskService, private uiService: UiService) {
    this.subscription = this.uiService.onShowNewTask().subscribe((v) => this.showNewTask = v);
  }

  onTaskSaved(task: Task) {
    this.taskService.saveTask(task);
    this.reload();
    this.uiService.setShowNewTask(false);
  }

  onClosed() {
    this.uiService.setShowNewTask(false);
  }

  onTaskToggled(task: Task) {
    task.completed = !task.completed;
    this.taskService.markTask(task.id!, task.completed);
    this.reload();
  }

  onTaskDeleted(task: Task) {
    this.taskService.deleteTask(task.id!);
    this.reload();
  }

  ngOnInit(): void {
    this.reload();
  }

  reload() {
    this.taskService.getTasks().subscribe((tasks) => (this.tasks = tasks));
  }

}
