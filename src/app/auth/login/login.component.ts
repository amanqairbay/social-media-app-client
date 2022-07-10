import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertifyService } from '../../_services/alertify.service';
import { AuthService } from '../../_services/auth.service';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  model: any = {};

  constructor(
    private authService: AuthService, 
    private router: Router,
    private alertify: AlertifyService) { }
  
  ngOnInit() {
  }

  login() {
    this.authService.login(this.model).subscribe(next => {
        this.alertify.message('Logged in successfully');
        //this.router.navigate(['/']);
    }, error => {
        this.alertify.message(error);
    }, () => {
        this.router.navigate(['/']);
    });
  }


  loggedIn() {
      const token = localStorage.getItem('token');
      return !!token;
  }

  logout() {
      localStorage.removeItem('token');
      this.alertify.message('logged out');
  }

}
