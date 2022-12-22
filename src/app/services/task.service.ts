import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Task } from '../model/task';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  taskId: number = 1;

  constructor() {
    this.taskId = parseInt(localStorage.getItem('taskId') || '1');
  }

  getTasks(): Observable<Task[]> {
    return of(this.getTasksFromLocalStorage());
  }

  saveTask(task: Task) {
    const tasks = this.getTasksFromLocalStorage();
    task.id = this.taskId++;
    task.dateCreated = new Date();
    tasks.push(task);

    localStorage.setItem('taskId', this.taskId+'');
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  deleteTask(taskId: number): boolean {
    let tasks = this.getTasksFromLocalStorage();
    if (tasks.filter((e) => e.id == taskId).length == 0) {
      return false;
    }

    tasks = tasks.filter((e) => e.id != taskId);
    localStorage.setItem('tasks', JSON.stringify(tasks));

    return true;
  }

  markTask(taskId: number, completed: boolean) {
    let tasks = this.getTasksFromLocalStorage();
    for (let task of tasks) {
      if (task.id == taskId) {
        task.completed = completed;
      }
    }
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  private getTasksFromLocalStorage(): Task[] {
    let tasks = JSON.parse(localStorage.getItem('tasks') || '[]') as { [key: string]: any }[];

    // Convert dates
    tasks.forEach((e) => {
      e['dateCreated'] = new Date(e['dateCreated']);
      e['dueDate'] = new Date(e['dueDate']);
    });

    tasks = (tasks as Task[]).sort((a, b) => b.dateCreated.getTime() - a.dateCreated.getTime());

    return tasks as Task[];
  }

}
