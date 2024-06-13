import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  requestCount: number = 0;

  showLoading() {
    this.requestCount++;
  }

  hideLoading() {
    this.requestCount--;
  }

  isLoading(): boolean {
    return this.requestCount > 0;
  }
}