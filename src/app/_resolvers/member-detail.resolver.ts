import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, Router } from "@angular/router";
import { catchError, map, Observable, of } from "rxjs";
import { User } from "../_models/user";
import { AlertifyService } from "../_services/alertify.service";
import { UserService } from "../_services/user.service";

@Injectable()

export class MemberDetailResolver implements Resolve<User> {
    constructor(
        private userService: UserService, 
        private router: Router,
        private alertify: AlertifyService) {}

    resolve(route: ActivatedRouteSnapshot): Observable<User> {
        return this.userService.getUser(route.params['id']).pipe(
            map((user: any) => {
                if (user) {
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
        this.alertify.message('Problem retrieving data');
        this.router.navigate(['/not-found']);
    }
}