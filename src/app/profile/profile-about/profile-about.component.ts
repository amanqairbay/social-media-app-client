import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/_models/user';

@Component({
  selector: 'profile-about',
  templateUrl: './profile-about.component.html',
  styleUrls: ['./profile-about.component.scss']
})
export class ProfileAboutComponent implements OnInit {
  user?: User;
  constructor(private route: ActivatedRoute ) { }

  ngOnInit() {
    this.route.parent?.data.subscribe(data => {
      this.user = data['user'];
    })
  }

}
