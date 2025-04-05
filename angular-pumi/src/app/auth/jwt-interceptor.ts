import {HttpInterceptorFn} from '@angular/common/http';
import {JWT_TOKEN_KEY} from '../constants/list';

export const JwtInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem(JWT_TOKEN_KEY);
  const clonedReq = req.clone({
    setHeaders: {Authorization: `Bearer ${token}`}
  });

  return next(clonedReq);
}
