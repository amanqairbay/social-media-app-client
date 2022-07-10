import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from "@angular/router";
import { catchError, map, Observable, of } from "rxjs";
import { User } from "../_models/user";
import { AlertifyService } from "../_services/alertify.service";
import { AuthService } from "../_services/auth.service";
import { UserService } from "../_services/user.service";

@Injectable()

export class ProfileEditResolver implements Resolve<User> {
    constructor(
        private userService: UserService, 
        private authService: AuthService,
        private router: Router,
        private alertify: AlertifyService
    ) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<User> {
        //console.log(this.authService.decodedToken.nameid);
        return this.userService.getUser(localStorage.getItem('userId')).pipe(
            map((user: any) => {
                if (!user) {
                    this.problem();
                    return of(null);
                }
                return user;
            }),
            catchError(() => {
                this.problem();
                return of();
            })
        );
    }

    problem() {
        this.alertify.message('Problem retrieving your data');
        this.router.navigate(['/not-found']);
    }
}