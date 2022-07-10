import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Photo } from 'src/app/_models/photo';
import { User } from 'src/app/_models/user';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { AuthService } from 'src/app/_services/auth.service';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'profile-photos',
  templateUrl: './profile-photos.component.html',
  styleUrls: ['./profile-photos.component.scss']
})
export class ProfilePhotosComponent implements OnInit {
  //@Input() photos?: Photo[];
  user?: User;
  userId?: number;
  currentMain?: Photo;

  constructor(
    private route: ActivatedRoute,
    private alertify: AlertifyService,
    private authService: AuthService, 
    private userService: UserService) { }

  ngOnInit() {
    this.route.parent?.data.subscribe(data => { this.user = data['user']; });
  }

  currentUserId() : number {
    var id = localStorage.getItem('userId');
    this.userId =+id!;

    return this.userId;
  }

  setMainPhoto(photo: Photo) {
    this.userService.setMainPhoto(this.user?.id!, photo.id).subscribe(() => {
      this.currentMain = this.user?.photos?.filter(p => p.isMain === true)[0];
      this.currentMain!.isMain = false;
      photo.isMain = true;
      this.authService.changeProfilePhoto(photo.url);
      localStorage.setItem('user', JSON.stringify(this.authService.currentUser));
    }, error => {
      this.alertify.error(error);
    });
  }

  deletePhoto(id: number) {
    this.alertify.confirm('Are you sure you want to delete this photo?', () => {
      this.userService.deletePhoto(this.currentUserId(), id).subscribe(() => {
        this.user?.photos?.slice(this.user?.photos?.findIndex(p => p.id === id), 1);
        this.alertify.message('Photo has been deleted');
      }, error => {
        this.alertify.error('Failed to delete the photo');
      });
    }); 
  }
}
