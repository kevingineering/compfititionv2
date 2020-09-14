import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from '../../user/user.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private userService: UserService, private router: Router) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> {
    // Observable<boolean> gives us a chance to see if user is logged in
    // do not need to subscribe with router becuase it automatically subscribes
    return this.userService.user$.pipe(
      map((auth) => {
        console.log(auth);
        if (auth) {
          return true;
        }
        // save current url to queryParams so we can redirect to it after login
        this.router.navigate(['login'], {
          queryParams: { returnUrl: state.url },
        });
      })
    );
  }
}
