import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { User } from "src/app/_models/user";
import { AlertifyService } from "src/app/_services/alertify.service";
import { AuthService } from "src/app/_services/auth.service";

@Component({
    selector: 'nav-bar',
    templateUrl: 'nav-bar.component.html'
})

export class NavBarComponent implements OnInit{
    model: any = {};
    user?: User;
    photoUrl?: string;

    constructor(
        public authService: AuthService, 
        private router: Router,
        private route: ActivatedRoute,
        private alertify: AlertifyService) {}

    ngOnInit(): void {
        this.authService.currentPhotoUrl.subscribe(photoUrl => this.photoUrl = photoUrl);
    }

    login() {
        this.authService.login(this.model).subscribe(next => {
            this.alertify.message('Logged in successfully');
            this.router.navigate(['/']);
        }, error => {
            this.alertify.message(error);
        }, () => {
            this.router.navigateByUrl('/');
        });
    }

    loggedIn() {
        return this.authService.loggedIn();
    }

    logout() {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        this.authService.decodedToken = null;
        this.authService.currentUser = null;
        this.alertify.message('logged out')
        this.router.navigate(['/']);
    }
}