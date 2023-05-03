import {Injectable} from '@angular/core'
import {HttpEvent, HttpHandler, HttpInterceptor, HttpParams, HttpRequest} from '@angular/common/http'
import { Observable, exhaustMap, take } from 'rxjs'
import { AuthService } from './auth.service'

@Injectable()
export class AuthInterceptorService implements HttpInterceptor{
    constructor(private authService:AuthService){}
intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return this.authService.user.pipe(
        take(1),
        exhaustMap(user=>{
            if (user._token === ""){
                return next.handle(req);
            }
            const modifiedReq=req.clone({
                params:new HttpParams().set('auth',user._token)
            })
            return next.handle(modifiedReq);
        })
    )
    
};
}
// NOTE : This interceptor should ADD TOKEN to all OUTGOING REQUESTS