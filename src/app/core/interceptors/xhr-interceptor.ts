import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';

@Injectable()
export class XhrInterceptor implements HttpInterceptor {
    // Intercepts Http request and add XML Http request header to hide Basic auth requiring dialog.
    intercept(req: HttpRequest<any>, next: HttpHandler) {
        const xhr = req.clone({
            headers: req.headers.set('X-Requested-With', 'XMLHttpRequest')
        });
        return next.handle(xhr);
    }
}
