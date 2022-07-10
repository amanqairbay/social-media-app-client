import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertifyService } from '../../_services/alertify.service';
import { AuthService } from './../../_services/auth.service';

@Component({
  selector: 'register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  model: any = {};

  constructor(private authService: AuthService, private alertify: AlertifyService, private router: Router) { }

  ngOnInit() {
  }

  register() {
    this.authService.register(this.model).subscribe(() => {
      this.alertify.message('registration successful');
    }, error => {
      this.alertify.message(error);
    }, () => {
      this.router.navigate(['/']);
  });
  }

  cancel() {
    console.log('cancelled');
  }
}
