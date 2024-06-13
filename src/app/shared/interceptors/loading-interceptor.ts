import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpEvent
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { LoadingService } from '../services/loading.service';


@Injectable()
export class LoadingInterceptor implements HttpInterceptor {
  constructor(private loadingService: LoadingService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {

    if (request.headers.get('ignoreLoading')) {
      return next.handle(request);
    }

    this.loadingService.showLoading();

    return next.handle(request).pipe(
      catchError((error) => {
        return throwError(() => error);
      }),
      finalize(() => {
        this.loadingService.hideLoading();
      })
    );
  }
}
