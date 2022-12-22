import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UiService {
  private showNewTask: boolean = false;
  private subject = new Subject<any>();

  constructor() { }

  setShowNewTask(v: boolean) {
    this.showNewTask = v;
    this.subject.next(this.showNewTask);
  }

  onShowNewTask(): Observable<any> {
    return this.subject.asObservable();
  }

}
