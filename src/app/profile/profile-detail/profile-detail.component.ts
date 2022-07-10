import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/_models/user';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { AuthService } from 'src/app/_services/auth.service';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'app-profile-detail',
  templateUrl: './profile-detail.component.html',
  styleUrls: ['./profile-detail.component.scss']
})
export class ProfileDetailComponent implements OnInit {
  user?: User;
  photoUrl?: string;
  
  constructor(
    private authService: AuthService,
    private userService: UserService, 
    private route: ActivatedRoute, 
    private alertify: AlertifyService,
    private router: Router) {
    }

  ngOnInit() {
    this.route.data.subscribe(data => { this.user = data['user'] });
    this.authService.currentPhotoUrl.subscribe(photoUrl => this.photoUrl = photoUrl);
  }

  getImages() {
    const imagesUrls = [];
      for (const photo of this.user?.photos!){
        imagesUrls.push({
          small: photo.url,
          medium: photo.url,
          big: photo.url,
          description: photo.description
        });
      }
  }

}
