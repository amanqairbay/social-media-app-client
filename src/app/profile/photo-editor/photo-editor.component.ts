import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Photo } from 'src/app/_models/photo';
import { User } from 'src/app/_models/user';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { UserService } from 'src/app/_services/user.service';

@Component({
  selector: 'photo-editor',
  templateUrl: './photo-editor.component.html',
  styleUrls: ['./photo-editor.component.scss']
})
export class PhotoEditorComponent implements OnInit {
  user?: User;
  returnUrl?: string;
  
  constructor(
    private userService: UserService, 
    private route: ActivatedRoute, 
    private alertify: AlertifyService,
    private router: Router) {
    }

  ngOnInit() {
    this.route.data.subscribe(data => { this.user = data['user'] });
  }
}
