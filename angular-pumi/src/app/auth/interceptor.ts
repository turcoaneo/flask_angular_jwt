import { HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';

export class Interceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const token = localStorage.getItem('JWT_Token');
    if (token) {
      const authReq = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
      return next.handle(authReq);
    } else {
      return next.handle(req);
    }
  }
}
