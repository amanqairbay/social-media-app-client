import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, Router } from "@angular/router";
import { catchError, Observable, of } from "rxjs";
import { User } from "../_models/user";
import { UserService } from "../_services/user.service";

@Injectable()
export class MemberListResolver implements Resolve<User[]> {
    constructor(private userServcie: UserService, private router: Router) {}

    resolve(route: ActivatedRouteSnapshot): Observable<User[]> {
        return this.userServcie.getUsers().pipe(
            catchError(error => {
                console.log("Problem retrieviong data");
                this.router.navigate(['/home']);
                return of();
            })
        );
    }
}