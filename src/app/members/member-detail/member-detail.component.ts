import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/_models/user';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'member-detail',
  templateUrl: './member-detail.component.html',
  styleUrls: ['./member-detail.component.scss']
})
export class MemberDetailComponent implements OnInit {
  user: User | undefined;

  constructor(
    private userService: UserService, 
    private route: ActivatedRoute, 
    private alertify: AlertifyService) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.user = data['user'];
    })
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
  //loadUser() {
  //  this.userService.getUser(this.route.snapshot.params['id']).subscribe((user: User) => {
  //    this.user = user;
  //  }, error => {
  //    console.log(error);
  //  });
  //}
}
