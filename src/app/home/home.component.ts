import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { User } from '../_models/user';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  registerMode = false;
  user?: User;
  jwtHelper = new JwtHelperService();
  photoUrl?: string;

  constructor(
    public authService: AuthService, 
    private router: Router, 
    private route: ActivatedRoute) 
  { }

  ngOnInit() {
    this.authService.currentPhotoUrl.subscribe(photoUrl => this.photoUrl = photoUrl);
  }

  loggedIn() {
    return this.authService.loggedIn();
  }

  toRegister() {
    this.registerMode = true;
  }

  toLogin() {
    this.registerMode = false;
  }
}
