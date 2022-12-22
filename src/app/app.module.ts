import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {
  LucideAngularModule,
  CheckSquare,
  Square,
  FilePlus2,
  Trash,
  Check,
  X,
  Save
} from 'lucide-angular';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { ButtonComponent } from './components/button/button.component';
import { TaskComponent } from './components/task/task.component';
import { TaskListComponent } from './components/task-list/task-list.component';
import { InputComponent } from './components/input/input.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NewTaskComponent } from './components/new-task/new-task.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ButtonComponent,
    TaskComponent,
    TaskListComponent,
    InputComponent,
    NewTaskComponent
  ],
  imports: [
    BrowserModule,
    LucideAngularModule.pick({ CheckSquare, FilePlus2, Trash, Square, Check, X, Save }),
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
