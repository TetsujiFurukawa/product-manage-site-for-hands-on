import { Observable } from 'rxjs';

import {
    HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpXsrfTokenExtractor
} from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class HttpXsrfInterceptor implements HttpInterceptor {
  constructor(private tokenExtractor: HttpXsrfTokenExtractor) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let requestMethod: string = req.method;
    requestMethod = requestMethod.toLowerCase();

    if (requestMethod && (requestMethod === 'post' || requestMethod === 'delete' || requestMethod === 'put')) {
      // Puts xsrf token.
      const headerName = 'X-XSRF-TOKEN';
      const token = this.tokenExtractor.getToken() as string;
      if (token !== null && !req.headers.has(headerName)) {
        req = req.clone({ headers: req.headers.set(headerName, token) });
      }
    }
    return next.handle(req);
  }
}
