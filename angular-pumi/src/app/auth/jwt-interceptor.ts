import {HttpInterceptorFn} from '@angular/common/http';

export const JwtInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('JWT_Token');
  const clonedReq = req.clone({
    setHeaders: {Authorization: `Bearer ${token}`}
  });

  return next(clonedReq);
}
