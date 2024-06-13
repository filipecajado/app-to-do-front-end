import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TaskEntity } from '../domains/task-entity';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  urlBase: string;

  constructor(
    private http: HttpClient,
    ) {
    this.urlBase = "http://localhost:8080";
  }

  async getAll(): Promise<TaskEntity[]> {
    try {
      const taskArray: Array<TaskEntity> = await lastValueFrom(this.http.get<TaskEntity[]>(this.urlBase + `/tasks`));

      if (taskArray) {
        return taskArray;
      }
    } catch (error) {
      console.error(error);
    }
    throw new Error();
  }

  async save(task: TaskEntity): Promise<TaskEntity> {
    try {
      const taskEntity = await lastValueFrom(this.http.post<TaskEntity>(this.urlBase + `/tasks`, task, { 'headers': { 'Content-Type': 'application/json' } }));

      if (taskEntity) {
        return taskEntity;
      }
    } catch (error) {
      console.log(error);
      throw new Error();
    }
    throw new Error();
  }

  async update(task: TaskEntity): Promise<boolean> {
    try {
      const success = await lastValueFrom(this.http.put(this.urlBase + `/tasks`, task, { 'headers': { 'Content-Type': 'application/json' } }));

      if (success) {
        return true;
      }
    } catch (error) {
      console.log(error);
      throw new Error();
    }
    return false;
  }

  async delete(task: TaskEntity): Promise<boolean> {
    try {
      const success: HttpResponse<any> = await lastValueFrom(this.http.delete(this.urlBase + `/tasks/${task.id}`, { observe: 'response' }));
      if (success.status == 204) {
        return true;
      }      // this.toastComponent.showApiError(error);
    } catch (error) {
      console.log(error);
      throw new Error();
    }
    return false;
  }

  async deleteAll(): Promise<boolean> {
    try {
      const success: HttpResponse<any> = await lastValueFrom(this.http.delete(this.urlBase + `/tasks`, { observe: 'response' }));
      if (success.status == 204) {
        return true;
      }
    } catch (error) {
      console.log(error);
      throw new Error();
    }
    return false;
  }


  async changeChecked(checked: boolean, id: number): Promise<boolean> {
    let params = new HttpParams();
    params = params.set('checked', checked.toString());
    params = params.set('id', id.toString());
    try {
      const success = await lastValueFrom(this.http.put(this.urlBase + `/tasks/checked`, null, {params}));

      if (success) {
        return true;
      }
    } catch (error) {
      console.log(error);
      throw new Error();
    }
    return false;
  }

}
