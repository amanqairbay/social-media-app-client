import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/_models/user';

@Component({
  selector: 'home-left-sidebar',
  templateUrl: './home-left-sidebar.component.html',
  styleUrls: ['./home-left-sidebar.component.scss']
})
export class HomeLeftSidebarComponent implements OnInit {
  user?: User;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.data.subscribe( data => this.user = data['user'] );
  }

}
