import { Component, DoCheck, OnInit } from '@angular/core';
import { TaskEntity } from '../../domains/task-entity';
import { TaskService } from '../../services/task.service';
import { Subject, Subscription, debounce, debounceTime, timer } from 'rxjs';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements OnInit {

  taskList: TaskEntity[] = [];
  saveTimer: Subscription;
  private saveSubject: Subject<TaskEntity> = new Subject();
  constructor(
    private service: TaskService
  ) {
    this.saveTimer = this.saveSubject.pipe(
      debounce(() => timer(1000))
    ).subscribe(item => {
      this.update(item);
    });
  }

  ngOnInit(): void {
    this.getTaskList()
  }

  public async setEmitTaskList(event: string) {

    let task: TaskEntity = {description: event, checked: false}
    task = await this.service.save(task)
    this.taskList.push(task)

  }

  public async deleteItemTaskList(task: TaskEntity) {
    await this.service.delete(task);
    this.getTaskList();
  }

  public async deleteAll() {
    const confirm = window.confirm("Você deseja realmente Deletar tudo?");
    await this.service.deleteAll();
    if (confirm) {
      this.taskList = [];
    }
  }

  public validationInput(description: string, task: TaskEntity) {
    if (!description.length) {
      const confirm = window.confirm("Task está vazia, deseja Deletar?");

      if (confirm) {
        this.deleteItemTaskList(task)
      }
    }
  }

  public async getTaskList() {
    this.taskList = (await this.service.getAll()).sort((a, b) => Number(a.checked) - Number(b.checked));
  }

  async onCheckedChange(task: TaskEntity) {
    if (!task.id) {
      console.error('Task Id não está definido');
      return;
    }
    await this.service.changeChecked(task.checked, task.id);
  }

  startSaveTimer(item: TaskEntity) {
    this.saveSubject.next(item);
  }

  async update(task: TaskEntity) {
    await this.service.update(task);
  }
}
