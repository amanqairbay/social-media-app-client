import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from '../../_models/user';
import { UserService } from '../../_services/user.service';

@Component({
  selector: 'member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.scss']
})
export class MemberListComponent implements OnInit {
  users?: User[];
  
  constructor(private userService: UserService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.users = data['users'];
    })
  }

  /* 
  loadUsers() {
    this.userService.getUsers().subscribe((users: User[]) => {
      this.users = users;
      for(let user of users) {
        console.log(user.city);
      }
    }, error => {
      console.log(error);
    })
  }
  */
}
